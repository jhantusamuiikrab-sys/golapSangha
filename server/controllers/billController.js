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

export const getBillByBillNo = async (req, res) => {
  try {
    const { billNo } = req.body;
    const bill = await billModel.findOne({ billNo });

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bill",
      error: error.message,
    });
  }
};

export const updateBill = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      billed_amount,
      paid_amount,
      date1,
      date2,
      paid_or_not,
      billNo,
    } = req.body;

    // Check if bill exists
    const bill = await billModel.findById(id);
    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    // Prevent duplicate Bill No
    if (billNo && billNo !== bill.billNo) {
      const duplicate = await billModel.findOne({ billNo });
      if (duplicate) {
        return res.status(409).json({
          message: "Bill No already exists",
        });
      }
    }

    const updatedBill = await billModel.findByIdAndUpdate(
      id,
      {
        name,
        billed_amount,
        paid_amount,
        date1,
        date2,
        paid_or_not,
        billNo,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Bill updated successfully",
      updatedBill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update bill",
      error: error.message,
    });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await billModel.findById(id);
    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    await billModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Bill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete bill",
      error: error.message,
    });
  }
};
