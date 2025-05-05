const XLSX = require("xlsx");
const Expense = require("../models/expense");

// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date,
    });

    const savedExpense = await newExpense.save();

    res.status(200).json({
      success: true,
      message: "Expense added successfully",
      data: savedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding expense",
      error: error.message,
    });
  }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching expenses",
      error: error.message,
    });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await Expense.findByIdAndDelete(expenseId);

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete expense",
      error: error.message,
    });
  }
};

// Download Expenses as Excel
// Download Expenses as Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
      // Fetch all expenses for the user
      const expenses = await Expense.find({ userId }).sort({ date: -1 });
  
      // Prepare the data to be written into the Excel file
      const expenseData = expenses.map((expense, index) => ({
        "S.No": index + 1,
        Icon: expense.icon || "N/A", // If there's no icon, show "N/A"
        Category: expense.category,
        Amount: expense.amount,
        Date: expense.date.toDateString(), // Format the date as a readable string
      }));
  
      // Create a new workbook and convert the expense data to a worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(expenseData);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Expenses");
  
      // Write the file to disk
      const filePath = './expense_details.xlsx';
      XLSX.writeFile(wb, filePath);
  
      // Send the file as a download
      res.download(filePath, (err) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "Error generating Excel file",
            error: err.message,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error generating Excel file",
        error: error.message,
      });
    }
  };
  