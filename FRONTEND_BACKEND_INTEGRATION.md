# 🔗 Frontend - Backend Integration Guide

## Overview

Your React frontend will now send payment data to the Node.js backend after Razorpay payment succeeds.

**Flow:**
```
Frontend (Razorpay Payment)
    ↓
Razorpay Modal
    ↓
User Enters Card Details
    ↓
Payment Success (response with payment_id, signature)
    ↓
Frontend sends data to Backend
    ↓
Backend verifies signature + stores in MongoDB
    ↓
Return success → Show customer details
```

---

## 🚀 Step-by-Step Integration

### Step 1: Update Environment Variables

In your frontend `.env.local`:

```env
# Add your backend URL
VITE_BACKEND_URL=http://localhost:5000
```

### Step 2: Update Services.tsx Payment Handler

Replace the existing `payDirect` function in `src/pages/Services.tsx`:

```tsx
import { useNavigate } from 'react-router-dom';
import { verifyPaymentWithBackend } from '../utils/backendAPI';

const Services = () => {
  const navigate = useNavigate();
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    mobile: '',
    websiteUrl: '',
    keywords: '',
  });

  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const formatAmount = (amount: number): number => Math.round(amount * 100);

  const payDirect = async (
    serviceName: string,
    price: number,
    description?: string
  ) => {
    try {
      // Collect customer details first
      const name = prompt('Enter your full name:');
      if (!name) return;

      const email = prompt('Enter your email:');
      if (!email) return;

      const mobile = prompt('Enter your mobile number:');
      if (!mobile) return;

      const domain = prompt('Enter your website domain (e.g., example.com):');
      if (!domain) return;

      const keywords = prompt(
        'Enter keywords (comma separated, e.g., seo, backlinks):'
      );

      // Load Razorpay SDK
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert('Payment gateway failed to load.');
        return;
      }

      if (!RAZORPAY_KEY_ID) {
        alert('Payment not configured.');
        return;
      }

      // Razorpay payment options
      const options: any = {
        key: RAZORPAY_KEY_ID,
        amount: formatAmount(price),
        currency: 'INR',
        name: '360EagleWeb',
        description: description || serviceName,
        prefill: {
          name,
          email,
          contact: mobile,
        },
        handler: async (response: any) => {
          try {
            // ✅ Verify payment with backend
            const verifyResult = await verifyPaymentWithBackend({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              fullName: name,
              email,
              mobile,
              websiteDomain: domain,
              keywords: keywords
                ? keywords.split(',').map((k) => k.trim())
                : [],
              amount: price,
              serviceName,
            });

            if (verifyResult.status === 'success') {
              // ✅ Navigate to success with payment details
              navigate('/payment/success', {
                state: verifyResult.data,
              });
            } else {
              navigate('/payment/failed', {
                state: { reason: verifyResult.message },
              });
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            navigate('/payment/failed', {
              state: { reason: error.message },
            });
          }
        },
        modal: {
          ondismiss: () => {
            navigate('/payment/failed', {
              state: { reason: 'Payment dismissed by user' },
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp: any) => {
        navigate('/payment/failed', {
          state: { reason: resp?.error?.description || 'Payment failed' },
        });
      });
      rzp.open();
    } catch (err) {
      console.error('Error:', err);
      navigate('/payment/failed', {
        state: { reason: 'Unexpected error' },
      });
    }
  };

  // Your button
  return (
    <button onClick={() => payDirect('Service Name', 599)}>
      Order Now
    </button>
  );
};
```

### Step 3: Update Backend API Utility

Update `src/utils/backendAPI.ts`:

```typescript
interface PaymentVerifyData {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  fullName: string;
  email: string;
  mobile: string;
  websiteDomain: string;
  keywords: string[];
  amount: number;
  serviceName: string;
}

export const verifyPaymentWithBackend = async (
  paymentData: PaymentVerifyData
) => {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  try {
    const response = await fetch(
      `${BACKEND_URL}/api/payment/verify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      }
    );

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

// Admin API helpers
export const getAdminPayments = async (adminSecret: string) => {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const response = await fetch(
    `${BACKEND_URL}/api/payment/admin/payments`,
    {
      headers: {
        'x-admin-secret': adminSecret,
      },
    }
  );

  return response.json();
};

export const downloadPaymentsExcel = async (adminSecret: string) => {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const response = await fetch(
    `${BACKEND_URL}/api/payment/admin/payments/excel`,
    {
      headers: {
        'x-admin-secret': adminSecret,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to download Excel');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `payments_${new Date().toISOString().split('T')[0]}.xlsx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const getAdminStats = async (adminSecret: string) => {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const response = await fetch(
    `${BACKEND_URL}/api/payment/admin/stats`,
    {
      headers: {
        'x-admin-secret': adminSecret,
      },
    }
  );

  return response.json();
};
```

### Step 4: Update Success Page

Modify `src/App.tsx` success route to display payment details:

```tsx
// Inside App.tsx Routes, replace the success route with:

<Route
  path="/payment/success"
  element={
    <div className="min-h-screen flex items-center justify-center bg-green-50 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-4">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. We've received your order and will contact
          you within 24 hours.
        </p>

        {/* Display Payment Details */}
        {location.state && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-bold text-blue-900 mb-3">Order Details:</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                <strong>Payment ID:</strong>{' '}
                {location.state.paymentId || 'N/A'}
              </p>
              <p>
                <strong>Name:</strong>{' '}
                {location.state.customerName || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {location.state.email || 'N/A'}
              </p>
              <p>
                <strong>Domain:</strong> {location.state.domain || 'N/A'}
              </p>
              <p>
                <strong>Amount:</strong> ₹{location.state.amount || 0}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <a
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
          >
            Return to Home
          </a>
          <a
            href="https://wa.me/919521281509"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
          >
            💬 WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  }
/>
```

---

## 🧪 Testing the Integration

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

Expected output:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server running on http://localhost:5000
```

### 2. Start Frontend

```bash
npm run dev
```

### 3. Test Payment Flow

1. Click "Order Now" on any service
2. Enter test details when prompted
3. Use Razorpay test card: `4111 1111 1111 1111`
4. Enter any future expiry and CVV
5. OTP: `123456`
6. ✅ Should see success page with payment details
7. Check backend logs to confirm payment saved in MongoDB

---

## 📊 Verify Data in MongoDB

Connect to MongoDB Atlas and check `UserPayment` collection:

```bash
# View recent payments
db.userpayments.find().sort({ createdAt: -1 }).limit(5)
```

Should see:
```json
{
  "_id": ObjectId(...),
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "websiteDomain": "example.com",
  "keywords": ["seo", "backlinks"],
  "amount": 599,
  "paymentId": "pay_xxx",
  "paymentStatus": "success",
  "serviceName": "Premium Package",
  "createdAt": ISODate("2024-11-12T10:30:00Z")
}
```

---

## 👨‍💼 Access Admin Panel

Create a simple admin page to view payments:

**Create `src/pages/AdminDashboard.tsx`:**

```tsx
import React, { useState } from 'react';
import {
  getAdminPayments,
  downloadPaymentsExcel,
  getAdminStats,
} from '../utils/backendAPI';

const AdminDashboard = () => {
  const [adminSecret, setAdminSecret] = useState('');
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await getAdminPayments(adminSecret);
      if (result.status === 'success') {
        setPayments(result.data.payments);
        setIsAuthenticated(true);
        // Get stats
        const statsResult = await getAdminStats(adminSecret);
        setStats(statsResult.data);
      } else {
        alert('Invalid admin secret');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      await downloadPaymentsExcel(adminSecret);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <input
            type="password"
            placeholder="Enter admin secret"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-gray-600">Total Payments</p>
            <p className="text-2xl font-bold">{stats.totalPayments}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-gray-600">Revenue</p>
            <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-gray-600">Successful</p>
            <p className="text-2xl font-bold">{stats.successfulPayments}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-gray-600">Conversion</p>
            <p className="text-2xl font-bold">{stats.conversionRate}%</p>
          </div>
        </div>
      )}

      {/* Download Excel Button */}
      <button
        onClick={handleDownloadExcel}
        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold mb-6 hover:bg-green-700"
      >
        📊 Download Excel Report
      </button>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t">
                <td className="px-6 py-4">{payment.fullName}</td>
                <td className="px-6 py-4">{payment.email}</td>
                <td className="px-6 py-4">₹{payment.amount}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-200 px-2 py-1 rounded">
                    {payment.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
```

Add to routes in `src/App.tsx`:

```tsx
import AdminDashboard from './pages/AdminDashboard';

// In Routes:
<Route path="/admin" element={<AdminDashboard />} />
```

---

## 🔐 Security Checklist

- ✅ Backend verifies Razorpay signature
- ✅ Admin secret protects admin routes
- ✅ Payment data stored in MongoDB
- ✅ CORS configured for your domain
- ⚠️ Never expose `RAZORPAY_KEY_SECRET` in frontend
- ⚠️ Keep `ADMIN_SECRET` strong
- ⚠️ Use HTTPS in production

---

## 🚀 Deployment Checklist

### Frontend (.env):
```env
VITE_RAZORPAY_KEY_ID=your_live_key
VITE_BACKEND_URL=https://your-backend-domain.com
```

### Backend (.env):
```env
MONGO_URI=your_production_mongodb_uri
RAZORPAY_KEY_ID=your_live_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
ADMIN_SECRET=strong_secret
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
NODE_ENV=production
```

---

Great! Your frontend and backend are now fully integrated! 🎉
