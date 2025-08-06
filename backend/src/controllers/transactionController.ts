import type { Request, Response } from "express";
import sql from "../config/db.js";
import transactionQueries from "../queries/transactionQueries.js";

export async function getTransactionsByUserID(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (!userId || typeof userId !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid userId parameter" });
    }
    const transactions = await transactionQueries.getTransactionsByUserID(
      userId
    );
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const { userId, title, amount, category } = req.body;
    if (!userId || !title || !amount || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTransaction = await transactionQueries.createTransaction(
      userId,
      title,
      amount,
      category
    );
    res.status(201).json(newTransaction[0]);
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }
    const result = await transactionQueries.deleteTransaction(parseInt(id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getSummaryByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (!userId || typeof userId !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid userId parameter" });
    }
    const [balanceResult, incomeResult, expensesResult] =
      await transactionQueries.getSummaryByUserId(userId);
    const summary = {
      balance: balanceResult[0]?.balance ?? 0,
      income: incomeResult[0]?.income ?? 0,
      expenses: expensesResult[0]?.expenses ?? 0,
    };
    res.status(200).json(summary);
  } catch (error) {
    console.log("Error gettin the summary", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
