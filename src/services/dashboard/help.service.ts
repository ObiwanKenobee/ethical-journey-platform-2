
import { CrudService } from '../api.crud.service';
import { supabase } from '@/integrations/supabase/client';

// Types
export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  category: string;
  assignee_id?: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful_votes: number;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  content: string;
  type: 'bug' | 'feature' | 'general';
  created_at: string;
}

// Services
export const supportTicketService = new CrudService<SupportTicket>('support_tickets');
export const knowledgeArticleService = new CrudService<KnowledgeArticle>('knowledge_articles');
export const feedbackService = new CrudService<Feedback>('feedback');

// Additional methods
export const helpService = {
  /**
   * Create support ticket
   */
  async createTicket(subject: string, description: string, priority: SupportTicket['priority'], category: string): Promise<SupportTicket> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    return supportTicketService.create({
      user_id: user.id,
      subject,
      description,
      priority,
      category,
      status: 'open'
    } as Partial<SupportTicket>);
  },

  /**
   * Get user tickets
   */
  async getUserTickets(): Promise<SupportTicket[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    const response = await supportTicketService.getAll({ user_id: user.id });
    return response.data || [];
  },

  /**
   * Record article view
   */
  async recordArticleView(articleId: string): Promise<void> {
    const article = await knowledgeArticleService.getById(articleId);
    await knowledgeArticleService.update(articleId, { views: (article.views || 0) + 1 });
  },

  /**
   * Vote article as helpful
   */
  async voteArticleHelpful(articleId: string): Promise<void> {
    const article = await knowledgeArticleService.getById(articleId);
    await knowledgeArticleService.update(articleId, { helpful_votes: (article.helpful_votes || 0) + 1 });
  },

  /**
   * Submit feedback
   */
  async submitFeedback(content: string, type: Feedback['type']): Promise<Feedback> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    return feedbackService.create({
      user_id: user.id,
      content,
      type
    } as Partial<Feedback>);
  }
};
