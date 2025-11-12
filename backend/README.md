# 🦅 360EagleWeb Backend API

Complete Node.js + Express + MongoDB backend for payment processing with Razorpay integration, payment verification, and admin dashboard with Excel export.

## 📋 Features

✅ **Razorpay Payment Integration**
- Secure payment verification using signature validation
- Support for multiple payment statuses
- Automatic payment storage in MongoDB

✅ **Admin Dashboard API**
- View all payment records (JSON)
- Download payments as Excel file
- Get payment statistics & analytics
- Admin authentication with secret key

✅ **Database (MongoDB)**
- User payment details storage
- Timestamps for all records
- Indexed queries for fast retrieval

✅ **Security**
- CORS configured for frontend
- Admin secret key authentication
- Razorpay signature verification
- Environment variables for sensitive data

✅ **Excel Export**
- Download all payments as `.xlsx` file
- Professional formatting with colors
- Auto-calculated totals

---

## 🚀 Quick Start

### 1️⃣ Install Dependencies

```bash
cd backend
npm install
```

### 2️⃣ Setup Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Edit `.env`:**
```env
# MongoDB Connection (Get from https://www.mongodb.com/cloud/atlas)
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/360eagle?retryWrites=true&w=majority

# Razorpay Keys (Get from https://dashboard.razorpay.com/app/keys)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxx

# Admin Secret (Create your own strong password)
ADMIN_SECRET=your_super_secret_admin_password_12345

# Server Settings
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:5173  # For CORS
```

### 3️⃣ Run Backend

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Expected output:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server running on http://localhost:5000
📡 Frontend connected from: http://localhost:5173
🔐 Admin Secret Required for admin endpoints
```

---

## 📡 API Endpoints

### 🔓 Public Endpoints

#### 1. Verify Payment
**POST** `/api/payment/verify`

Verify Razorpay payment signature and store payment details.

**Request Body:**
```json
{
  "razorpay_payment_id": "pay_xxx",
  "razorpay_order_id": "order_xxx",
  "razorpay_signature": "signature_xxx",
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "websiteDomain": "example.com",
  "keywords": ["SEO", "Backlinks", "Digital Marketing"],
  "amount": 599,
  "serviceName": "Premium Backlinks Package"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Payment verified and stored successfully",
  "code": "PAYMENT_VERIFIED",
  "data": {
    "paymentId": "pay_xxx",
    "amount": 599,
    "customerName": "John Doe",
    "email": "john@example.com",
    "domain": "example.com"
  }
}
```

**Error Response (400):**
```json
{
  "status": "error",
  "message": "Payment verification failed. Invalid signature.",
  "code": "INVALID_SIGNATURE"
}
```

#### 2. Health Check
**GET** `/api/payment/health`

Check if backend is running.

**Response (200):**
```json
{
  "status": "success",
  "message": "Backend is running",
  "code": "HEALTH_OK",
  "timestamp": "2024-11-12T10:30:00.000Z"
}
```

---

### 🔐 Admin Endpoints (Requires Authentication)

All admin endpoints require `x-admin-secret` header or `adminSecret` query parameter.

#### 1. Get All Payments
**GET** `/api/payment/admin/payments`

**Headers:**
```
x-admin-secret: your_super_secret_admin_password_12345
```

Or **Query:**
```
GET /api/payment/admin/payments?adminSecret=your_super_secret_admin_password_12345
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Payments fetched successfully",
  "code": "PAYMENTS_FETCHED",
  "data": {
    "totalPayments": 25,
    "totalAmount": 14975,
    "payments": [
      {
        "_id": "60d6f8c8f7c1a1b2c3d4e5f6",
        "fullName": "John Doe",
        "email": "john@example.com",
        "mobile": "9876543210",
        "websiteDomain": "example.com",
        "keywords": ["SEO", "Backlinks"],
        "amount": 599,
        "paymentId": "pay_xxx",
        "paymentStatus": "success",
        "serviceName": "Premium Package",
        "createdAt": "2024-11-12T10:30:00.000Z"
      }
    ]
  }
}
```

#### 2. Download Excel Report
**GET** `/api/payment/admin/payments/excel`

**Headers:**
```
x-admin-secret: your_super_secret_admin_password_12345
```

**Response:** Binary file (`.xlsx`)

File will be automatically downloaded as `payments_2024-11-12.xlsx`

#### 3. Get Statistics
**GET** `/api/payment/admin/stats`

**Headers:**
```
x-admin-secret: your_super_secret_admin_password_12345
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Statistics fetched successfully",
  "code": "STATS_FETCHED",
  "data": {
    "totalPayments": 25,
    "successfulPayments": 24,
    "failedPayments": 1,
    "totalRevenue": 14975,
    "conversionRate": "96.00"
  }
}
```

#### 4. Get Single Payment
**GET** `/api/payment/:paymentId`

**Headers:**
```
x-admin-secret: your_super_secret_admin_password_12345
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Payment details fetched",
  "code": "PAYMENT_FOUND",
  "data": {
    "_id": "60d6f8c8f7c1a1b2c3d4e5f6",
    "fullName": "John Doe",
    "email": "john@example.com",
    "amount": 599,
    "paymentStatus": "success"
  }
}
```

---

## 🔗 Frontend Integration

### Step 1: Update Payment Success Handler

In your frontend (`Services.tsx`, `Pricing.tsx`, `Home.tsx`), after Razorpay payment success, call the verify endpoint:

```jsx
// In your payDirect() or payment handler
const handler = async (response) => {
  try {
    // Call backend to verify payment
    const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        fullName: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        websiteDomain: formData.websiteUrl,
        keywords: formData.keywords?.split(',') || [],
        amount: selectedService.price,
        serviceName: selectedService.name,
      }),
    });

    const data = await verifyRes.json();

    if (data.status === 'success') {
      console.log('✅ Payment verified:', data.data);
      navigate('/payment/success', { state: data.data });
    } else {
      console.error('❌ Verification failed:', data.message);
      navigate('/payment/failed', { state: { reason: data.message } });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    navigate('/payment/failed', { state: { reason: error.message } });
  }
};
```

### Step 2: Display Payment Details

On success page, show customer details:

```jsx
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const paymentData = location.state || {};

  return (
    <div className="success-container">
      <h1>✅ Payment Successful!</h1>
      <div className="details">
        <p><strong>Payment ID:</strong> {paymentData.paymentId}</p>
        <p><strong>Customer:</strong> {paymentData.customerName}</p>
        <p><strong>Email:</strong> {paymentData.email}</p>
        <p><strong>Domain:</strong> {paymentData.domain}</p>
        <p><strong>Amount:</strong> ₹{paymentData.amount}</p>
      </div>
    </div>
  );
};
```

---

## 🧪 Testing

### Test Payment Verification Locally

Use **cURL** or **Postman**:

```bash
curl -X POST http://localhost:5000/api/payment/verify \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_payment_id": "pay_test_123",
    "razorpay_order_id": "order_test_123",
    "razorpay_signature": "signature_test_123",
    "fullName": "Test User",
    "email": "test@example.com",
    "mobile": "9876543210",
    "websiteDomain": "test.com",
    "keywords": ["test", "payment"],
    "amount": 100,
    "serviceName": "Test Service"
  }'
```

### Access Admin Panel

```bash
# Get all payments
curl http://localhost:5000/api/payment/admin/payments \
  -H "x-admin-secret: your_super_secret_admin_password_12345"

# Download Excel
curl http://localhost:5000/api/payment/admin/payments/excel \
  -H "x-admin-secret: your_super_secret_admin_password_12345" \
  -o payments.xlsx
```

---

## 📁 Folder Structure

```
backend/
├── controllers/
│   └── paymentController.js      # Payment logic
├── models/
│   └── paymentModel.js           # MongoDB schema
├── routes/
│   └── paymentRoutes.js          # API endpoints
├── middleware/
│   └── adminAuth.js              # Admin authentication
├── config/
│   └── db.js                     # MongoDB connection
├── server.js                     # Express setup
├── package.json                  # Dependencies
├── .env.example                  # Environment template
├── .env                          # Your credentials
└── README.md                     # This file
```

---

## 🔐 Security Checklist

- ✅ Environment variables for sensitive data
- ✅ Razorpay signature verification
- ✅ Admin secret key authentication
- ✅ CORS configured for specific origin
- ✅ Body size limit (50MB)
- ✅ Error handling without exposing sensitive info
- ⚠️ **Never commit `.env` file**
- ⚠️ **Use strong ADMIN_SECRET**
- ⚠️ **Verify payment on backend (not frontend only)**

---

## 🛠️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `RAZORPAY_KEY_ID` | Razorpay public key | `rzp_live_xxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | `xxxxxxxxxxxxxx` |
| `ADMIN_SECRET` | Admin panel password | `my_strong_secret_12345` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` or `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

---

## 📊 Database Schema (MongoDB)

### UserPayment Collection

```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  mobile: String,
  websiteDomain: String,
  keywords: [String],
  amount: Number,
  paymentId: String (unique),
  orderId: String,
  paymentStatus: 'success' | 'failed' | 'pending' | 'refunded',
  serviceName: String,
  notes: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check `MONGO_URI` in `.env`
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify username/password

### Razorpay Signature Mismatch
- Confirm `RAZORPAY_KEY_SECRET` is correct
- Signature is generated from `order_id|payment_id`
- Re-verify calculation in frontend

### CORS Errors
- Check `FRONTEND_URL` in `.env` matches your frontend domain
- Ensure `x-admin-secret` header is included
- Browser may cache CORS policies—clear cache

### Admin Secret Not Working
- Verify exact match in `.env` (case-sensitive)
- Try passing as query parameter: `?adminSecret=xxx`
- Check header name: `x-admin-secret` (lowercase)

---

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **razorpay** - Payment gateway SDK
- **xlsx** - Excel file generation
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **body-parser** - Parse request bodies
- **nodemon** - Dev auto-reload

---

## 🚀 Deployment (Vercel/Heroku/Railway)

### Before Deploying:
1. Add all `.env` variables to deployment platform
2. Set `FRONTEND_URL` to your actual frontend domain
3. Ensure MongoDB is accessible from deployment server
4. Update Razorpay webhook URLs if needed

### Deploy to Railway (Recommended):

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Deploy to Vercel (Serverless):

Not recommended for long-running services. Use Railway, Heroku, or traditional hosting instead.

---

## 📞 Support

For issues or questions:
- Check MongoDB connection
- Verify Razorpay keys
- Check logs: `npm run dev`
- Review error messages in response

---

## 📄 License

MIT - You're free to use this backend!

---

**Made with ❤️ by 360EagleWeb**
