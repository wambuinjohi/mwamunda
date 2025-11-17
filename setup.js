#!/usr/bin/env node

const API_URL = "http://localhost:8080";

async function setup() {
  try {
    console.log("🔧 Initializing users table...");
    const initRes = await fetch(`${API_URL}/api/auth/init-users-table`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const initData = await initRes.json();
    console.log("✅ Table initialization:", initData);

    console.log("\n🌱 Seeding admin user...");
    const seedRes = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@mwamunda.com",
        password: "Pass123",
        name: "Admin",
      }),
    });
    const seedData = await seedRes.json();
    console.log("✅ Admin user created:", seedData);

    console.log("\n✨ Setup complete!");
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    process.exit(1);
  }
}

setup();
