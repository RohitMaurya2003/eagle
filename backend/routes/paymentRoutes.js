import express from 'express';
import { verifyPayment, getAllPayments, downloadExcel } from '../controllers/paymentController.js';

const router = express.Router();

// Payment verification - POST from frontend after Razorpay success
router.post('/verify', verifyPayment);

// Admin routes
router.get('/admin/payments', getAllPayments);
router.get('/admin/payments/excel', downloadExcel);

export default router;
