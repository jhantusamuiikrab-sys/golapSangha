import billModel from "../models/billModel.js";

export const getAllBills = async (req, res) => {
  try {
    const bills = await billModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: bills.length,
      bills,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bills",
      error: error.message,
    });
  }
};