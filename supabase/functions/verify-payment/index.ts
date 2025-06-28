
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

interface RequestBody {
  reference: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the request body
    const body: RequestBody = await req.json();
    const { reference } = body;

    if (!reference) {
      return new Response(
        JSON.stringify({ error: 'Reference is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get environment variables
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY') || '';

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Verify payment with Paystack
    const verificationResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Get verification result
    const verificationResult = await verificationResponse.json();

    // Update transaction record in database
    if (verificationResult.status && verificationResult.data) {
      const { error } = await supabase
        .from('payment_transactions')
        .update({
          status: verificationResult.data.status === 'success' ? 'success' : 'failed',
          verified_at: new Date().toISOString(),
          response_data: verificationResult.data,
        })
        .eq('reference', reference);

      if (error) throw error;

      // If payment was successful, update user subscription
      if (verificationResult.data.status === 'success') {
        const paymentData = verificationResult.data;
        const metadata = paymentData.metadata?.custom_fields?.[0] || {};
        const userId = metadata.user_id;
        const planName = metadata.plan_name;

        if (userId && userId !== 'Guest' && planName) {
          const { error: subscriptionError } = await supabase
            .from('user_subscriptions')
            .upsert({
              user_id: userId,
              plan_name: planName,
              status: 'active',
              start_date: new Date().toISOString(),
              end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 days
              payment_reference: reference,
              amount: paymentData.amount / 100, // Convert from kobo back to naira
              currency: paymentData.currency || 'NGN',
            });

          if (subscriptionError) throw subscriptionError;
        }
      }
    }

    return new Response(
      JSON.stringify(verificationResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
