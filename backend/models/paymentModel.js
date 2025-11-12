import mongoose from 'mongoose';

const userPaymentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    websiteDomain: {
      type: String,
      required: [true, 'Website domain is required'],
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    paymentId: {
      type: String,
      required: [true, 'Payment ID is required'],
      unique: true,
    },
    orderId: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
    },
    serviceName: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Create a text index for searching
userPaymentSchema.index({ email: 1, mobile: 1, paymentId: 1 });

const UserPayment = mongoose.model('UserPaymentData', userPaymentSchema);

export default UserPayment;
