import crypto from 'crypto';
import UserPayment from '../models/paymentModel.js';
import ExcelJS from 'exceljs';

// Verify Razorpay Payment Signature
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userData } = req.body;

    console.log('📥 Payment verification request received:', {
      razorpay_order_id,
      razorpay_payment_id,
      userData
    });

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error('❌ Signature mismatch!');
      return res.status(400).json({
        status: 'error',
        message: 'Payment verification failed - Invalid signature'
      });
    }

    console.log('✅ Signature verified successfully!');

    // Save payment details to MongoDB
    const payment = new UserPayment({
      fullName: userData.fullName,
      email: userData.email,
      mobile: userData.mobile,
      websiteDomain: userData.websiteDomain,
      keywords: userData.keywords || [],
      amount: userData.amount,
      paymentId: razorpay_payment_id,
      paymentStatus: 'success',
      orderId: razorpay_order_id
    });

    const savedPayment = await payment.save();
    console.log('💾 Payment saved to MongoDB:', savedPayment);

    res.status(200).json({
      status: 'success',
      message: 'Payment verified and saved successfully!',
      data: savedPayment
    });

  } catch (error) {
    console.error('❌ Error in verifyPayment:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Payment verification failed',
      error: error.message
    });
  }
};

// Get all payments (Admin Only)
export const getAllPayments = async (req, res) => {
  try {
    const adminSecret = req.headers['x-admin-secret'];

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized - Invalid admin secret'
      });
    }

    const payments = await UserPayment.find();
    
    res.status(200).json({
      status: 'success',
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch payments',
      error: error.message
    });
  }
};

// Download Excel file (Admin Only)
export const downloadExcel = async (req, res) => {
  try {
    const adminSecret = req.headers['x-admin-secret'];

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized - Invalid admin secret'
      });
    }

    const payments = await UserPayment.find();

    if (payments.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No payment records found'
      });
    }

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Payments');

    // Add headers
    worksheet.columns = [
      { header: 'Full Name', key: 'fullName', width: 15 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'Mobile', key: 'mobile', width: 15 },
      { header: 'Website Domain', key: 'websiteDomain', width: 20 },
      { header: 'Keywords', key: 'keywords', width: 30 },
      { header: 'Amount', key: 'amount', width: 10 },
      { header: 'Payment ID', key: 'paymentId', width: 20 },
      { header: 'Status', key: 'paymentStatus', width: 12 },
      { header: 'Date', key: 'date', width: 20 }
    ];

    // Add data rows
    payments.forEach(payment => {
      worksheet.addRow({
        fullName: payment.fullName,
        email: payment.email,
        mobile: payment.mobile,
        websiteDomain: payment.websiteDomain,
        keywords: payment.keywords.join(', '),
        amount: payment.amount,
        paymentId: payment.paymentId,
        paymentStatus: payment.paymentStatus,
        date: new Date(payment.date).toLocaleString()
      });
    });

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="payments_report.xlsx"');

    // Write to buffer and send
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate Excel file',
      error: error.message
    });
  }
};
