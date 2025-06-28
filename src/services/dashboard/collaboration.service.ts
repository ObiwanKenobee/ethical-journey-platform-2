
import { CrudService } from '../api.crud.service';

// Types
export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  timestamp: string;
  channel_id: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: 'team' | 'direct' | 'public';
  members: string[];
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  participants: string[];
  location?: string;
}

export interface Document {
  id: string;
  title: string;
  file_type: string;
  url: string;
  owner_id: string;
  owner_name: string;
  updated_at: string;
  size?: number;
  tags?: string[];
}

// Services
export const messageService = new CrudService<Message>('messages');
export const channelService = new CrudService<Channel>('channels');
export const eventService = new CrudService<EventItem>('events');
export const documentService = new CrudService<Document>('documents');

// Additional methods specific to collaboration
export const collaborationService = {
  /**
   * Send a message to a channel
   */
  async sendMessage(channelId: string, content: string, senderId: string): Promise<Message> {
    return messageService.create({
      content,
      channel_id: channelId,
      sender_id: senderId,
      timestamp: new Date().toISOString()
    } as Partial<Message>);
  },

  /**
   * Get messages for a channel
   */
  async getChannelMessages(channelId: string, limit = 50): Promise<Message[]> {
    const response = await messageService.getAll({ 
      channel_id: channelId 
    }, { page: 1, limit });
    return response.data;
  },

  /**
   * Add member to channel
   */
  async addChannelMember(channelId: string, userId: string): Promise<boolean> {
    const channel = await channelService.getById(channelId);
    const updatedMembers = [...channel.members, userId];
    await channelService.update(channelId, { members: updatedMembers });
    return true;
  },

  /**
   * Share document with channel
   */
  async shareDocument(documentId: string, channelId: string): Promise<boolean> {
    // This would be implementation-specific, perhaps creating a message with document reference
    return true;
  }
};
