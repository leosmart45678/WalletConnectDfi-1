import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { log } from './vite';

// Configure Neon database to use WebSockets
neonConfig.webSocketConstructor = ws;

// Check for DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create connection pool with more resilient settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000, // How long to wait for a connection
});

// Create Drizzle ORM instance
const db = drizzle({ client: pool, schema });

export { pool, db };

// Test database connection without throwing errors that crash the server
(async () => {
  try {
    await pool.query('SELECT NOW()');
    log('Database connection successful');
  } catch (error) {
    log('Database connection error:', error);
    log('Application will continue but database features may not work correctly');
  }
})();

// Handle pool errors so they don't crash the server
pool.on('error', (err) => {
  log('Unexpected database pool error:', err);
});