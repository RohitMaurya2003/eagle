# 🏗️ System Architecture

## Complete Payment Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│                                                              │
│  Services.tsx / Pricing.tsx / Home.tsx                      │
│    ↓                                                         │
│  User clicks "Order Now"                                    │
│    ↓                                                         │
│  Browser prompt for: Name, Email, Mobile, Domain, Keywords  │
│    ↓                                                         │
│  Razorpay SDK loads (from CDN)                             │
│    ↓                                                         │
│  User enters card details → Razorpay processes payment      │
│    ↓                                                         │
│  Razorpay returns: payment_id, order_id, signature          │
│    ↓                                                         │
│  Frontend calls: POST /api/payment/verify                  │
│    │ (with all customer data + payment credentials)        │
│    │                                                        │
│    └──────────────────────────────────────────────┐        │
│                                                   ↓        │
├───────────────────────────────────────────────────────────┤
│                 BACKEND (Node.js + Express)                │
│                                                            │
│  POST /api/payment/verify                                 │
│    ├─ Verify Razorpay signature (crypto)                 │
│    ├─ Validate customer data                             │
│    ├─ Create UserPayment object                          │
│    ├─ Save to MongoDB ✅                                  │
│    └─ Return success with payment details                │
│                                                            │
└────────────────────────────────────────────────────────────┘
         ↓
    Response sent back to frontend
         ↓
    Frontend navigates to /payment/success
         ↓
    Display:
      • Payment ID
      • Customer Name
      • Email
      • Domain
      • Amount
```

---

## Architecture Diagram

```
                          🌐 INTERNET
                               ↑
                ┌──────────────────────────────┐
                │   Razorpay Payment Gateway   │
                │    (Secure Payment Modal)    │
                └──────────────────────────────┘
                               ↑
        ┌──────────────────────┴──────────────────────┐
        ↓                                             ↓
    ┌─────────────────────┐              ┌─────────────────────┐
    │   FRONTEND          │              │    BACKEND          │
    │  (React + Vite)     │              │ (Express + Node.js) │
    │                     │              │                     │
    │ ┌─────────────────┐ │              │ ┌─────────────────┐ │
    │ │  Services.tsx   │ │◄─────────────┤ │  POST /verify   │ │
    │ │  Pricing.tsx    │ │  HTTP POST   │ │                 │ │
    │ │  Home.tsx       │ │              │ └─────────────────┘ │
    │ └─────────────────┘ │              │         ↓            │
    │        ↓            │              │  Verify Signature   │
    │   payDirect()       │              │        ↓            │
    │        ↓            │              │  Save to MongoDB    │
    │  Razorpay Modal     │              │        ↓            │
    │        ↓            │              │  Return success     │
    │  Get payment_id     │              │                     │
    │  signature, order   │              │ ┌─────────────────┐ │
    │        ↓            │              │ │ GET /payments   │ │
    │  Send to Backend    │              │ │   (Admin Only)  │ │
    │        ↓            │              │ └─────────────────┘ │
    │  Show success page  │              │         ↓            │
    │  + payment details  │              │  Return JSON list   │
    │                     │              │                     │
    └─────────────────────┘              │ ┌─────────────────┐ │
                                         │ │ GET /excel      │ │
                                         │ │   (Admin Only)  │ │
                                         │ └─────────────────┘ │
                                         │         ↓            │
                                         │ Generate + Download  │
                                         │    Excel file       │
                                         │                     │
                                         └─────────────────────┘
                                                  ↓
                                     ┌────────────────────────┐
                                     │     MONGODB            │
                                     │                        │
                                     │  UserPayment          │
                                     │  Collection           │
                                     │                        │
                                     │ {                      │
                                     │  fullName,             │
                                     │  email,                │
                                     │  mobile,               │
                                     │  websiteDomain,        │
                                     │  keywords,             │
                                     │  amount,               │
                                     │  paymentId,            │
                                     │  paymentStatus,        │
                                     │  createdAt             │
                                     │ }                      │
                                     └────────────────────────┘
```

---

## Database Schema

```
┌─────────────────────────────────────────────┐
│  MongoDB: 360eagle (Database)               │
└─────────────────────────────────────────────┘
              ↓
        ┌─────────────────────────────────────────────┐
        │  userpayments (Collection)                  │
        │                                             │
        ├─ _id: ObjectId                            │
        ├─ fullName: String  ⭐ indexed              │
        ├─ email: String     ⭐ indexed              │
        ├─ mobile: String    ⭐ indexed              │
        ├─ websiteDomain: String                    │
        ├─ keywords: [String]                       │
        ├─ amount: Number                           │
        ├─ paymentId: String (unique)  ⭐ indexed   │
        ├─ orderId: String                          │
        ├─ paymentStatus: String                    │
        │  (pending/success/failed/refunded)        │
        ├─ serviceName: String                      │
        ├─ notes: String                            │
        ├─ createdAt: Date (auto)   ⭐ indexed      │
        └─ updatedAt: Date (auto)                   │
        └─────────────────────────────────────────────┘
```

---

## API Endpoint Flow

### 1. Payment Verification (Public)

```
POST /api/payment/verify
├─ Request Headers:
│  ├─ Content-Type: application/json
│  └─ (No auth needed)
│
├─ Request Body:
│  ├─ razorpay_payment_id: string
│  ├─ razorpay_order_id: string
│  ├─ razorpay_signature: string
│  ├─ fullName: string
│  ├─ email: string
│  ├─ mobile: string
│  ├─ websiteDomain: string
│  ├─ keywords: [string]
│  ├─ amount: number
│  └─ serviceName: string
│
├─ Processing:
│  ├─ Verify signature crypto
│  ├─ Validate all fields
│  ├─ Check duplicate paymentId
│  └─ Save to MongoDB
│
└─ Response:
   ├─ 200 OK: { status, message, data }
   ├─ 400 Bad Request: { status, message, code }
   └─ 500 Server Error: { status, message, error }
```

### 2. Get All Payments (Admin)

```
GET /api/payment/admin/payments
├─ Request Headers:
│  └─ x-admin-secret: string (required)
│
├─ Processing:
│  └─ Verify admin secret
│     └─ Fetch all payments from MongoDB
│        └─ Sort by createdAt descending
│
└─ Response:
   └─ 200 OK: {
      ├─ status: "success"
      ├─ totalPayments: number
      ├─ totalAmount: number
      └─ payments: [ {...}, {...}, ... ]
   }
```

### 3. Download Excel (Admin)

```
GET /api/payment/admin/payments/excel
├─ Request Headers:
│  └─ x-admin-secret: string (required)
│
├─ Processing:
│  ├─ Verify admin secret
│  ├─ Fetch all payments
│  ├─ Create Excel workbook
│  ├─ Format data + styles
│  └─ Stream binary response
│
└─ Response:
   └─ Binary file (application/vnd.openxmlformats...)
      └─ Auto-download as payments_YYYY-MM-DD.xlsx
```

---

## File Upload & Processing Pipeline

```
Customer Submits Payment
        ↓
Form Data Sent to Razorpay
        ↓
Razorpay Processes Payment
        ↓
Returns: payment_id, signature
        ↓
Frontend Sends to Backend
        ↓
Backend Verifies Signature
        ├─ Match payment_id with signature? ✅
        ├─ All required fields present? ✅
        └─ Payment already stored? ❌
        ↓
Save to MongoDB
        ↓
Return Success Response
        ↓
Frontend Shows Success Page
        ├─ Payment ID displayed
        ├─ Customer details shown
        ├─ Options: Home / WhatsApp Support
        └─ Admin can now view/export
```

---

## Admin Dashboard Flow

```
Admin visits /admin
        ↓
Enters Admin Secret
        ↓
Frontend calls GET /api/payment/admin/payments
        ↓
Backend verifies secret
        ↓
Returns all payments JSON
        ↓
Display in table:
├─ Total Payments: 25
├─ Total Revenue: ₹14,975
├─ Conversion Rate: 96%
└─ List:
   ├─ John Doe | john@example.com | ₹599 | success | Nov 12
   ├─ Jane Smith | jane@example.com | ₹999 | success | Nov 11
   └─ ... (more payments)
        ↓
Admin clicks "Download Excel"
        ↓
Frontend calls GET /api/payment/admin/payments/excel
        ↓
Backend generates Excel with:
├─ Formatted columns
├─ Color-coded headers
├─ All payment data
└─ Auto-download as .xlsx file
```

---

## Security Flow

```
Client (Untrusted)
        ↓
Sends payment data + Razorpay signature
        ↓
Backend Receives
        ├─ Never trust client signature ⚠️
        └─ Always re-verify ✅
        ↓
Crypto Verification (HMAC-SHA256)
        ├─ Combine: order_id|payment_id
        ├─ Hash with RAZORPAY_KEY_SECRET
        ├─ Compare with sent signature
        └─ Match? ✅ Continue
           No Match? ❌ Reject
        ↓
Validate Fields
        ├─ Email valid format?
        ├─ Mobile number valid?
        ├─ Amount > 0?
        ├─ Domain provided?
        └─ All checks pass? ✅
        ↓
Check Database
        ├─ Payment already exists?
        └─ Duplicate? ❌ Reject
        ↓
✅ SAFE TO SAVE
        └─ Insert into MongoDB
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PRODUCTION SETUP                        │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────────────┐         ┌──────────────────────┐
    │  Vercel / Netlify    │         │  Railway.app / Heroku│
    │  (Frontend Hosting)  │         │ (Backend Hosting)    │
    │                      │         │                      │
    │ • React Build        │         │ • Node.js Server     │
    │ • Optimized JS/CSS   │         │ • Express.js         │
    │ • CDN Distribution   │         │ • Mongoose           │
    └──────────────────────┘         └──────────────────────┘
            ↓                                   ↓
    https://360eagleweb.com          https://api.360eagleweb.com
            ↓                                   ↓
    ┌────────────────────────────────────────────────────────┐
    │  CORS Allowed                                          │
    │  • Frontend → Backend communication enabled            │
    │  • Razorpay signatures verified                        │
    │  • Admin routes protected                              │
    └────────────────────────────────────────────────────────┘
            ↓
    ┌────────────────────────────────────────────────────────┐
    │  MongoDB Atlas (Cloud)                                 │
    │  • Encrypted connection                                │
    │  • Automatic backups                                   │
    │  • 99.99% uptime SLA                                   │
    │  • Scalable clusters                                   │
    └────────────────────────────────────────────────────────┘
```

---

**Everything is connected and ready to go! 🚀**
