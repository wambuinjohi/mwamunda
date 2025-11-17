import { RequestHandler } from "express";
import crypto from "crypto";

// In-memory data storage
interface StoredUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface StoredContact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  id?: number;
  error?: string;
}

// In-memory database
const db = {
  users: [] as StoredUser[],
  contacts: [] as StoredContact[],
  nextUserId: 1,
  nextContactId: 1,
};

// Initialize with admin user
function initializeSeed() {
  // Only seed if no users exist
  if (db.users.length === 0) {
    const adminPassword = hashPassword("Pass123");
    db.users.push({
      id: 1,
      email: "admin@mwamunda.com",
      password: adminPassword,
      name: "Admin",
      role: "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    db.nextUserId = 2;
    console.log("✓ Admin user seeded");
  }
}

// Hash password
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Initialize users table
export const initializeUsersTable: RequestHandler = (req, res) => {
  try {
    initializeSeed();
    res.json({
      success: true,
      message: "Users table initialized",
      userCount: db.users.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize users table" });
  }
};

// Register user
export const registerUser: RequestHandler = (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Check if user already exists
    if (db.users.some((u) => u.email === email)) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = hashPassword(password);
    const newUser: StoredUser = {
      id: db.nextUserId++,
      email,
      password: hashedPassword,
      name: name || email.split("@")[0],
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.users.push(newUser);

    res.json({
      success: true,
      message: "User registered successfully",
      userId: newUser.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login user
export const loginUser: RequestHandler = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = db.users.find(
      (u) => u.email === email && u.password === hashPassword(password),
    );

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token: Buffer.from(JSON.stringify(userWithoutPassword)).toString(
        "base64",
      ),
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Get user by ID
export const getUser: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const user = db.users.find((u) => u.id === userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Get all users (admin only)
export const getAllUsers: RequestHandler = (req, res) => {
  try {
    initializeSeed();

    const usersWithoutPasswords = db.users.map((u) => {
      const { password: _, ...user } = u;
      return user;
    });

    res.json(usersWithoutPasswords);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("getAllUsers error:", errorMessage);
    res.status(500).json({
      error: "Failed to fetch users",
      details: errorMessage,
    });
  }
};

// Initialize contacts table
export const initializeContactsTable: RequestHandler = (req, res) => {
  try {
    res.json({
      success: true,
      message: "Contacts table initialized",
      contactCount: db.contacts.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize contacts table" });
  }
};

// Save contact submission
export const submitContact: RequestHandler = (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body as ContactData;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newContact: StoredContact = {
      id: db.nextContactId++,
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
      status: "new",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.contacts.push(newContact);

    res.json({
      success: true,
      message: "Contact submission saved successfully",
      id: newContact.id,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("submitContact error:", errorMessage);
    res.status(500).json({
      error: "Failed to submit contact",
      details: errorMessage,
    });
  }
};

// Get all contacts (admin only)
export const getAllContacts: RequestHandler = (req, res) => {
  try {
    res.json(db.contacts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("getAllContacts error:", errorMessage);
    res.status(500).json({
      error: "Failed to fetch contacts",
      details: errorMessage,
    });
  }
};

// Update contact status (admin only)
export const updateContactStatus: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      res.status(400).json({ error: "Missing id or status" });
      return;
    }

    const contactId = parseInt(id);
    const contact = db.contacts.find((c) => c.id === contactId);

    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    contact.status = status;
    contact.updated_at = new Date().toISOString();

    res.json({
      success: true,
      message: "Contact status updated",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("updateContactStatus error:", errorMessage);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// Setup route - Initialize and seed data
export const setupSystem: RequestHandler = (req, res) => {
  try {
    console.log("Setting up system...");

    // Initialize seed data
    initializeSeed();

    res.json({
      success: true,
      message: "System setup completed successfully",
      stats: {
        users: db.users.length,
        contacts: db.contacts.length,
      },
      admin: {
        email: "admin@mwamunda.com",
        message: "Admin user created (default password: Pass123)",
      },
    });
  } catch (error) {
    console.error("Setup error:", error);
    res.status(500).json({
      error: "System setup failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
