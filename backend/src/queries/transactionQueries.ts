import sql from "../config/db.js";

class transactionQueries {
  getTransactionsByUserID(userId: string) {
    const query = sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    return query;
  }
  createTransaction(
    userId: string,
    title: string,
    amount: number,
    category: string
  ) {
    const query = sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${userId}, ${title}, ${amount}, ${category})
      RETURNING *;
    `;
    return query;
  }
  deleteTransaction(id: number) {
    const query = sql`DELETE FROM transactions WHERE id = ${id} RETURNING *;`;
    return query;
  }
  getSummaryByUserId(userId: string) {
    const balanceQuery = sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
    `;
    const incomeQuery = sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `;
    const expensesQuery = sql`
      SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `;

    return Promise.all([balanceQuery, incomeQuery, expensesQuery]);
  }
}
export default new transactionQueries();
