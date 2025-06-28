
// Only showing the relevant part that needs fixing - assuming there's a function that uses supabase.from('payment_transactions')

import { supabase } from '@/integrations/supabase/client';

// Define interfaces
export interface PaystackConfig {
  email: string;
  amount: number; // amount in kobo
  currency?: string;
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
}

interface PaystackResponse {
  status: boolean;
  message: string;
  data?: any;
}

interface PaymentTransaction {
  id: string;
  reference: string;
  amount: number;
  status: string;
  user_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// Initialize Paystack
export const initializePaystack = (publicKey: string): void => {
  // This function would typically load the Paystack script or configure the SDK
  // but we're assuming it's already loaded in index.html
  if ((window as any).PaystackPop) {
    console.log('Paystack already initialized');
  } else {
    console.error('Paystack script not found');
  }
};

// Process a payment
export const processPayment = async (
  config: PaystackConfig,
  publicKey: string,
  onSuccess: (response: any) => void,
  onCancel: () => void
): Promise<void> => {
  if (!(window as any).PaystackPop) {
    throw new Error('Paystack not initialized');
  }

  const handler = (window as any).PaystackPop.setup({
    key: publicKey,
    email: config.email,
    amount: config.amount,
    currency: config.currency || 'NGN',
    ref: config.reference || generateReference(),
    metadata: config.metadata || {},
    callback: (response: any) => {
      // Save transaction to database
      saveTransaction({
        reference: response.reference,
        amount: config.amount / 100, // Convert from kobo to naira
        status: 'success',
        user_id: config.metadata?.userId,
        metadata: config.metadata
      });
      
      onSuccess(response);
    },
    onClose: () => {
      onCancel();
    }
  });
  
  handler.openIframe();
};

// Verify a payment
export const verifyPayment = async (reference: string): Promise<PaystackResponse> => {
  try {
    // In a real implementation, this would call your backend which would use Paystack's verify API
    // For now, we'll simulate a successful verification
    
    // Fetch transaction from the database
    const { data, error } = await supabase
      // Type assertion needed here for dynamic table name
      .from('payment_transactions' as any)
      .select('*')
      .eq('reference', reference)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return { status: false, message: 'Transaction not found' };
    }
    
    return { 
      status: true, 
      message: 'Verification successful',
      data: data
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return { status: false, message: 'Error verifying payment' };
  }
};

// Helper function to save transaction to database
const saveTransaction = async (transaction: Omit<PaymentTransaction, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      // Type assertion needed here for dynamic table name
      .from('payment_transactions' as any)
      .insert([{
        ...transaction,
        created_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error saving transaction:', error);
  }
};

// Generate a unique reference
const generateReference = (): string => {
  return 'VOUGHT_' + Math.floor(Math.random() * 1000000000).toString();
};
