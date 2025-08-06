import express from "express";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { initDB } from "./config/db.js";
import transactionRoutes from "./routes/transactionRoute.js";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", transactionRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript Server");
});

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
