import { neon } from "@neondatabase/serverless";
import "dotenv/config";

//create a sql connection using DB Url

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}
const sql = neon(databaseUrl);

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY, 
      USER_ID varchar(255) NOT NULL, 
      title VARCHAR(255) NOT NULL, 
      amount DECIMAL(10, 2), 
      category VARCHAR(255) NOT NULL, 
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

export default sql;