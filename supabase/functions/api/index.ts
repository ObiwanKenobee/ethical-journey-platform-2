
// Follow this setup guide to integrate the Deno SDK: https://deno.land/manual/examples/supabase
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const url = new URL(req.url);
    const paths = url.pathname.split('/').filter(Boolean);
    const resource = paths[paths.length - 1]; // Get the last part of the path as the resource
    
    // Extract query parameters
    const queryParams = Object.fromEntries(url.searchParams.entries());
    
    // Basic body parsing
    let body = null;
    if (req.method !== 'GET' && req.method !== 'DELETE') {
      const contentType = req.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        body = await req.json();
      } else {
        body = await req.text();
      }
    }

    // Log request details for debugging
    console.log(`Request: ${req.method} ${url.pathname}`);
    console.log('Query parameters:', queryParams);
    
    // CRUD Operations based on method and resource
    let result;

    switch (req.method) {
      case 'GET':
        // READ operation
        console.log(`Fetching ${resource}`);
        
        if (queryParams.id) {
          // Get single item by ID
          const { data, error } = await supabase
            .from(resource)
            .select('*')
            .eq('id', queryParams.id)
            .single();
            
          result = { data, error };
        } else {
          // Get multiple items with optional filters
          let query = supabase.from(resource).select('*');
          
          // Apply filters from query parameters (except special parameters)
          Object.entries(queryParams).forEach(([key, value]) => {
            if (!['limit', 'offset', 'order'].includes(key)) {
              query = query.eq(key, value);
            }
          });
          
          // Apply pagination
          if (queryParams.limit) {
            query = query.limit(parseInt(queryParams.limit));
          }
          
          if (queryParams.offset) {
            query = query.offset(parseInt(queryParams.offset));
          }
          
          // Apply ordering
          if (queryParams.order) {
            const [column, direction] = queryParams.order.split('.');
            query = query.order(column, { ascending: direction !== 'desc' });
          }
          
          const { data, error } = await query;
          result = { data, error };
        }
        break;
        
      case 'POST':
        // CREATE operation
        console.log(`Creating new ${resource}`, body);
        
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
        
      case 'PUT':
      case 'PATCH':
        // UPDATE operation
        console.log(`Updating ${resource}`, body);
        
        if (!body || !queryParams.id) {
          return new Response(
            JSON.stringify({ error: 'Both ID and request body are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        const { data: updatedData, error: updateError } = await supabase
          .from(resource)
          .update(body)
          .eq('id', queryParams.id)
          .select();
          
        result = { data: updatedData, error: updateError };
        break;
        
      case 'DELETE':
        // DELETE operation
        console.log(`Deleting ${resource} with ID: ${queryParams.id}`);
        
        if (!queryParams.id) {
          return new Response(
            JSON.stringify({ error: 'ID is required for deletion' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        const { data: deletedData, error: deleteError } = await supabase
          .from(resource)
          .delete()
          .eq('id', queryParams.id)
          .select();
          
        result = { data: deletedData, error: deleteError };
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    // Handle errors from Supabase
    if (result.error) {
      console.error(`Error in ${req.method} operation:`, result.error);
      
      return new Response(
        JSON.stringify({ error: result.error.message }),
        { 
          status: result.error.code === 'PGRST116' ? 404 : 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Return successful response
    return new Response(
      JSON.stringify(result.data),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Unhandled error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
