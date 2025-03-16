import { Router } from "express";
import { db } from "../db";
import { walletConnections, insertWalletConnectionSchema } from "@shared/schema";
import { log } from '../vite';

const router = Router();

// Create new wallet connection
router.post("/connect", async (req, res) => {
  try {
    log('Attempting to create new wallet connection');
    log('Request body:', JSON.stringify(req.body));

    const validatedData = insertWalletConnectionSchema.parse(req.body);
    
    const [connection] = await db
      .insert(walletConnections)
      .values(validatedData)
      .returning();

    log('Successfully created wallet connection:', JSON.stringify(connection));
    res.status(201).json(connection);
  } catch (error) {
    log('Error creating wallet connection:', error);
    res.status(400).json({ 
      error: error instanceof Error ? error.message : "Failed to create wallet connection" 
    });
  }
});

export default router;
