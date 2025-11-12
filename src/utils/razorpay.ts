// Razorpay utility functions
export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Razorpay) {
      console.log('Razorpay SDK already loaded');
      resolve(true);
      return;
    }

    // Check if script is already in the process of loading
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      console.log('Razorpay SDK already loading');
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Razorpay SDK loaded successfully');
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

export const formatAmount = (amount: number): number => {
  if (amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }
  return Math.round(amount * 100); // Convert to paise
};

// Payment handler with environment variables
export const initializeRazorpayPayment = async (options: {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}): Promise<void> => {
  try {
    // Validate environment variable
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    
    if (!razorpayKey) {
      throw new Error('Razorpay key not found. Please check your environment variables.');
    }

    // Load Razorpay SDK
    const isLoaded = await loadRazorpay();
    
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
    }

    // Validate amount
    if (!options.amount || options.amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    const paymentOptions = {
      key: razorpayKey,
      amount: formatAmount(options.amount),
      currency: options.currency || 'INR',
      name: 'Your Company Name',
      description: 'Payment for services',
      receipt: options.receipt || `receipt_${Date.now()}`,
      prefill: options.prefill || {},
      notes: options.notes || {},
      theme: {
        color: '#2563eb'
      },
      handler: function (response: any) {
        console.log('Payment successful:', response);
        // Handle successful payment here
        // You might want to verify the payment on your backend
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal closed');
        }
      }
    };

    const razorpay = new window.Razorpay(paymentOptions);
    razorpay.open();

  } catch (error) {
    console.error('Error initializing Razorpay payment:', error);
    throw error;
  }
};

// Utility to check if Razorpay key is configured
export const isRazorpayConfigured = (): boolean => {
  return !!import.meta.env.VITE_RAZORPAY_KEY_ID;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}