# 🎯 Quick Reference Card

## Start Everything in 30 Seconds

### Terminal 1 (Backend)
```bash
cd backend
taskkill /F /IM node.exe
npm run dev
```

### Terminal 2 (Frontend)
```bash
npm run dev
```

### Visit
```
http://localhost:5173
```

---

## API Endpoints

### Payment Verification (Frontend calls this after Razorpay success)
```
POST /api/payment/verify
Body: {
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "websiteDomain": "example.com",
  "keywords": ["seo", "backlinks"],
  "amount": 599,
  "paymentId": "pay_test_123",
  "razorpay_signature": "signature_hash"
}
```

### Get All Payments (Admin)
```
GET /api/payment/admin/payments?adminSecret=your_super_secret_admin_password_here
```

### Download Excel (Admin)
```
GET /api/payment/admin/payments/excel?adminSecret=your_super_secret_admin_password_here
```

---

## Environment Variables

| Variable | Value | Source |
|----------|-------|--------|
| MONGO_URI | `mongodb+srv://...` | MongoDB Atlas |
| RAZORPAY_KEY_ID | `rzp_test_...` | Razorpay Dashboard |
| RAZORPAY_KEY_SECRET | Secret key | Razorpay Dashboard |
| ADMIN_SECRET | `your_super_secret_admin_password_here` | Custom |
| PORT | 5000 | Default |
| FRONTEND_URL | `http://localhost:5173` | Development |

---

## Test Payment Card

| Field | Value |
|-------|-------|
| Card | 4111 1111 1111 1111 |
| Expiry | Any future date (e.g., 12/25) |
| CVV | Any 3 digits (e.g., 123) |
| OTP | 123456 |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 in use | `taskkill /F /IM node.exe` |
| Module not found | `npm install` in backend |
| MongoDB error | Check MONGO_URI in `.env` |
| Razorpay error | Check keys in `.env` |
| CORS error | Check FRONTEND_URL in `.env` |

---

## Key Files

- **Backend Server:** `backend/server.js`
- **Payment Controller:** `backend/controllers/paymentController.js`
- **Database Model:** `backend/models/paymentModel.js`
- **Routes:** `backend/routes/paymentRoutes.js`
- **Config:** `backend/.env`

---

## Admin Credentials

- **Secret:** `your_super_secret_admin_password_here`
- **Usage:** Pass as `?adminSecret=...` query parameter

---

## MongoDB Collections

**Collection Name:** `payments`

**Fields:**
- fullName
- email
- mobile
- websiteDomain
- keywords (array)
- amount
- paymentId
- paymentStatus
- date (auto)

---

## Status Check

### Backend Healthy?
```bash
curl http://localhost:5000
# Should return JSON with endpoints
```

### MongoDB Connected?
```bash
curl http://localhost:5000/api/payment/health
```

### Admin Working?
```bash
curl "http://localhost:5000/api/payment/admin/payments?adminSecret=your_super_secret_admin_password_here"
```

---

## Production Checklist

- [ ] Change ADMIN_SECRET to strong password
- [ ] Update RAZORPAY_KEY_ID to production key
- [ ] Update RAZORPAY_KEY_SECRET to production secret
- [ ] Change NODE_ENV to `production`
- [ ] Update FRONTEND_URL to production domain
- [ ] Deploy backend to server (AWS, Heroku, etc.)
- [ ] Update frontend API calls to production domain
- [ ] Enable HTTPS
- [ ] Set up database backups

---

## Resources

- Razorpay Dashboard: https://dashboard.razorpay.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Backend Docs: `backend/README.md`
- Troubleshooting: `backend/TROUBLESHOOTING.md`
- Full Guide: `COMPLETE_SETUP_SUMMARY.md`

---

## Quick Commands

```bash
# Start backend
cd backend && npm run dev

# Start frontend
npm run dev

# Kill port 5000
taskkill /F /IM node.exe

# Install dependencies
npm install

# Test API
curl http://localhost:5000

# Download payments as Excel
curl "http://localhost:5000/api/payment/admin/payments/excel?adminSecret=your_super_secret_admin_password_here" -o payments.xlsx
```

---

**Everything is ready! Start the servers and test! 🚀**
