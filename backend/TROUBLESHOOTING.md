# Backend Troubleshooting Guide 🔧

## Error: Port 5000 Already in Use

### Quick Fix (Windows PowerShell - Run as Admin)
```powershell
# Kill process on port 5000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force
```

### Alternative - Use restart.bat
```bash
cd backend
restart.bat
```

### Or manually kill all Node processes
```bash
taskkill /F /IM node.exe
```

Then restart:
```bash
npm run dev
```

---

## Error: Cannot find package 'exceljs'

### Solution
The backend uses `xlsx` (already installed). Make sure all dependencies are installed:
```bash
cd backend
npm install
npm run dev
```

---

## Error: Razorpay key_id is mandatory

### Solution
Ensure `.env` file exists in the `backend/` folder with:
```env
MONGO_URI=your_mongodb_uri
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
ADMIN_SECRET=your_admin_secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Get your Razorpay Keys
1. Go to https://dashboard.razorpay.com/app/keys
2. Copy `Key ID` and `Key Secret`
3. Add to `.env` file

---

## Error: MongoDB Connection Failed

### Solution
1. Check MONGO_URI in `.env`
2. Ensure MongoDB cluster allows your IP (whitelist 0.0.0.0 for local testing)
3. Test connection:
```bash
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected!')).catch(e => console.log(e))"
```

---

## Verify Backend is Running

Once started, you should see:
```
[nodemon] starting `node server.js`
✅ MongoDB Connected!
🚀 Server running on http://localhost:5000
```

---

## Test APIs Using Postman or cURL

### 1. Verify Payment (POST)
```bash
curl -X POST http://localhost:5000/api/payment/verify \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "websiteDomain": "example.com",
    "keywords": ["seo", "backlinks"],
    "amount": 599,
    "paymentId": "pay_test_123",
    "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
  }'
```

### 2. Get All Payments (GET - Admin)
```bash
curl -X GET "http://localhost:5000/api/admin/payments?adminSecret=your_super_secret_admin_password_here"
```

### 3. Download Excel (GET - Admin)
```bash
curl -X GET "http://localhost:5000/api/admin/payments/excel?adminSecret=your_super_secret_admin_password_here" \
  -o payments.xlsx
```

---

## Frontend Integration Issues

### CORS Error?
Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL:
```env
FRONTEND_URL=http://localhost:5173
```

### API Not Responding?
1. Check backend is running: `http://localhost:5000`
2. Check frontend is calling correct URL
3. Look at browser console for errors
4. Check backend terminal for logs

---

## Check Logs in Real-time

The backend uses `nodemon` for auto-restart. Watch the terminal for:
- ✅ `MongoDB Connected!`
- 🚀 `Server running on port 5000`
- Errors with red text (fix and restart)

---

## Reset Everything Fresh

```bash
# Stop backend (Ctrl+C)
# Delete node_modules
rm -r node_modules

# Reinstall
npm install

# Start fresh
npm run dev
```

---

## Still Having Issues?

1. **Check all files exist:**
   ```
   backend/
   ├── server.js
   ├── .env
   ├── package.json
   ├── controllers/paymentController.js
   ├── models/paymentModel.js
   ├── routes/paymentRoutes.js
   └── config/db.js
   ```

2. **Verify package.json has all dependencies:**
   ```json
   {
     "dependencies": {
       "express": "^4.18.2",
       "mongoose": "^7.0.3",
       "dotenv": "^16.0.3",
       "cors": "^2.8.5",
       "razorpay": "^2.8.4",
       "xlsx": "^0.18.5"
     }
   }
   ```

3. **Check Node version (should be v14+):**
   ```bash
   node --version
   ```

4. **Check npm version:**
   ```bash
   npm --version
   ```

---

## Success Indicators

When everything works:
```
[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
✅ MongoDB Connected!
🚀 Server running on http://localhost:5000
```

API endpoints ready:
- ✅ `POST /api/payment/verify`
- ✅ `GET /api/admin/payments`
- ✅ `GET /api/admin/payments/excel`

---

**Still stuck?** Check the browser DevTools Console + Backend Terminal simultaneously!
