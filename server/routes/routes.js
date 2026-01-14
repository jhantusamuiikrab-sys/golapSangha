import express from "express";
import {
  createBill,
  deleteBill,
  getBillByBillNo,
  updateBill,
} from "../controllers/billController.js";
import { getAllBills } from "../controllers/dashboardController.js";

const router = express.Router();

router.post("/create", createBill);
router.get("/getAllBills", getAllBills);
router.post("/getBillByBillno", getBillByBillNo);
router.put("/updateBill/:id", updateBill);
router.delete("/deleteBill/:id", deleteBill);

// Dashboard

export default router;
