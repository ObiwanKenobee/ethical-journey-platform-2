import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  Settings,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Crown,
  Lock,
  Unlock,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Database,
  Key,
  Activity,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Globe,
  Building,
  Zap,
  Network,
  FileText,
  MessageSquare,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export interface Role {
  id: string;
  name: string;
  description: string;
  type: "system" | "custom";
  level: number;
  permissions: Permission[];
  memberCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category:
    | "data"
    | "users"
    | "settings"
    | "billing"
    | "security"
    | "reports"
    | "integrations";
  action: "create" | "read" | "update" | "delete" | "execute" | "admin";
  resource: string;
  conditions?: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  roles: Role[];
  status: "active" | "invited" | "suspended" | "inactive";
  joinedAt: string;
  lastActive: string;
  department?: string;
  title?: string;
  location?: string;
  phone?: string;
  permissions: Permission[];
  sessions: UserSession[];
  auditLog: AuditLogEntry[];
}

export interface UserSession {
  id: string;
  deviceInfo: string;
  location: string;
  ipAddress: string;
  startedAt: string;
  lastActivity: string;
  status: "active" | "expired";
}

export interface AuditLogEntry {
  id: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

const EnterpriseRBAC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchRBACData();
  }, []);

  const fetchRBACData = async () => {
    try {
      setLoading(true);

      // Mock data for demonstration
      const mockPermissions: Permission[] = [
        // Data permissions
        {
          id: "data-read",
          name: "View Data",
          description: "View all data and reports",
          category: "data",
          action: "read",
          resource: "*",
        },
        {
          id: "data-create",
          name: "Create Data",
          description: "Create new data records",
          category: "data",
          action: "create",
          resource: "*",
        },
        {
          id: "data-update",
          name: "Update Data",
          description: "Modify existing data",
          category: "data",
          action: "update",
          resource: "*",
        },
        {
          id: "data-delete",
          name: "Delete Data",
          description: "Delete data records",
          category: "data",
          action: "delete",
          resource: "*",
        },

        // User management permissions
        {
          id: "users-read",
          name: "View Users",
          description: "View user accounts and profiles",
          category: "users",
          action: "read",
          resource: "users",
        },
        {
          id: "users-create",
          name: "Create Users",
          description: "Invite and create new users",
          category: "users",
          action: "create",
          resource: "users",
        },
        {
          id: "users-update",
          name: "Update Users",
          description: "Modify user accounts and roles",
          category: "users",
          action: "update",
          resource: "users",
        },
        {
          id: "users-delete",
          name: "Delete Users",
          description: "Remove user accounts",
          category: "users",
          action: "delete",
          resource: "users",
        },

        // Settings permissions
        {
          id: "settings-read",
          name: "View Settings",
          description: "View workspace settings",
          category: "settings",
          action: "read",
          resource: "settings",
        },
        {
          id: "settings-update",
          name: "Update Settings",
          description: "Modify workspace settings",
          category: "settings",
          action: "update",
          resource: "settings",
        },

        // Billing permissions
        {
          id: "billing-read",
          name: "View Billing",
          description: "View billing and usage information",
          category: "billing",
          action: "read",
          resource: "billing",
        },
        {
          id: "billing-update",
          name: "Manage Billing",
          description: "Update billing and payment methods",
          category: "billing",
          action: "update",
          resource: "billing",
        },

        // Security permissions
        {
          id: "security-read",
          name: "View Security",
          description: "View security settings and logs",
          category: "security",
          action: "read",
          resource: "security",
        },
        {
          id: "security-update",
          name: "Manage Security",
          description: "Configure security settings",
          category: "security",
          action: "update",
          resource: "security",
        },
        {
          id: "security-admin",
          name: "Security Admin",
          description: "Full security administration",
          category: "security",
          action: "admin",
          resource: "security",
        },

        // Reports permissions
        {
          id: "reports-read",
          name: "View Reports",
          description: "Access standard reports",
          category: "reports",
          action: "read",
          resource: "reports",
        },
        {
          id: "reports-create",
          name: "Create Reports",
          description: "Create custom reports",
          category: "reports",
          action: "create",
          resource: "reports",
        },
        {
          id: "reports-admin",
          name: "Reports Admin",
          description: "Manage all reports and analytics",
          category: "reports",
          action: "admin",
          resource: "reports",
        },

        // Integrations permissions
        {
          id: "integrations-read",
          name: "View Integrations",
          description: "View integration status",
          category: "integrations",
          action: "read",
          resource: "integrations",
        },
        {
          id: "integrations-create",
          name: "Create Integrations",
          description: "Set up new integrations",
          category: "integrations",
          action: "create",
          resource: "integrations",
        },
        {
          id: "integrations-admin",
          name: "Integrations Admin",
          description: "Manage all integrations",
          category: "integrations",
          action: "admin",
          resource: "integrations",
        },
      ];

      const mockRoles: Role[] = [
        {
          id: "owner",
          name: "Owner",
          description: "Full access to all workspace features and settings",
          type: "system",
          level: 100,
          permissions: mockPermissions,
          memberCount: 1,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          createdBy: "system",
          isActive: true,
        },
        {
          id: "admin",
          name: "Administrator",
          description:
            "Administrative access with user and settings management",
          type: "system",
          level: 90,
          permissions: mockPermissions.filter(
            (p) => p.category !== "billing" || p.action === "read",
          ),
          memberCount: 3,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          createdBy: "system",
          isActive: true,
        },
        {
          id: "manager",
          name: "Manager",
          description:
            "Team management with data access and basic user management",
          type: "system",
          level: 70,
          permissions: mockPermissions.filter(
            (p) =>
              ["data", "reports", "users"].includes(p.category) &&
              ["read", "create", "update"].includes(p.action),
          ),
          memberCount: 12,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          createdBy: "system",
          isActive: true,
        },
        {
          id: "analyst",
          name: "Analyst",
          description:
            "Data analysis and reporting with limited administrative access",
          type: "system",
          level: 50,
          permissions: mockPermissions.filter(
            (p) =>
              ["data", "reports"].includes(p.category) &&
              ["read", "create"].includes(p.action),
          ),
          memberCount: 28,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          createdBy: "system",
          isActive: true,
        },
        {
          id: "viewer",
          name: "Viewer",
          description: "Read-only access to data and reports",
          type: "system",
          level: 30,
          permissions: mockPermissions.filter((p) => p.action === "read"),
          memberCount: 47,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          createdBy: "system",
          isActive: true,
        },
        {
          id: "compliance-officer",
          name: "Compliance Officer",
          description: "Specialized role for compliance and audit management",
          type: "custom",
          level: 80,
          permissions: mockPermissions.filter(
            (p) =>
              ["data", "reports", "security"].includes(p.category) ||
              (p.category === "users" && p.action === "read"),
          ),
          memberCount: 5,
          createdAt: "2024-02-15T00:00:00Z",
          updatedAt: "2024-11-20T00:00:00Z",
          createdBy: "admin-001",
          isActive: true,
        },
      ];

      const mockUsers: User[] = [
        {
          id: "user-001",
          email: "sarah.johnson@globalsupply.com",
          name: "Sarah Johnson",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          roles: [mockRoles[0]], // Owner
          status: "active",
          joinedAt: "2024-01-15T00:00:00Z",
          lastActive: "2024-12-15T10:30:00Z",
          department: "Executive",
          title: "Chief Supply Chain Officer",
          location: "New York, NY",
          phone: "+1 (555) 123-4567",
          permissions: mockRoles[0].permissions,
          sessions: [
            {
              id: "session-001",
              deviceInfo: "Chrome on MacBook Pro",
              location: "New York, NY",
              ipAddress: "203.0.113.45",
              startedAt: "2024-12-15T08:00:00Z",
              lastActivity: "2024-12-15T10:30:00Z",
              status: "active",
            },
          ],
          auditLog: [
            {
              id: "audit-001",
              action: "User Login",
              resource: "authentication",
              details: { method: "SSO", provider: "Microsoft" },
              timestamp: "2024-12-15T08:00:00Z",
              ipAddress: "203.0.113.45",
              userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            },
          ],
        },
        {
          id: "user-002",
          email: "michael.chen@globalsupply.com",
          name: "Michael Chen",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          roles: [mockRoles[1]], // Administrator
          status: "active",
          joinedAt: "2024-01-20T00:00:00Z",
          lastActive: "2024-12-15T09:45:00Z",
          department: "IT",
          title: "IT Director",
          location: "San Francisco, CA",
          phone: "+1 (555) 234-5678",
          permissions: mockRoles[1].permissions,
          sessions: [
            {
              id: "session-002",
              deviceInfo: "Firefox on Windows 11",
              location: "San Francisco, CA",
              ipAddress: "198.51.100.22",
              startedAt: "2024-12-15T07:30:00Z",
              lastActivity: "2024-12-15T09:45:00Z",
              status: "active",
            },
          ],
          auditLog: [],
        },
        {
          id: "user-003",
          email: "jennifer.davis@globalsupply.com",
          name: "Jennifer Davis",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
          roles: [mockRoles[5]], // Compliance Officer
          status: "active",
          joinedAt: "2024-02-15T00:00:00Z",
          lastActive: "2024-12-15T08:20:00Z",
          department: "Compliance",
          title: "Senior Compliance Officer",
          location: "Chicago, IL",
          phone: "+1 (555) 345-6789",
          permissions: mockRoles[5].permissions,
          sessions: [],
          auditLog: [],
        },
        {
          id: "user-004",
          email: "david.wilson@globalsupply.com",
          name: "David Wilson",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          roles: [mockRoles[3]], // Analyst
          status: "active",
          joinedAt: "2024-03-10T00:00:00Z",
          lastActive: "2024-12-14T16:30:00Z",
          department: "Analytics",
          title: "Senior Data Analyst",
          location: "Austin, TX",
          phone: "+1 (555) 456-7890",
          permissions: mockRoles[3].permissions,
          sessions: [],
          auditLog: [],
        },
        {
          id: "user-005",
          email: "lisa.martinez@partner.com",
          name: "Lisa Martinez",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          roles: [mockRoles[4]], // Viewer
          status: "invited",
          joinedAt: "2024-12-10T00:00:00Z",
          lastActive: "",
          department: "External",
          title: "Partner Representative",
          location: "Remote",
          phone: "+1 (555) 567-8901",
          permissions: mockRoles[4].permissions,
          sessions: [],
          auditLog: [],
        },
      ];

      setPermissions(mockPermissions);
      setRoles(mockRoles);
      setUsers(mockUsers);
      setSelectedRole(mockRoles[0]);
    } catch (error) {
      toast({
        title: "Error loading RBAC data",
        description: "Failed to fetch role and user data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" || user.roles.some((role) => role.id === roleFilter);
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "invited":
        return "bg-blue-500";
      case "suspended":
        return "bg-red-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleColor = (role: Role) => {
    if (role.type === "system") {
      switch (role.level) {
        case 100:
          return "bg-yellow-100 text-yellow-800"; // Owner
        case 90:
          return "bg-red-100 text-red-800"; // Admin
        case 70:
          return "bg-blue-100 text-blue-800"; // Manager
        case 50:
          return "bg-green-100 text-green-800"; // Analyst
        case 30:
          return "bg-gray-100 text-gray-800"; // Viewer
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    return "bg-purple-100 text-purple-800"; // Custom roles
  };

  const getPermissionCategoryIcon = (category: string) => {
    switch (category) {
      case "data":
        return Database;
      case "users":
        return Users;
      case "settings":
        return Settings;
      case "billing":
        return BarChart3;
      case "security":
        return Shield;
      case "reports":
        return FileText;
      case "integrations":
        return Network;
      default:
        return Settings;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading RBAC management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Role-Based Access Control</h1>
          <p className="text-muted-foreground">
            Manage roles, permissions, and user access across your enterprise
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold">{users.length}</h3>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2">
              <Badge variant="default">
                {users.filter((u) => u.status === "active").length} Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Roles
                </p>
                <h3 className="text-2xl font-bold">{roles.length}</h3>
              </div>
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-2">
              <Badge variant="outline">
                {roles.filter((r) => r.type === "custom").length} Custom
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Permissions
                </p>
                <h3 className="text-2xl font-bold">{permissions.length}</h3>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              <Badge variant="default" className="bg-green-500">
                Granular Control
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Sessions
                </p>
                <h3 className="text-2xl font-bold">
                  {users.reduce(
                    (acc, user) =>
                      acc +
                      user.sessions.filter((s) => s.status === "active").length,
                    0,
                  )}
                </h3>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <Badge variant="outline">Real-time</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="invited">Invited</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Department</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Last Active</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {user.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <Badge
                                key={role.id}
                                className={getRoleColor(role)}
                              >
                                {role.name}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{user.department}</div>
                          <div className="text-xs text-muted-foreground">
                            {user.location}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            {user.lastActive
                              ? new Date(user.lastActive).toLocaleDateString()
                              : "Never"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {
                              user.sessions.filter((s) => s.status === "active")
                                .length
                            }{" "}
                            active sessions
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* User Details Modal/Panel */}
          {selectedUser && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>User Details: {selectedUser.name}</span>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedUser(null)}
                  >
                    Close
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">User Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Department:
                        </span>
                        <span>{selectedUser.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Title:</span>
                        <span>{selectedUser.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{selectedUser.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{selectedUser.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Joined:</span>
                        <span>
                          {new Date(selectedUser.joinedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Access Control</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">
                          Assigned Roles:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedUser.roles.map((role) => (
                            <Badge key={role.id} className={getRoleColor(role)}>
                              {role.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">
                          Permissions Count:
                        </span>
                        <div className="text-sm text-muted-foreground mt-1">
                          {selectedUser.permissions.length} permissions granted
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Status:</span>
                        <div className="mt-1">
                          <Badge
                            className={getStatusColor(selectedUser.status)}
                          >
                            {selectedUser.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedUser.sessions.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Active Sessions</h4>
                    <div className="space-y-2">
                      {selectedUser.sessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-3 border rounded"
                        >
                          <div>
                            <div className="font-medium text-sm">
                              {session.deviceInfo}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {session.location} • {session.ipAddress}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Started:{" "}
                              {new Date(session.startedAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                session.status === "active"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {session.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              Revoke
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Roles</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[600px] overflow-y-auto">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedRole?.id === role.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedRole(role)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">
                              {role.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {role.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={getRoleColor(role)}>
                              {role.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Level {role.level}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {role.memberCount} members
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedRole ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5" />
                      {selectedRole.name}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {selectedRole.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedRole.memberCount}
                        </div>
                        <p className="text-sm text-muted-foreground">Members</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedRole.permissions.length}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Permissions
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedRole.level}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Access Level
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold">Permissions</h4>
                      <div className="space-y-3">
                        {Object.entries(
                          selectedRole.permissions.reduce(
                            (acc, permission) => {
                              if (!acc[permission.category]) {
                                acc[permission.category] = [];
                              }
                              acc[permission.category].push(permission);
                              return acc;
                            },
                            {} as Record<string, Permission[]>,
                          ),
                        ).map(([category, categoryPermissions]) => {
                          const IconComponent =
                            getPermissionCategoryIcon(category);
                          return (
                            <div
                              key={category}
                              className="p-4 border rounded-lg"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <IconComponent className="h-4 w-4" />
                                <h5 className="font-medium capitalize">
                                  {category}
                                </h5>
                                <Badge variant="outline" className="text-xs">
                                  {categoryPermissions.length} permissions
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {categoryPermissions.map((permission) => (
                                  <div
                                    key={permission.id}
                                    className="flex items-center justify-between text-sm"
                                  >
                                    <span>{permission.name}</span>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {permission.action}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Role
                      </Button>
                      <Button variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Members
                      </Button>
                      {selectedRole.type === "custom" && (
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Role
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Crown className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Select a Role
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a role from the list to view its permissions and
                      manage members.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
              <p className="text-muted-foreground">
                Granular permissions control access to specific features and
                data
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(
                  permissions.reduce(
                    (acc, permission) => {
                      if (!acc[permission.category]) {
                        acc[permission.category] = [];
                      }
                      acc[permission.category].push(permission);
                      return acc;
                    },
                    {} as Record<string, Permission[]>,
                  ),
                ).map(([category, categoryPermissions]) => {
                  const IconComponent = getPermissionCategoryIcon(category);
                  return (
                    <div key={category} className="p-6 border rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold capitalize">
                            {category}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {categoryPermissions.length} permissions in this
                            category
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryPermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="p-3 border rounded"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-sm">
                                {permission.name}
                              </h5>
                              <Badge variant="outline" className="text-xs">
                                {permission.action}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                            <div className="mt-2">
                              <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                                {permission.resource}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Audit Log
              </CardTitle>
              <p className="text-muted-foreground">
                Track all user actions and system events for compliance and
                security monitoring
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Comprehensive Audit Trail
                </h3>
                <p className="text-muted-foreground mb-4">
                  Real-time logging of all user activities, permission changes,
                  and system events with full forensic capabilities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Real-time Monitoring</h4>
                    <p className="text-xs text-muted-foreground">
                      Live activity tracking
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Security Events</h4>
                    <p className="text-xs text-muted-foreground">
                      Anomaly detection
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Database className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Data Changes</h4>
                    <p className="text-xs text-muted-foreground">
                      Complete change history
                    </p>
                  </div>
                </div>
                <Button>View Full Audit Log</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseRBAC;
