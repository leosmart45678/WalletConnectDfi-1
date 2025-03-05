import { walletConnections, type WalletConnection, type InsertWalletConnection } from "@shared/schema";
import { db } from './db';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import { log } from './vite';

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  testConnection(): Promise<void>;
  createWalletConnection(connection: InsertWalletConnection): Promise<WalletConnection>;
  getWalletConnections(): Promise<WalletConnection[]>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Clear expired entries every 24h
    });
  }

  async testConnection(): Promise<void> {
    try {
      // Test the database connection by running a simple query
      await db.select().from(walletConnections).limit(1);
      log('Database connection successful');
    } catch (error) {
      log('Database connection error:', error);
      throw new Error('Failed to connect to database');
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
      
      log(`Successfully created wallet connection with ID: ${newConnection.id}`);
      return newConnection;
    } catch (error) {
      log(`Error creating wallet connection: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new Error('Failed to create wallet connection');
    }
  }

  async getWalletConnections(): Promise<WalletConnection[]> {
    return await db.select().from(walletConnections);
  }
}

// Replace MemStorage with DatabaseStorage
export const storage = new DatabaseStorage();