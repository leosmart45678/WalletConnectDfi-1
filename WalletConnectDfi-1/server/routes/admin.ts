import { Router } from "express";
import { db } from "../db";
import { walletConnections } from "@shared/schema";
import { desc } from "drizzle-orm";
import { log } from '../vite';

const ADMIN_PASSWORD = "09163666961";

const router = Router();

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    log('Admin login attempt');
    log(`Received password length: ${password?.length}`);

    if (!password) {
      log('Admin login failed - no password provided');
      return res.status(400).json({ error: "Password is required" });
    }

    if (password === ADMIN_PASSWORD) {
      // Set a secure session cookie
      req.session.isAdmin = true;
      await req.session.save(); // Ensure session is saved
      log('Admin login successful');
      log('Session state after login:', JSON.stringify({ isAdmin: req.session.isAdmin }));
      return res.json({ success: true });
    } else {
      log('Admin login failed - invalid password');
      log('Received password:', password);
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    log('Admin login error:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to check admin session
const requireAdmin = (req: any, res: any, next: any) => {
  try {
    log('Checking admin session');
    log('Session state:', JSON.stringify(req.session));
    log('Environment:', process.env.NODE_ENV || 'development');

    if (!req.session) {
      log('No session found');
      return res.status(401).json({ error: "No session found" });
    }

    if (!req.session.isAdmin) {
      log('Unauthorized access attempt to admin route');
      return res.status(401).json({ error: "Unauthorized" });
    }
    log('Admin session verified successfully');
    next();
  } catch (error) {
    log('Session validation error:', error);
    return res.status(500).json({ error: "Session validation failed" });
  }
};

// Logout endpoint
router.post("/logout", (req, res) => {
  try {
    log('Admin logout request received');
    
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        log('Error destroying session:', err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      
      log('Session destroyed successfully');
      res.clearCookie('walletconnect.sid');
      return res.json({ success: true });
    });
  } catch (error) {
    log('Logout error:', error);
    return res.status(500).json({ error: "Internal server error during logout" });
  }
});

// Protected route to get all connections
router.get("/connections", requireAdmin, async (req, res) => {
  try {
    log('Fetching wallet connections');
    const connections = await db
      .select()
      .from(walletConnections)
      .orderBy(desc(walletConnections.createdAt));

    log(`Found ${connections.length} connections`);
    res.json(connections);
  } catch (error) {
    log('Error fetching connections:', error instanceof Error ? error.message : String(error));
    res.status(500).json({ error: "Failed to fetch connections" });
  }
});

// Check admin session status
router.get("/session", (req, res) => {
  try {
    const isAdmin = !!req.session?.isAdmin;
    log(`Session check - isAdmin: ${isAdmin}`);
    log('Full session state:', JSON.stringify(req.session));
    res.json({ isAdmin });
  } catch (error) {
    log('Session check error:', error);
    res.status(500).json({ error: "Failed to check session" });
  }
});

export default router;