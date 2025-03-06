import { walletConnections, type WalletConnection, type InsertWalletConnection } from "@shared/schema";
import { db } from './db';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { log } from './vite';
import pg from 'pg';

const PostgresStore = pgSession(session);

export interface IStorage {
  testConnection(): Promise<void>;
  createWalletConnection(connection: InsertWalletConnection): Promise<WalletConnection>;
  getWalletConnections(): Promise<WalletConnection[]>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    log('Initializing database storage...');
    try {
      // Create the session table if it doesn't exist
      const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });

      // Initialize the session table
      pool.query(`
        CREATE TABLE IF NOT EXISTS "session" (
          "sid" varchar NOT NULL COLLATE "default",
          "sess" json NOT NULL,
          "expire" timestamp(6) NOT NULL,
          CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
        ) WITH (OIDS=FALSE);
        CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
      `).then(() => {
        log('Session table created/verified successfully');
      }).catch(err => {
        log('Error creating session table:', err);
      });

      // Initialize session store with PostgreSQL
      this.sessionStore = new PostgresStore({
        pool,
        tableName: 'session'
      });
      log('Session store initialized successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Failed to initialize session store: ${errorMessage}`);
      throw error;
    }
  }

  async testConnection(): Promise<void> {
    try {
      // Test the database connection by running a simple query
      const result = await db.select().from(walletConnections).limit(1);
      log('Database connection test successful');
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log('Database connection test failed:', errorMessage);
      return Promise.reject(new Error('Failed to connect to database'));
    }
  }

  async createWalletConnection(connection: InsertWalletConnection): Promise<WalletConnection> {
    try {
      log(`Creating wallet connection for ${connection.email} with ${connection.walletType}`);

      const [newConnection] = await db
        .insert(walletConnections)
        .values({
          ...connection,
          isConnected: false,
          createdAt: new Date(),
        })
        .returning();

      if (!newConnection) {
        throw new Error('Failed to create wallet connection - no data returned');
      }

      log(`Successfully created wallet connection with ID: ${newConnection.id}`);
      return newConnection;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error creating wallet connection: ${errorMessage}`);
      throw new Error('Failed to create wallet connection');
    }
  }

  async getWalletConnections(): Promise<WalletConnection[]> {
    try {
      const connections = await db.select().from(walletConnections);
      log(`Retrieved ${connections.length} wallet connections`);
      return connections;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error retrieving wallet connections: ${errorMessage}`);
      throw new Error('Failed to retrieve wallet connections');
    }
  }
}

export const storage = new DatabaseStorage();