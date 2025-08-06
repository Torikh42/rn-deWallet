import express from "express";
import { createTransaction, deleteTransaction, getTransactionsByUserID, getSummaryByUserId } from "../controllers/transactionController.js";

const router = express.Router();

// Perbaiki urutan route (spesifik di atas)
router.post("/transactions", createTransaction);
router.get("/transactions/:userId", getTransactionsByUserID);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions/summary/:userId", getSummaryByUserId);

export default router;