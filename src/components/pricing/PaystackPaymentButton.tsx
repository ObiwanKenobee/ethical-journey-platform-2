
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { initializePaystack, processPayment, PaystackConfig } from '@/services/payment/paystack.service';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Paystack public key - this is safe to expose in frontend code
const PAYSTACK_PUBLIC_KEY = 'rpk_live_6dcd0c152d43e1f2c0d004d6fdbe3e9fa1e67812';

interface PaystackButtonProps {
  planName: string;
  amount: number; // Amount in NGN
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  buttonText?: string;
  redirectToAuth?: boolean;
  className?: string;
}

const PaystackPaymentButton = ({ 
  planName, 
  amount, 
  variant = 'default',
  size = 'default',
  buttonText = 'Subscribe',
  redirectToAuth = true,
  className 
}: PaystackButtonProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  
  // Initialize Paystack
  useEffect(() => {
    initializePaystack(PAYSTACK_PUBLIC_KEY);
    
    // If user is authenticated, get their email
    if (isAuthenticated && user?.email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user]);

  const handlePayment = async () => {
    setLoading(true);
    
    // If not authenticated, store plan details and redirect to login/register
    if (!isAuthenticated && redirectToAuth) {
      // Store payment info in session storage
      sessionStorage.setItem('pendingPayment', JSON.stringify({
        planName,
        amount,
      }));
      
      navigate('/register?returnUrl=/pricing&payment=pending');
      return;
    }
    
    // If authenticated or we don't need to redirect first
    const paymentConfig: PaystackConfig = {
      email: email || 'guest@example.com', // Use actual email if available
      amount: amount * 100, // Convert to kobo
      currency: 'NGN',
      metadata: {
        planName,
        userId: user?.id || 'guest',
      }
    };
    
    try {
      await processPayment(
        paymentConfig,
        PAYSTACK_PUBLIC_KEY,
        (response) => {
          // Handle successful payment
          toast({
            title: "Payment Successful",
            description: `Your subscription to ${planName} plan has been processed successfully.`,
          });
          
          // Redirect to onboarding or dashboard
          if (isAuthenticated) {
            navigate('/dashboard');
          } else {
            navigate('/register?returnUrl=/dashboard&payment=success');
          }
        },
        () => {
          // Handle payment cancellation
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment process.",
            variant: "destructive",
          });
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {buttonText}
    </Button>
  );
};

export default PaystackPaymentButton;
