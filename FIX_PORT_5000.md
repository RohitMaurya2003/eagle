# 🔄 Restart Backend (Fix Port 5000 Issue)

## Simple Steps

### Step 1: Kill the Process Using Port 5000
Open **PowerShell as Administrator** and run:

```powershell
# Windows PowerShell (Run as Admin)
Get-Process node | Stop-Process -Force
```

Or use Command Prompt:
```cmd
taskkill /F /IM node.exe
```

Wait 2 seconds for the port to fully release.

---

### Step 2: Navigate to Backend Folder
```bash
cd backend
```

---

### Step 3: Verify Dependencies are Installed
```bash
npm install
```

(If all dependencies are already installed, this just takes a few seconds)

---

### Step 4: Start the Backend
```bash
npm run dev
```

---

## Expected Success Output

You should see this in your terminal:

```
[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
✅ MongoDB Connected!

🚀 Server running on http://localhost:5000
📡 Frontend connected from: http://localhost:5173
🔐 Admin Secret Required for admin endpoints
```

**If you see this ✅ - Backend is running successfully!**

---

## Verify It's Working

### Option 1: Open in Browser
Go to: `http://localhost:5000`

You should see JSON:
```json
{
  "status": "success",
  "message": "🦅 360EagleWeb Backend API is running",
  "version": "1.0.0",
  "endpoints": {...}
}
```

### Option 2: Use cURL in Another Terminal
```bash
curl http://localhost:5000
```

---

## If It Still Doesn't Work

### Check if Something Else is Using Port 5000
```powershell
# Windows PowerShell
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
```

If it shows something, kill it:
```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force
```

---

### Change Port (Alternative)
Edit `backend/.env`:
```env
PORT=5001  # Change from 5000 to 5001
```

Then restart: `npm run dev`

---

### Reinstall Everything Fresh
```bash
# Remove node_modules
rm -r node_modules

# Reinstall
npm install

# Start
npm run dev
```

---

## Next: Start Frontend

In a **new terminal** window:
```bash
npm run dev
```

Then open: `http://localhost:5173`

---

## Test Payment Flow

1. Go to `http://localhost:5173`
2. Click any "Order Now" button
3. Razorpay modal appears
4. Use test card: `4111 1111 1111 1111`
5. Complete payment
6. ✅ Redirects to success page
7. ✅ Data stored in MongoDB

---

## Common Port Errors

| Error | Solution |
|-------|----------|
| `EADDRINUSE` | Kill process: `taskkill /F /IM node.exe` |
| `Address already in use` | Change PORT in `.env` to 5001 |
| `Cannot find module` | Run: `npm install` |

---

**Everything should be working now! 🎉**
