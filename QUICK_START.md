# 🚀 Quick Setup Guide

## Backend Setup (5 minutes)

### 1. Copy environment template
```bash
cd backend
cp .env.example .env
```

### 2. Edit `.env` with your credentials
```bash
# MongoDB (https://www.mongodb.com/cloud/atlas)
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/360eagle?retryWrites=true&w=majority

# Razorpay (https://dashboard.razorpay.com/app/keys)
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx

# Your secret admin password
ADMIN_SECRET=your_strong_password_here_12345

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Install and run
```bash
npm install
npm run dev
```

Expected:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server running on http://localhost:5000
```

---

## Frontend Setup (2 minutes)

### 1. Add to `.env.local`
```env
VITE_RAZORPAY_KEY_ID=your_live_key
VITE_BACKEND_URL=http://localhost:5000
```

### 2. No code changes needed! (Already wired in Services.tsx)

### 3. Run frontend
```bash
npm run dev
```

---

## Test the Flow

1. **Backend running:** http://localhost:5000
2. **Frontend running:** http://localhost:5173
3. Click "Order Now"
4. Enter test details
5. Use card: `4111 1111 1111 1111` | Expiry: any future date | CVV: any 3 digits | OTP: `123456`
6. ✅ See success page with payment details
7. Check MongoDB to confirm data saved

---

## Verify Payment in Backend

```bash
# Terminal 1: Backend running (npm run dev)

# Terminal 2: Test API
curl http://localhost:5000/api/payment/health
```

Should return:
```json
{
  "status": "success",
  "message": "Backend is running",
  "code": "HEALTH_OK"
}
```

---

## Download Admin Excel Report

```bash
# From Terminal or Postman
curl "http://localhost:5000/api/payment/admin/payments/excel" \
  -H "x-admin-secret: your_strong_password_here_12345" \
  -o payments.xlsx
```

File will be saved as `payments.xlsx` with all payment records!

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check `MONGO_URI` in `.env` |
| Razorpay signature error | Verify `RAZORPAY_KEY_SECRET` is correct |
| CORS error | Check `FRONTEND_URL` in backend `.env` |
| Admin secret not working | Ensure exact match (case-sensitive) |
| Backend not responding | Confirm PORT 5000 is not blocked |

---

## Next Steps

- ✅ Backend running locally
- ✅ Frontend integrated
- ✅ Test payment flow
- 📋 Monitor payments in MongoDB
- 📊 Download Excel reports
- 🚀 Deploy to production (Railway/Heroku)

**Questions?** Check `backend/README.md` for detailed docs!
