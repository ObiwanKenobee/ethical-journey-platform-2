import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Building,
  Users,
  Globe,
  Shield,
  BarChart3,
  Target,
  Calendar,
  Mail,
  Phone,
  Video,
  FileText,
  Download,
  Settings,
  Bell,
  Search,
  Filter,
  Plus,
  ExternalLink,
  Briefcase,
  Handshake,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  Database,
  Gavel,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  priority: "high" | "medium" | "low";
  urgent?: boolean;
}

interface MeetingAlert {
  title: string;
  time: string;
  attendees: number;
  type: "board" | "stakeholder" | "investor" | "compliance";
  urgent: boolean;
}

const CEONavigationPanel = () => {
  const [showAllActions, setShowAllActions] = useState(false);

  const quickActions: QuickAction[] = [
    {
      title: "Board Meeting Prep",
      description: "Q4 board materials and ESG presentation",
      icon: Crown,
      href: "/ceo/board-materials",
      priority: "high",
      urgent: true,
    },
    {
      title: "Stakeholder Report",
      description: "Generate executive stakeholder summary",
      icon: Handshake,
      href: "/ceo/stakeholder-report",
      priority: "high",
    },
    {
      title: "Global Risk Assessment",
      description: "Review enterprise risk landscape",
      icon: Shield,
      href: "/ceo/risk-assessment",
      priority: "high",
    },
    {
      title: "ESG Performance",
      description: "Environmental, Social & Governance metrics",
      icon: Globe,
      href: "/ceo/esg-dashboard",
      priority: "medium",
    },
    {
      title: "Compliance Status",
      description: "SOC 2, ISO 27001, GDPR compliance overview",
      icon: Gavel,
      href: "/ceo/compliance-overview",
      priority: "medium",
    },
    {
      title: "Strategic Planning",
      description: "Long-term strategic initiatives tracker",
      icon: Target,
      href: "/ceo/strategic-planning",
      priority: "medium",
    },
    {
      title: "Investor Relations",
      description: "Investor communications and metrics",
      icon: TrendingUp,
      href: "/ceo/investor-relations",
      priority: "low",
    },
    {
      title: "Executive Analytics",
      description: "Advanced business intelligence dashboard",
      icon: BarChart3,
      href: "/ceo/executive-analytics",
      priority: "low",
    },
  ];

  const meetingAlerts: MeetingAlert[] = [
    {
      title: "Board of Directors Meeting",
      time: "Today, 2:00 PM",
      attendees: 12,
      type: "board",
      urgent: true,
    },
    {
      title: "Investor Relations Call",
      time: "Tomorrow, 10:00 AM",
      attendees: 25,
      type: "investor",
      urgent: false,
    },
    {
      title: "ESG Committee Review",
      time: "Dec 16, 3:00 PM",
      attendees: 8,
      type: "stakeholder",
      urgent: false,
    },
  ];

  const getActionPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      case "low":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case "board":
        return "bg-purple-100 text-purple-800";
      case "investor":
        return "bg-blue-100 text-blue-800";
      case "stakeholder":
        return "bg-green-100 text-green-800";
      case "compliance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const displayedActions = showAllActions
    ? quickActions
    : quickActions.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-50 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">CEO Command Center</h2>
                <p className="text-muted-foreground">
                  Strategic oversight and executive control
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-white">
                <Shield className="h-3 w-3 mr-1" />
                Master Access
              </Badge>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Bell className="h-5 w-5" />
            Executive Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-sm">
                  GDPR Compliance Review Required
                </p>
                <p className="text-xs text-muted-foreground">
                  EU operations - immediate attention needed
                </p>
              </div>
            </div>
            <Button size="sm" variant="destructive">
              Review Now
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-sm">Q4 Board Report Due</p>
                <p className="text-xs text-muted-foreground">
                  Due December 15th - 3 days remaining
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Open Draft
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Executive Quick Actions
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllActions(!showAllActions)}
            >
              {showAllActions ? "Show Less" : "Show All"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${getActionPriorityColor(action.priority)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <action.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {action.title}
                      </h4>
                      {action.urgent && (
                        <Badge
                          variant="destructive"
                          className="text-xs px-1 py-0"
                        >
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {action.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        {action.priority} priority
                      </Badge>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Executive Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {meetingAlerts.map((meeting, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${meeting.urgent ? "border-red-200 bg-red-50" : "border-border bg-muted/50"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    {meeting.type === "board" && (
                      <Crown className="h-4 w-4 text-purple-600" />
                    )}
                    {meeting.type === "investor" && (
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    )}
                    {meeting.type === "stakeholder" && (
                      <Handshake className="h-4 w-4 text-green-600" />
                    )}
                    {meeting.type === "compliance" && (
                      <Shield className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{meeting.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {meeting.time}
                      </p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">
                        {meeting.attendees} attendees
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getMeetingTypeColor(meeting.type)}>
                    {meeting.type}
                  </Badge>
                  {meeting.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1">
                  <Video className="h-3 w-3 mr-1" />
                  Join Meeting
                </Button>
                <Button size="sm" variant="ghost">
                  <FileText className="h-3 w-3 mr-1" />
                  Materials
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-4">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Calendar
          </Button>
        </CardContent>
      </Card>

      {/* Executive Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Executive Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto p-3 flex-col">
              <FileText className="h-5 w-5 mb-2" />
              <span className="text-xs">Reports</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 flex-col">
              <BarChart3 className="h-5 w-5 mb-2" />
              <span className="text-xs">Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 flex-col">
              <Eye className="h-5 w-5 mb-2" />
              <span className="text-xs">Oversight</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 flex-col">
              <Lightbulb className="h-5 w-5 mb-2" />
              <span className="text-xs">Insights</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CEONavigationPanel;
