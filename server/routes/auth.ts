import { RequestHandler } from "express";
import crypto from "crypto";

const API_URL = "https://mwamunda.ziratech.com/api.php";

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
          updated_at:
            "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
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
      (u: any) => u.email === email && u.password === hashPassword(password),
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

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const users = await response.json();

    // Handle case where API returns an error message
    if (typeof users === 'object' && users.error) {
      res.status(500).json({ error: users.error });
      return;
    }

    // Ensure users is an array
    if (!Array.isArray(users)) {
      res.json([]);
      return;
    }

    // Remove passwords
    const usersWithoutPasswords = users.map((u: any) => {
      const { password: _, ...user } = u;
      return user;
    });

    res.json(usersWithoutPasswords);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("getAllUsers error:", errorMessage);
    res.status(500).json({
      error: "Failed to fetch users",
      details: errorMessage
    });
  }
};

// Initialize contacts table
export const initializeContactsTable: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: "contacts",
        action: "create_table",
        columns: {
          name: "VARCHAR(255) NOT NULL",
          email: "VARCHAR(255) NOT NULL",
          phone: "VARCHAR(50)",
          subject: "VARCHAR(255) NOT NULL",
          message: "TEXT NOT NULL",
          status: "VARCHAR(50) DEFAULT 'new'",
          created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
          updated_at:
            "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize contacts table" });
  }
};

// Save contact submission
export const submitContact: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body as ContactData;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: "contacts",
        data: {
          name,
          email,
          phone: phone || null,
          subject,
          message,
          status: "new",
        },
      }),
    });

    const data = await response.json();

    if (data.success || data.id) {
      res.json({
        success: true,
        message: "Contact submission saved successfully",
        id: data.id,
      });
    } else {
      res.status(400).json({ error: data.error || "Failed to save contact" });
    }
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
export const getAllContacts: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}?table=contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const contacts = await response.json();

    if (typeof contacts === "object" && contacts.error) {
      res.status(500).json({ error: contacts.error });
      return;
    }

    if (!Array.isArray(contacts)) {
      res.json([]);
      return;
    }

    res.json(contacts);
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
export const updateContactStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      res.status(400).json({ error: "Missing id or status" });
      return;
    }

    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: "contacts",
        id: parseInt(id),
        data: { status },
      }),
    });

    const data = await response.json();

    if (data.success) {
      res.json({
        success: true,
        message: "Contact status updated",
      });
    } else {
      res.status(400).json({ error: data.error || "Failed to update status" });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("updateContactStatus error:", errorMessage);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// Setup route - Initialize table and seed admin user
export const setupSystem: RequestHandler = async (req, res) => {
  try {
    // Step 1: Initialize users table
    console.log("Initializing users table...");
    const tableRes = await fetch(API_URL, {
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
          updated_at:
            "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
      }),
    });

    const tableData = await tableRes.json();
    console.log("Table initialization response:", tableData);

    // Step 2: Initialize contacts table
    console.log("Initializing contacts table...");
    const contactsTableRes = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: "contacts",
        action: "create_table",
        columns: {
          name: "VARCHAR(255) NOT NULL",
          email: "VARCHAR(255) NOT NULL",
          phone: "VARCHAR(50)",
          subject: "VARCHAR(255) NOT NULL",
          message: "TEXT NOT NULL",
          status: "VARCHAR(50) DEFAULT 'new'",
          created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
          updated_at:
            "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
      }),
    });

    const contactsTableData = await contactsTableRes.json();
    console.log("Contacts table initialization response:", contactsTableData);

    // Step 3: Seed admin user
    console.log("Seeding admin user...");
    const adminEmail = "admin@mwamunda.com";
    const adminPassword = "Pass123";
    const hashedPassword = hashPassword(adminPassword);

    const userRes = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: "users",
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: "Admin",
          role: "admin",
        },
      }),
    });

    const userData = await userRes.json();
    console.log("User creation response:", userData);

    res.json({
      success: true,
      message: "System setup completed successfully",
      tables: {
        users: tableData,
        contacts: contactsTableData,
      },
      admin: {
        email: adminEmail,
        message: "Admin user created",
        response: userData,
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
