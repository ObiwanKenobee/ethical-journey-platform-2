
import { supabase } from '@/integrations/supabase/client';
import { ComprehensiveCrudService } from './comprehensive-crud.service';

export interface ArchetypeInteraction {
  id: string;
  user_id: string;
  archetype_type: string;
  interaction_data: any;
  created_at: string;
  updated_at: string;
}

export interface ArchetypeSynergy {
  id: string;
  archetype_from: string;
  archetype_to: string;
  strength_score: number;
  multiplier: number;
  unlocked: boolean;
  unlock_conditions: any;
  benefits: any;
}

export interface CollaborationRequest {
  id: string;
  requester_id: string;
  target_archetype: string;
  project_id?: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

class ArchetypeInteractionsService extends ComprehensiveCrudService<ArchetypeInteraction> {
  constructor() {
    super('user_content_interactions');
  }

  // Get synergies between archetypes
  async getArchetypeSynergies(): Promise<ArchetypeSynergy[]> {
    try {
      const { data, error } = await supabase
        .from('archetype_synergies')
        .select('*')
        .order('strength_score', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching archetype synergies:', error);
      throw error;
    }
  }

  // Create collaboration request
  async createCollaborationRequest(request: Omit<CollaborationRequest, 'id' | 'created_at'>): Promise<CollaborationRequest> {
    try {
      const { data, error } = await supabase
        .from('community_collaborations')
        .insert({
          user_id: request.requester_id,
          project_name: `Collaboration Request - ${request.target_archetype}`,
          description: request.message,
          domain: request.target_archetype,
          status: 'proposed'
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as CollaborationRequest;
    } catch (error) {
      console.error('Error creating collaboration request:', error);
      throw error;
    }
  }

  // Get active collaborations
  async getActiveCollaborations(userId: string) {
    try {
      const { data, error } = await supabase
        .from('community_collaborations')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching active collaborations:', error);
      throw error;
    }
  }

  // Update archetype interaction analytics
  async updateInteractionAnalytics(userId: string, archetypeType: string, interactionType: string) {
    try {
      const { error } = await supabase
        .from('user_content_interactions')
        .insert({
          user_id: userId,
          content_id: crypto.randomUUID(),
          interaction_type: `${archetypeType}_${interactionType}`
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating interaction analytics:', error);
    }
  }

  // Get archetype interaction insights
  async getInteractionInsights(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_content_interactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Process data to create insights
      const interactions = data || [];
      const archetypeStats = interactions.reduce((acc: any, interaction) => {
        const type = interaction.interaction_type.split('_')[0];
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      return {
        totalInteractions: interactions.length,
        archetypeBreakdown: archetypeStats,
        recentActivity: interactions.slice(0, 10)
      };
    } catch (error) {
      console.error('Error fetching interaction insights:', error);
      throw error;
    }
  }
}

export const archetypeInteractionsService = new ArchetypeInteractionsService();
