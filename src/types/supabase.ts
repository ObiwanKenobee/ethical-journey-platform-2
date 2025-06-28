
export interface Database {
  public: {
    Tables: {
      analytics_metrics: {
        Row: {
          id: string;
          user_id: string;
          metric_value: number;
          timestamp: string;
          metric_name: string;
          metric_type: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          metric_value: number;
          timestamp?: string;
          metric_name: string;
          metric_type: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          metric_value?: number;
          timestamp?: string;
          metric_name?: string;
          metric_type?: string;
        };
      };
      ethical_sourcing_initiatives: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          status: string;
          impact_level: string;
          start_date: string | null;
          end_date: string | null;
          target_metrics: any | null;
          current_metrics: any | null;
          budget: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string;
          category: string;
          status?: string;
          impact_level?: string;
          start_date?: string | null;
          end_date?: string | null;
          target_metrics?: any | null;
          current_metrics?: any | null;
          budget?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<{
          id: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          status: string;
          impact_level: string;
          start_date: string | null;
          end_date: string | null;
          target_metrics: any | null;
          current_metrics: any | null;
          budget: number | null;
          created_at: string | null;
          updated_at: string | null;
        }>;
      };
      // Add other tables as needed for your application
    };
    Views: {
      // Define your views here
    };
    Functions: {
      // Define your functions here
    };
    Enums: {
      // Define your enums here
    };
  };
}
