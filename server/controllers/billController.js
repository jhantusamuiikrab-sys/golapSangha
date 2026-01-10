import billModel from "../models/billModel.js";


export const createBill = async (req, res) => {
  try {
    const {
      name,
      billed_amount,
      paid_amount,
      date1,
      date2,
      paid_or_not,
      billNo,
    } = req.body;

    // Validation
    if (!name || !billed_amount || !date1 || !paid_or_not || !billNo) {
      return res.status(400).json({
        message: "Mandatory fields missing",
      });
    }

    // Duplicate Bill No check
    const existingBill = await billModel.findOne({ billNo });
    if (existingBill) {
      return res.status(409).json({
        message: "Bill with this Bill No already exists",
      });
    }

    const bill = await billModel.create({
      name,
      billed_amount,
      paid_amount,
      date1,
      date2,
      paid_or_not,
      billNo,
    });

    res.status(201).json({
      message: "Bill created successfully",
      bill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
