import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    billed_amount: { type: Number, required: true },
    paid_amount: { type: Number, default: 0 },
    date1: { type: Date, required: true },
    date2: { type: Date },
    paid_or_not: { type: String, enum: ["Yes", "No"], required: true },
    billNo: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);
