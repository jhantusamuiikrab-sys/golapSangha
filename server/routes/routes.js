import express from 'express';
import { createBill } from '../controllers/billController.js';

const router = express.Router();

router.post("/create", createBill);

export default router;