import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadRazorpay, formatAmount } from '../utils/razorpay';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  buttonText?: string;
  className?: string;
  planName?: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  currency = 'INR',
  buttonText = 'Pay Now',
  className = 'bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors',
  planName = 'Service'
}) => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Razorpay load karo
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert('Payment gateway loading failed. Please refresh and try again.');
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: formatAmount(amount),
        currency: currency,
        name: 'DiziGrow',
        description: `Payment for ${planName}`,
        handler: function (response: any) {
          // Payment successful - success page redirect karo
          console.log('Payment Success:', response);
          navigate('/payment/success', { 
            state: { 
              paymentId: response.razorpay_payment_id,
              amount: amount,
              planName: planName
            }
          });
        },
        prefill: {
          name: 'Customer',
          email: 'customer@dizigrow.com',
          contact: '+919999999999'
        },
        notes: {
          plan: planName,
          company: 'DiziGrow'
        },
        theme: {
          color: '#8B5CF6'
        },
        modal: {
          ondismiss: function() {
            // User ne modal band kiya
            console.log('Payment cancelled by user');
            navigate('/payment/failed', { 
              state: { reason: 'Payment cancelled by user' }
            });
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        // Payment failed - failure page redirect karo
        console.error('Payment Failed:', response.error);
        navigate('/payment/failed', { 
          state: { 
            error: response.error,
            reason: response.error.description
          }
        });
      });

      rzp.open();
      
    } catch (error) {
      console.error('Payment Error:', error);
      navigate('/payment/failed', { 
        state: { error: 'Payment processing failed' }
      });
    }
  };

  return (
    <button
      onClick={handlePayment}
      className={className}
      type="button"
    >
      {buttonText} - ₹{amount}
    </button>
  );
};

export default PaymentButton;