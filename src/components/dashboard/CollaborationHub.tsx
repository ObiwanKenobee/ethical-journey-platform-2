
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  FileText, 
  Send, 
  Plus,
  Globe,
  RefreshCw
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { 
  channelService, 
  messageService, 
  collaborationService, 
  Message, 
  EventItem,
  Document
} from '@/services/dashboard/collaboration.service';
import { apiService } from '@/services/api.service';
import { supabase } from '@/integrations/supabase/client';

const CollaborationHub = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState({
    messages: false,
    events: false,
    documents: false
  });
  const [currentChannelId, setCurrentChannelId] = useState('general'); // Default channel
  
  useEffect(() => {
    if (activeTab === 'chat') {
      fetchMessages();
    } else if (activeTab === 'calendar') {
      fetchEvents();
    } else if (activeTab === 'documents') {
      fetchDocuments();
    }
  }, [activeTab]);
  
  const fetchMessages = async () => {
    try {
      setLoading(prev => ({ ...prev, messages: true }));
      const response = await collaborationService.getChannelMessages(currentChannelId);
      setMessages(response);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error loading messages',
        description: 'Could not load chat messages. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(prev => ({ ...prev, messages: false }));
    }
  };
  
  const fetchEvents = async () => {
    try {
      setLoading(prev => ({ ...prev, events: true }));
      const response = await apiService.getAll('events');
      setEvents(response.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Error loading events',
        description: 'Could not load calendar events. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(prev => ({ ...prev, events: false }));
    }
  };
  
  const fetchDocuments = async () => {
    try {
      setLoading(prev => ({ ...prev, documents: true }));
      const response = await apiService.getAll('documents');
      setDocuments(response.data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: 'Error loading documents',
        description: 'Could not load documents. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(prev => ({ ...prev, documents: false }));
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Send message
        const response = await collaborationService.sendMessage(
          currentChannelId,
          messageInput,
          user.id
        );
        
        // Update messages list
        setMessages(prev => [...prev, response]);
        setMessageInput('');
      } catch (error) {
        console.error('Error sending message:', error);
        toast({
          title: 'Error sending message',
          description: 'Could not send your message. Please try again.',
          variant: 'destructive'
        });
      }
    }
  };

  // Mock data for members (this would come from an API call)
  const TEAM_MEMBERS = [
    { id: 1, name: 'Sarah Johnson', role: 'Compliance Officer', avatar: '', status: 'online' },
    { id: 2, name: 'Michael Chen', role: 'Supply Chain Manager', avatar: '', status: 'offline' },
    { id: 3, name: 'Emma Rodriguez', role: 'Sustainability Lead', avatar: '', status: 'online' },
    { id: 4, name: 'David Nguyen', role: 'Legal Advisor', avatar: '', status: 'away' }
  ];
  
  const EXTERNAL_PARTNERS = [
    { id: 1, name: 'Green Alliance', type: 'NGO', avatar: '', status: 'invited' },
    { id: 2, name: 'Global Supply Ethics', type: 'Certification Body', avatar: '', status: 'active' },
    { id: 3, name: 'Regulatory Committee', type: 'Government', avatar: '', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Collaboration Hub</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="chat">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Team Chat</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="team">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Members</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Events</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="documents">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Documents</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="p-4">
              <div className="flex flex-col h-[400px]">
                <ScrollArea className="flex-1 mb-4 pr-4">
                  <div className="space-y-4">
                    {loading.messages ? (
                      <div className="flex justify-center py-4">
                        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div key={message.id} className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{message.sender_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{message.sender_name}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="mt-1">{message.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={messageInput} 
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Team Members</h3>
                  <div className="space-y-3">
                    {TEAM_MEMBERS.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Badge variant={member.status === 'online' ? 'default' : member.status === 'away' ? 'outline' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium">External Partners</h3>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Plus className="h-3 w-3" />
                      <span>Invite</span>
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {EXTERNAL_PARTNERS.map((partner) => (
                      <div key={partner.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              <Globe className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{partner.name}</p>
                            <p className="text-sm text-muted-foreground">{partner.type}</p>
                          </div>
                        </div>
                        <Badge variant={partner.status === 'active' ? 'default' : 'outline'}>
                          {partner.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Upcoming Events</h3>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Plus className="h-3 w-3" />
                    <span>New Event</span>
                  </Button>
                </div>
                <div className="space-y-3">
                  {loading.events ? (
                    <div className="flex justify-center py-4">
                      <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    events.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline">{event.participants.length} participants</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Shared Documents</h3>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Plus className="h-3 w-3" />
                    <span>Upload</span>
                  </Button>
                </div>
                <div className="space-y-3">
                  {loading.documents ? (
                    <div className="flex justify-center py-4">
                      <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">Updated {new Date(doc.updated_at).toLocaleDateString()} by {doc.owner_name}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{doc.file_type}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaborationHub;
