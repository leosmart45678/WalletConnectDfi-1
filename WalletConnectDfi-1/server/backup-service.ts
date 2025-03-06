import { db } from './db';
import { walletConnections, type WalletConnection } from "@shared/schema";
import { log } from './vite';
import { sql } from 'drizzle-orm';

export class BackupService {
  private backupInterval: NodeJS.Timeout | null = null;

  /**
   * Start automatic backups at the specified interval
   * @param intervalMs Time between backups in milliseconds (default: 1 hour)
   */
  startAutomaticBackups(intervalMs = 60 * 60 * 1000) {
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
    }

    // Perform immediate backup
    this.backupWalletConnections().catch(err => {
      log('Initial backup failed:', err);
    });

    // Schedule recurring backups
    this.backupInterval = setInterval(() => {
      this.backupWalletConnections().catch(err => {
        log('Scheduled backup failed:', err);
      });
    }, intervalMs);

    log(`Automatic backups scheduled every ${intervalMs / 1000 / 60} minutes`);
  }

  /**
   * Stop automatic backups
   */
  stopAutomaticBackups() {
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
      this.backupInterval = null;
      log('Automatic backups stopped');
    }
  }

  /**
   * Backup wallet connections to backup table
   */
  async backupWalletConnections(): Promise<void> {
    try {
      const timestamp = new Date().toISOString();

      // Create backup table if it doesn't exist
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS wallet_connections_backup (
          backup_id SERIAL PRIMARY KEY,
          backup_time TIMESTAMP WITH TIME ZONE NOT NULL,
          connections JSONB NOT NULL
        )
      `);

      // Fetch current connections
      const connections = await db.select().from(walletConnections);

      // Store backup
      await db.execute(sql`
        INSERT INTO wallet_connections_backup (backup_time, connections) 
        VALUES (${new Date()}, ${JSON.stringify(connections)})
      `);

      log(`Backed up ${connections.length} wallet connections at ${timestamp}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error backing up wallet connections: ${errorMessage}`);
      throw new Error('Failed to backup wallet connections');
    }
  }

  /**
   * Restore wallet connections from the latest backup
   */
  async restoreLatestBackup(): Promise<WalletConnection[]> {
    try {
      // Get latest backup
      const result = await db.execute<{ backup_time: Date; connections: WalletConnection[] }>(sql`
        SELECT backup_time, connections FROM wallet_connections_backup 
        ORDER BY backup_time DESC LIMIT 1
      `);

      if (result.rows.length === 0) {
        log('No valid backup found to restore');
        return [];
      }

      const backup = result.rows[0].connections;
      log(`Restored ${backup.length} wallet connections from latest backup`);
      return backup;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error restoring wallet connections: ${errorMessage}`);
      throw new Error('Failed to restore wallet connections');
    }
  }

  /**
   * List all available backups
   */
  async listBackups(): Promise<string[]> {
    try {
      const result = await db.execute<{ backup_time: Date }>(sql`
        SELECT backup_time FROM wallet_connections_backup 
        ORDER BY backup_time DESC
      `);

      return result.rows.map(row => row.backup_time.toISOString());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error listing backups: ${errorMessage}`);
      throw new Error('Failed to list backups');
    }
  }
}

export const backupService = new BackupService();