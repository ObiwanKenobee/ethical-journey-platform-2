
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Bell,
  Settings,
  Filter,
  Search,
  Check,
  Archive,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Clock,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  Plus,
  Users,
  Target,
  TrendingUp,
  Shield,
  FileText,
  Database
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

interface NotificationRule {
  id: string;
  name: string;
  trigger: string;
  conditions: Record<string, any>;
  channels: string[];
  recipients: string[];
  enabled: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const SmartNotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [rules, setRules] = useState<NotificationRule[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    trigger: '',
    conditions: {},
    channels: [],
    recipients: [],
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadNotifications();
    loadRules();
  }, []);

  const loadNotifications = () => {
    // Mock data - replace with actual API calls
    setNotifications([
      {
        id: '1',
        title: 'High Risk Supplier Alert',
        message: 'Supplier ABC Corp has exceeded risk threshold due to recent labor violations',
        type: 'warning',
        priority: 'high',
        category: 'Supply Chain Risk',
        timestamp: '2024-01-15T10:30:00Z',
        read: false,
        actionUrl: '/suppliers/abc-corp',
        metadata: { supplierId: 'abc-corp', riskScore: 85 }
      },
      {
        id: '2',
        title: 'ESG Report Generated',
        message: 'Your quarterly ESG sustainability report has been generated and is ready for review',
        type: 'success',
        priority: 'medium',
        category: 'ESG Reporting',
        timestamp: '2024-01-15T09:15:00Z',
        read: false,
        actionUrl: '/reports/esg-q4-2023'
      },
      {
        id: '3',
        title: 'Compliance Deadline Approaching',
        message: 'EU CSRD reporting deadline is in 7 days. 3 suppliers still need documentation',
        type: 'warning',
        priority: 'high',
        category: 'Compliance',
        timestamp: '2024-01-15T08:45:00Z',
        read: true,
        actionUrl: '/compliance/eu-csrd'
      },
      {
        id: '4',
        title: 'Carbon Footprint Reduced',
        message: 'Supply chain carbon footprint reduced by 12% this quarter compared to target of 10%',
        type: 'success',
        priority: 'medium',
        category: 'Sustainability',
        timestamp: '2024-01-14T16:20:00Z',
        read: true
      }
    ]);
  };

  const loadRules = () => {
    // Mock data - replace with actual API calls
    setRules([
      {
        id: '1',
        name: 'High Risk Supplier Alert',
        trigger: 'supplier_risk_score_change',
        conditions: { risk_score: { operator: '>', value: 80 } },
        channels: ['email', 'in-app', 'sms'],
        recipients: ['supply-chain-team@company.com'],
        enabled: true,
        priority: 'high'
      },
      {
        id: '2',
        name: 'Compliance Deadline Reminder',
        trigger: 'compliance_deadline_approaching',
        conditions: { days_before: { operator: '<=', value: 7 } },
        channels: ['email', 'in-app'],
        recipients: ['compliance@company.com'],
        enabled: true,
        priority: 'medium'
      }
    ]);
  };

  const markAsRead = (notificationIds: string[]) => {
    setNotifications(prev =>
      prev.map(notification =>
        notificationIds.includes(notification.id)
          ? { ...notification, read: true }
          : notification
      )
    );
    setSelectedNotifications(new Set());
  };

  const archiveNotifications = (notificationIds: string[]) => {
    setNotifications(prev =>
      prev.filter(notification => !notificationIds.includes(notification.id))
    );
    setSelectedNotifications(new Set());
    toast({
      title: "Notifications Archived",
      description: `${notificationIds.length} notifications have been archived.`,
    });
  };

  const createRule = () => {
    if (!newRule.name || !newRule.trigger) {
      toast({
        title: "Missing Information",
        description: "Please fill in rule name and trigger",
        variant: "destructive"
      });
      return;
    }

    const rule: NotificationRule = {
      id: Date.now().toString(),
      ...newRule,
      enabled: true
    };

    setRules(prev => [...prev, rule]);
    setNewRule({
      name: '',
      trigger: '',
      conditions: {},
      channels: [],
      recipients: [],
      priority: 'medium'
    });
    setShowRuleForm(false);

    toast({
      title: "Rule Created",
      description: "Notification rule has been created successfully.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500';
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === 'read' && notification.read) ||
      (filter === notification.type);
    
    const matchesSearch = !searchQuery ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Smart Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Intelligent alerts and automated notification management</p>
        </div>
        <Button onClick={() => setShowRuleForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="rules">Rules & Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              className="px-3 py-2 border rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
            </select>

            {selectedNotifications.size > 0 && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => markAsRead(Array.from(selectedNotifications))}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark Read
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => archiveNotifications(Array.from(selectedNotifications))}
                >
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {filteredNotifications.map(notification => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    !notification.read ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => {
                    if (selectedNotifications.has(notification.id)) {
                      const newSelected = new Set(selectedNotifications);
                      newSelected.delete(notification.id);
                      setSelectedNotifications(newSelected);
                    } else {
                      setSelectedNotifications(new Set([...selectedNotifications, notification.id]));
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.has(notification.id)}
                        onChange={() => {}}
                        className="mt-1"
                      />
                      <Icon className={`h-5 w-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityBadge(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{notification.message}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(notification.timestamp).toLocaleString()}</span>
                          {notification.actionUrl && (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          {showRuleForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create Notification Rule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Rule name"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                />
                <select
                  className="w-full p-2 border rounded-md"
                  value={newRule.trigger}
                  onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })}
                >
                  <option value="">Select Trigger</option>
                  <option value="supplier_risk_change">Supplier Risk Change</option>
                  <option value="compliance_deadline">Compliance Deadline</option>
                  <option value="esg_metric_threshold">ESG Metric Threshold</option>
                  <option value="carbon_footprint_change">Carbon Footprint Change</option>
                  <option value="report_generated">Report Generated</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Channels</label>
                    <div className="space-y-2 mt-1">
                      {['email', 'in-app', 'sms', 'webhook'].map(channel => (
                        <label key={channel} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newRule.channels.includes(channel)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewRule({
                                  ...newRule,
                                  channels: [...newRule.channels, channel]
                                });
                              } else {
                                setNewRule({
                                  ...newRule,
                                  channels: newRule.channels.filter(c => c !== channel)
                                });
                              }
                            }}
                          />
                          <span className="capitalize">{channel}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <select
                      className="w-full p-2 border rounded-md mt-1"
                      value={newRule.priority}
                      onChange={(e) => setNewRule({ ...newRule, priority: e.target.value as 'low' | 'medium' | 'high' | 'critical' })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                <Textarea
                  placeholder="Recipients (comma-separated emails)"
                  onChange={(e) => setNewRule({
                    ...newRule,
                    recipients: e.target.value.split(',').map(s => s.trim())
                  })}
                />
                <div className="flex gap-2">
                  <Button onClick={createRule}>Create Rule</Button>
                  <Button variant="outline" onClick={() => setShowRuleForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {rules.map(rule => (
              <Card key={rule.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{rule.name}</h3>
                        <Badge className={getPriorityBadge(rule.priority)}>
                          {rule.priority}
                        </Badge>
                        <Switch checked={rule.enabled} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Trigger: {rule.trigger.replace(/_/g, ' ')}
                      </p>
                      <div className="flex gap-2">
                        {rule.channels.map(channel => (
                          <Badge key={channel} variant="outline" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Notification Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-sm text-muted-foreground">This week (+12%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Response Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-sm text-muted-foreground">Actions taken on alerts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Avg Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12m</div>
                <p className="text-sm text-muted-foreground">From alert to action</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Alerts</h4>
                  <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Browser push notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Daily Digest</h4>
                  <p className="text-sm text-muted-foreground">Daily summary of activity</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartNotificationCenter;
