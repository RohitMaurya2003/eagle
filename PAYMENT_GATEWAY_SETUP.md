# Payment Gateway Quick Setup Guide 💳

## What Changed
When a user clicks **"Order Now"**, they're now **immediately redirected to Razorpay payment gateway** instead of seeing a form first.

---

## How It Works

### 1. **Direct Payment Flow (Services.tsx - Currently Applied)**
```
User clicks "Order Now" 
    ↓
payDirect(serviceName, price) loads Razorpay SDK
    ↓
Razorpay modal opens → user enters payment details
    ↓
Payment Success → Redirect to /payment/success ✅
Payment Failed → Redirect to /payment/failed ❌
```

### 2. **Environment Setup Required**
Create or update `.env.local` in your project root:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_public_key_here
```

**Get your key from:** https://dashboard.razorpay.com/app/keys

### 3. **Code You Just Added to Services.tsx**

```tsx
// Imports
import { useNavigate } from 'react-router-dom';

// Inside component
const navigate = useNavigate();
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

// Helper to load Razorpay SDK
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

// Convert amount to paise (Razorpay requirement)
const formatAmount = (amount: number): number => Math.round(amount * 100);

// Main payment trigger
const payDirect = async (serviceName: string, price: number, description?: string) => {
  try {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert('Payment gateway failed to load.');
      return;
    }
    if (!RAZORPAY_KEY_ID) {
      alert('Payment not configured.');
      return;
    }

    const options: any = {
      key: RAZORPAY_KEY_ID,
      amount: formatAmount(price),
      currency: 'INR',
      name: '360EagleWeb',
      description: description || serviceName,
      handler: (response: any) => {
        navigate('/payment/success', {
          state: {
            paymentId: response?.razorpay_payment_id,
            service: serviceName,
            amount: price
          }
        });
      },
      modal: {
        ondismiss: () => {
          navigate('/payment/failed', { state: { reason: 'Dismissed' } });
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (resp: any) => {
      navigate('/payment/failed', { state: { reason: resp?.error?.description } });
    });
    rzp.open(); // Open payment modal
  } catch (err) {
    navigate('/payment/failed', { state: { reason: 'Error starting payment' } });
  }
};

// In your button
<button onClick={() => payDirect('Package Name', 599)}>
  Order Now
</button>
```

---

## Apply This to Other Pages

### For **Pricing.tsx**:
1. Add the same imports + `payDirect` function above
2. Replace modal triggers with direct `payDirect(packageName, price)` calls
3. Remove the "Order Form" modals entirely

### For **Home.tsx**:
1. Same approach—wire Order Now buttons directly to `payDirect`
2. Skip the form modal, go straight to payment

### For **PaymentButton.tsx Component** (Reusable):
```tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentButtonProps {
  amount: number;
  serviceName: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  serviceName,
  description,
  buttonText = 'Order Now',
  className = 'bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold'
}) => {
  const navigate = useNavigate();
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const payDirect = async () => {
    const isLoaded = await loadRazorpaySDK();
    if (!isLoaded || !RAZORPAY_KEY_ID) {
      alert('Payment setup failed. Try again.');
      return;
    }
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: '360EagleWeb',
      description: description || serviceName,
      handler: (resp: any) => {
        navigate('/payment/success', { state: { 
          paymentId: resp.razorpay_payment_id,
          service: serviceName 
        }});
      }
    };
    new window.Razorpay(options).open();
  };

  return (
    <button onClick={payDirect} className={className}>
      {buttonText} - ₹{amount}
    </button>
  );
};

export default PaymentButton;
```

---

## Success/Failure Pages (Already in App.tsx)

Your app already has these routes defined:

```
✅ /payment/success → Shows success message + WhatsApp/home links
❌ /payment/failed   → Shows error message + retry options
```

The `state` passed from `navigate()` contains payment details for display.

---

## Testing Locally

1. **Set env variable** in `.env.local`:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_test_your_test_key
   ```

2. **Use Razorpay test cards**:
   - Card: `4111 1111 1111 1111`
   - Expiry: Any future date
   - CVV: Any 3 digits
   - OTP: `123456`

3. **Run dev server**:
   ```bash
   npm run dev
   ```

4. **Click Order Now** → Razorpay modal opens → Use test card → Redirects to success page

---

## Summary of Changes

| File | What Changed |
|------|-------------|
| `Services.tsx` | ✅ Added `payDirect()` + wired Order Now buttons to it |
| `Pricing.tsx` | ❌ Still uses old form modal—apply same pattern |
| `Home.tsx` | ❌ Still uses old form modal—apply same pattern |
| `.env.local` | ⚠️ Need to create + add VITE_RAZORPAY_KEY_ID |

---

## Next Steps
1. ✅ **Services.tsx** is done
2. 📝 Update **Pricing.tsx** same way
3. 📝 Update **Home.tsx** same way
4. 🔐 Set **VITE_RAZORPAY_KEY_ID** env variable
5. 🧪 Test on dev server

---

**Questions?** All payment logic is in `payDirect()` function. Just copy-paste + adjust service names/amounts!
