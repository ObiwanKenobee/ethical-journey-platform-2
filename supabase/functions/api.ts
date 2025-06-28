
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from './_shared/cors.ts';
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

/**
 * Main handler for the API Edge Function
 * @param req - The incoming HTTP request
 * @returns Response - The HTTP response
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Extract the path and method from the request
    const url = new URL(req.url);
    const path = url.pathname.split('/api/')[1];
    const method = req.method;
    
    // Parse query parameters
    const params = Object.fromEntries(url.searchParams);
    
    // Parse body if one exists
    let body = null;
    if (req.body) {
      const contentType = req.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        body = await req.json();
      }
    }
    
    console.log(`API Request: ${method} ${path}`);
    console.log('Params:', params);
    console.log('Body:', body);
    
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Process the request based on the path and method
    const pathParts = path.split('/');
    const resource = pathParts[0];
    const id = pathParts.length > 1 ? pathParts[1] : null;
    
    let result;
    
    switch (method) {
      case 'GET':
        if (id) {
          // Get by ID
          const { data, error } = await supabase
            .from(resource)
            .select('*')
            .eq('id', id)
            .single();
          result = { data, error };
        } else {
          // Get all with filters
          let query = supabase.from(resource).select('*');
          
          // Apply filters
          Object.entries(params).forEach(([key, value]) => {
            if (!['limit', 'offset', 'order'].includes(key)) {
              query = query.eq(key, value);
            }
          });
          
          // Apply pagination
          if (params.limit) {
            query = query.limit(parseInt(params.limit));
          }
          
          if (params.offset) {
            query = query.offset(parseInt(params.offset));
          }
          
          // Apply ordering
          if (params.order) {
            const [column, direction] = params.order.split('.');
            query = query.order(column, { ascending: direction !== 'desc' });
          }
          
          const { data, error } = await query;
          result = { data, error };
        }
        break;
        
      case 'POST':
        // Create new record
        if (!body) {
          return new Response(
            JSON.stringify({ error: 'Request body is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        const { data: createdData, error: createError } = await supabase
          .from(resource)
          .insert(body)
          .select();
        
        result = { data: createdData, error: createError };
        break;
        
      case 'PATCH':
      case 'PUT':
        // Update record
        if (!id || !body) {
          return new Response(
            JSON.stringify({ error: 'Both ID and request body are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        const { data: updatedData, error: updateError } = await supabase
          .from(resource)
          .update(body)
          .eq('id', id)
          .select();
        
        result = { data: updatedData, error: updateError };
        break;
        
      case 'DELETE':
        // Delete record
        if (!id) {
          return new Response(
            JSON.stringify({ error: 'ID is required for deletion' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        const { data: deletedData, error: deleteError } = await supabase
          .from(resource)
          .delete()
          .eq('id', id)
          .select();
        
        result = { data: deletedData, error: deleteError };
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
    
    // Handle errors
    if (result.error) {
      console.error(`API Error:`, result.error);
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: result.error.message || 'An error occurred'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: result.error.code === 'PGRST116' ? 404 : 400,
        },
      );
    }
    
    // Return successful response
    return new Response(
      JSON.stringify({
        success: true,
        data: result.data
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error(`API Error:`, error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
