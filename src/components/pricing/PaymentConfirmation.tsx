
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verifyPayment } from '@/services/payment/paystack.service';
import { useAuth } from '@/context/AuthContext';

const PaymentConfirmation = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref');
  const status = searchParams.get('status');
  
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const verifyTransaction = async () => {
      if (reference && status === 'success') {
        setVerifying(true);
        
        try {
          // Verify on server side
          const result = await verifyPayment(reference);
          
          if (result && result.status) {
            setVerified(true);
            
            // If the user is logged in, redirect to dashboard after a short delay
            if (isAuthenticated) {
              setTimeout(() => {
                navigate('/dashboard');
              }, 3000);
            }
          } else {
            setError('Payment could not be verified. Please contact support.');
          }
        } catch (err) {
          setError('An error occurred while verifying your payment.');
          console.error(err);
        } finally {
          setVerifying(false);
        }
      } else if (status === 'cancelled') {
        setError('Payment was cancelled.');
      } else if (!reference) {
        setError('Missing payment reference.');
      }
    };

    verifyTransaction();
  }, [reference, status, navigate, isAuthenticated]);

  return (
    <div className="container-tight py-12">
      <div className="neo-card max-w-lg mx-auto text-center p-8">
        {verifying ? (
          <div className="space-y-4">
            <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
            <h2 className="text-2xl font-bold">Verifying Your Payment</h2>
            <p className="text-muted-foreground">Please wait while we verify your payment...</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <XCircle className="h-16 w-16 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold text-destructive">Payment Issue</h2>
            <p className="text-muted-foreground">{error}</p>
            <div className="pt-4">
              <Button onClick={() => navigate('/pricing')}>Return to Pricing</Button>
            </div>
          </div>
        ) : verified ? (
          <div className="space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
            <p className="text-muted-foreground">
              Thank you for your payment. Your subscription has been activated.
            </p>
            {isAuthenticated ? (
              <p className="text-sm">Redirecting you to your dashboard...</p>
            ) : (
              <div className="pt-4 space-y-4">
                <p className="text-sm">Create an account or log in to access your subscription.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/register?returnUrl=/dashboard')}>Create Account</Button>
                  <Button variant="outline" onClick={() => navigate('/login?returnUrl=/dashboard')}>Login</Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
            <h2 className="text-2xl font-bold">Processing</h2>
            <p className="text-muted-foreground">Processing your payment information...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
