const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types, isValidObjectId } = require("mongoose");

exports.getDashBoardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncomeResult = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalIncome = totalIncomeResult[0]?.total || 0;

    const totalExpenseResult = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalExpense = totalExpenseResult[0]?.total || 0;

    const last60daysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60days = last60daysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const last30daysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30days = last30daysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
        ...txn.toObject(),
        type: "income"
      })),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
        ...txn.toObject(),
        type: "expense"
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5); // Limit to top 5 after sorting

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        totalBalance: totalIncome - totalExpense,
        last30daysExpenseTransactions: {
          total: expenseLast30days,
          transactions: last30daysExpenseTransactions
        },
        last60daysIncome: {
          total: incomeLast60days,
          transactions: last60daysIncomeTransactions
        },
        lastTransactions
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: error.message,
    });
  }
};
