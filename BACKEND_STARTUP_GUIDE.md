# 🚀 Backend Startup Guide

## Quick Start - 3 Steps

### Step 1: Kill Existing Process
Open **Command Prompt** (Windows) and run:
```bash
taskkill /F /IM node.exe
```

### Step 2: Navigate to Backend
```bash
cd backend
```

### Step 3: Start Server
```bash
npm run dev
```

---

## Expected Output
When successful, you should see:
```
[nodemon] 3.1.11
[nodemon] watching path(s): *.*
[nodemon] starting `node server.js`
✅ MongoDB Connected!

🚀 Server running on http://localhost:5000
📡 Frontend connected from: http://localhost:5173
🔐 Admin Secret Required for admin endpoints
```

---

## Verify Backend is Working

### Option 1: Browser
Open: `http://localhost:5000`

You should see JSON response:
```json
{
  "status": "success",
  "message": "🦅 360EagleWeb Backend API is running",
  "version": "1.0.0",
  "endpoints": {...}
}
```

### Option 2: PowerShell/Terminal
```bash
curl http://localhost:5000
```

---

## Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| **Port 5000 already in use** | Run: `taskkill /F /IM node.exe` |
| **Cannot find module** | Run: `npm install` in backend folder |
| **MongoDB connection failed** | Check `.env` MONGO_URI is correct |
| **Razorpay key error** | Verify `.env` has RAZORPAY_KEY_ID set |

---

## Next Steps

Once backend is running ✅:

1. **Test Payment API:**
   ```bash
   POST http://localhost:5000/api/payment/verify
   ```
   (Details in API_TESTING.md)

2. **Update Frontend:**
   - The frontend should now call: `http://localhost:5000/api/payment/verify`
   - After successful payment, it will store data in MongoDB

3. **View Admin Dashboard:**
   - `GET http://localhost:5000/api/payment/admin/payments?adminSecret=your_super_secret_admin_password_here`

---

## 24/7 Running (Optional)

To keep backend running in background even after closing terminal:

### Using PM2 (Recommended)
```bash
npm install -g pm2
pm2 start server.js --name "360eagle-backend"
pm2 save
pm2 startup
```

### Using Screen (Linux/Mac)
```bash
screen -S backend
npm run dev
# Press Ctrl+A then D to detach
# Later: screen -r backend to reattach
```

---

## Check All Services

```bash
# Check if MongoDB is connected
curl http://localhost:5000/api/payment/health

# List all payments (requires admin secret)
curl "http://localhost:5000/api/payment/admin/payments?adminSecret=your_super_secret_admin_password_here"
```

---

## Need to Restart?

Simply run in the terminal:
```bash
rs
```

NodeMon will automatically restart the server!

---

Good luck! 🎉 Your backend is now ready!
