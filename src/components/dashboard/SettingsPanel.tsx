
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  FileText, 
  Globe, 
  CheckCircle,
  Lock,
  Eye,
  EyeOff 
} from 'lucide-react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    job: 'Compliance Manager',
    company: 'Ethical Global Enterprises',
    timezone: 'America/New_York',
    language: 'en',
    theme: 'system',
    twoFactorEnabled: true,
    emailNotifications: {
      supplierRisks: true,
      complianceAlerts: true,
      weeklyReports: true,
      partnerRequests: false,
      marketUpdates: true
    },
    dataSharing: {
      anonymizedData: true,
      supplierNetwork: false,
      industryBenchmarks: true
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleNotification = (key: keyof typeof profileData.emailNotifications) => {
    setProfileData(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: !prev.emailNotifications[key]
      }
    }));
  };

  const toggleDataSharing = (key: keyof typeof profileData.dataSharing) => {
    setProfileData(prev => ({
      ...prev,
      dataSharing: {
        ...prev.dataSharing,
        [key]: !prev.dataSharing[key]
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
              <TabsTrigger value="profile">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Profile</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden md:inline">Notifications</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="security">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">Security</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="billing">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden md:inline">Billing</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="data">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden md:inline">Data</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="api">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden md:inline">API</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="w-32 h-32">
                    <AvatarFallback className="text-3xl">AJ</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={profileData.name} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profileData.email} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job">Job Title</Label>
                      <Input 
                        id="job" 
                        name="job" 
                        value={profileData.job} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        name="company" 
                        value={profileData.company} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue={profileData.timezone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue={profileData.language}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select defaultValue={profileData.theme}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System Default</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Supply Chain Risk Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts about high-risk suppliers or compliance issues</p>
                    </div>
                    <Switch 
                      checked={profileData.emailNotifications.supplierRisks}
                      onCheckedChange={() => toggleNotification('supplierRisks')} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compliance Deadline Reminders</p>
                      <p className="text-sm text-muted-foreground">Get notified about upcoming regulatory deadlines</p>
                    </div>
                    <Switch 
                      checked={profileData.emailNotifications.complianceAlerts}
                      onCheckedChange={() => toggleNotification('complianceAlerts')} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Summary Reports</p>
                      <p className="text-sm text-muted-foreground">Receive a weekly digest of your supply chain status</p>
                    </div>
                    <Switch 
                      checked={profileData.emailNotifications.weeklyReports}
                      onCheckedChange={() => toggleNotification('weeklyReports')} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Partner Collaboration Requests</p>
                      <p className="text-sm text-muted-foreground">Notifications when partners invite you to collaborate</p>
                    </div>
                    <Switch 
                      checked={profileData.emailNotifications.partnerRequests}
                      onCheckedChange={() => toggleNotification('partnerRequests')} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Market Intelligence Updates</p>
                      <p className="text-sm text-muted-foreground">Industry news and regulatory changes that may affect you</p>
                    </div>
                    <Switch 
                      checked={profileData.emailNotifications.marketUpdates}
                      onCheckedChange={() => toggleNotification('marketUpdates')} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input 
                          id="current-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input 
                          id="new-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirm-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch checked={profileData.twoFactorEnabled} />
                  </div>
                  {profileData.twoFactorEnabled && (
                    <div className="bg-muted/50 p-4 rounded-md mt-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Two-factor authentication is enabled</p>
                          <p className="text-sm text-muted-foreground">
                            Your account is secured with authenticator app verification.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">Manage 2FA Settings</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sessions</h3>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Last active: Just now • Los Angeles, USA • Chrome on Windows
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                        Active
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline">Log Out of All Other Sessions</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="p-6">
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="text-lg font-medium">Current Plan</h3>
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">Enterprise Plan</p>
                        <p className="text-muted-foreground">Unlimited access to all features</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        Active
                      </Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Billing cycle</p>
                        <p className="font-medium">Annual</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next payment</p>
                        <p className="font-medium">July 15, 2025</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-medium">$24,000.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">View Payment History</Button>
                  <Button variant="outline">Update Billing Information</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Data Sharing & Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Share Anonymized Data</p>
                      <p className="text-sm text-muted-foreground">
                        Contribute anonymized supply chain data to improve the platform's AI capabilities
                      </p>
                    </div>
                    <Switch 
                      checked={profileData.dataSharing.anonymizedData}
                      onCheckedChange={() => toggleDataSharing('anonymizedData')} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Supplier Network Visibility</p>
                      <p className="text-sm text-muted-foreground">
                        Allow other platform users to see your supplier connections (not detailed data)
                      </p>
                    </div>
                    <Switch 
                      checked={profileData.dataSharing.supplierNetwork}
                      onCheckedChange={() => toggleDataSharing('supplierNetwork')} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Industry Benchmarking</p>
                      <p className="text-sm text-muted-foreground">
                        Participate in anonymous industry benchmarking to compare your performance
                      </p>
                    </div>
                    <Switch 
                      checked={profileData.dataSharing.industryBenchmarks}
                      onCheckedChange={() => toggleDataSharing('industryBenchmarks')} 
                    />
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <h3 className="text-lg font-medium">Export Data</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Export your data in various formats for your records or analysis
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline">Export as CSV</Button>
                      <Button variant="outline">Export as JSON</Button>
                      <Button variant="outline">Export as PDF</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">API Access</h3>
                  <p className="text-muted-foreground">
                    Connect your systems directly to Guardian-IO using our secure API
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">API Keys</p>
                      <div className="flex items-center mt-2">
                        <Input 
                          value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
                          type="password"
                          readOnly
                          className="font-mono"
                        />
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-1">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        This key was created on December 12, 2024 and has never been rotated
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Generate New Key</Button>
                      <Button variant="outline" size="sm">Revoke All Keys</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Webhooks</h3>
                  <p className="text-muted-foreground mb-4">
                    Receive real-time notifications when important events occur
                  </p>
                  
                  <div className="space-y-2">
                    <Button variant="outline">Configure Webhooks</Button>
                    <Button variant="outline">View Webhook Logs</Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Documentation</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn how to integrate with our API
                  </p>
                  
                  <div className="space-y-2">
                    <Button variant="outline">View API Documentation</Button>
                    <Button variant="outline">Download SDK</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
