// Helper function to verify payment with backend
export const verifyPaymentWithBackend = async (paymentData) => {
  try {
    const response = await fetch('http://localhost:5000/api/payment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Payment verification failed');
    }

    return result;
  } catch (error) {
    console.error('Backend verification error:', error);
    throw error;
  }
};

// Usage in your payment handler:
// After Razorpay success, call:
// const verifyResult = await verifyPaymentWithBackend({
//   razorpay_payment_id: response.razorpay_payment_id,
//   razorpay_order_id: response.razorpay_order_id,
//   razorpay_signature: response.razorpay_signature,
//   fullName, email, mobile, websiteDomain, keywords, amount, serviceName
// });
