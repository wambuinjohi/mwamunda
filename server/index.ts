import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  initializeUsersTable,
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  setupSystem,
  initializeContactsTable,
  submitContact,
  getAllContacts,
  updateContactStatus,
} from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/init-users-table", initializeUsersTable);
  app.post("/api/auth/register", registerUser);
  app.post("/api/auth/login", loginUser);
  app.get("/api/auth/user/:id", getUser);
  app.get("/api/auth/users", getAllUsers);

  // Contact routes
  app.post("/api/contacts/init-table", initializeContactsTable);
  app.post("/api/contacts", submitContact);
  app.get("/api/contacts", getAllContacts);
  app.put("/api/contacts/:id", updateContactStatus);

  // Setup route
  app.post("/api/setup", setupSystem);

  return app;
}
