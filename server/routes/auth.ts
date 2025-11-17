import { RequestHandler } from "express";
import crypto from "crypto";

const API_URL = "https://mwamunda.ziratech.com/api.php";

// Hash password
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Initialize users table
export const initializeUsersTable: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: "users",
        action: "create_table",
        columns: {
          email: "VARCHAR(255) UNIQUE NOT NULL",
          password: "VARCHAR(255) NOT NULL",
          name: "VARCHAR(255)",
          role: "VARCHAR(50) DEFAULT 'user'",
          created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
          updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize users table" });
  }
};

// Register user
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const hashedPassword = hashPassword(password);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: "users",
        data: {
          email,
          password: hashedPassword,
          name: name || email.split("@")[0],
          role: "user",
        },
      }),
    });

    const data = await response.json();

    if (data.success) {
      res.json({
        success: true,
        message: "User registered successfully",
        userId: data.id,
      });
    } else {
      res.status(400).json({ error: data.error || "Failed to register user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login user
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Fetch user from database
    const response = await fetch(`${API_URL}?table=users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const users = await response.json();

    // Find user by email
    const user = users.find(
      (u: any) => u.email === email && u.password === hashPassword(password)
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
      token: Buffer.from(JSON.stringify(userWithoutPassword)).toString("base64"),
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Get user by ID
export const getUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${API_URL}?table=users&id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const { password: _, ...userWithoutPassword } = data[0];
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Get all users (admin only)
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}?table=users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const users = await response.json();

    // Remove passwords
    const usersWithoutPasswords = users.map((u: any) => {
      const { password: _, ...user } = u;
      return user;
    });

    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
