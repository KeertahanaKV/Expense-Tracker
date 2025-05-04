const XLSX = require("xlsx");
const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date,
    });

    const savedIncome = await newIncome.save();

    res.status(200).json({
      success: true,
      message: "Income added successfully",
      data: savedIncome,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error adding income",
        error: error.message,
      });
  }
};

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomeList = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "Income records fetched",
      data: incomeList,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching income",
        error: error.message,
      });
  }
};

exports.deleteIncome = async (req, res) => {
    
    try {
      const incomeId = req.params.id;
  
      // Check if income exists
      const income = await Income.findById(incomeId);
      if (!income) {
        return res.status(404).json({
          success: false,
          message: "Income not found",
        });
      }
  
      // Delete the income
      await Income.findByIdAndDelete(incomeId);
  
      res.status(200).json({
        success: true,
        message: "Income deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete income",
        error: error.message,
      });
    }
  };
  


 
  
  exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
  
      // Fetch all income data for the user
      const incomes = await Income.find({ userId }).sort({ date: -1 });
  
      // Convert MongoDB data to plain JavaScript object
      const incomeData = incomes.map((income, index) => ({
        "S.No": index + 1,
        Source: income.source,
        Amount: income.amount,
        Date: income.date.toDateString(),
      }));
  
      const wb=XLSX.utils.book_new()
      const ws=XLSX.utils.json_to_sheet(incomeData)
      XLSX.utils.book_append_sheet(wb,ws,"Income")
      XLSX.writeFile(wb,'income_details.xlsx')
      res.download('income_details.xlsx')
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error generating Excel file",
        error: error.message,
      });
    }
  };
  
