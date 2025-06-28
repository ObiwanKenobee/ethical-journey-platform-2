export interface UserArchetypeProfile {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category:
    | "executive"
    | "governance"
    | "operational"
    | "technical"
    | "oversight";
  organizationType: string;
  systemRole: "business" | "compliance" | "government" | "ngo" | "superadmin";

  // Detailed professional profile
  keyResponsibilities: string[];
  primaryGoals: string[];
  decisionAuthority: "view" | "recommend" | "approve" | "execute";
  analyticsLevel: "basic" | "intermediate" | "advanced" | "expert";

  // Platform capabilities
  technologyAccess: string[];
  dataCapabilities: string[];
  complianceFrameworks: string[];

  // Dashboard configuration
  dashboardLayout: DashboardLayoutConfig;
  widgetPermissions: WidgetPermission[];
  reportingCapabilities: ReportingCapability[];

  // Collaboration settings
  communicationChannels: string[];
  stakeholderGroups: string[];
  escalationPaths: string[];
}

export interface DashboardLayoutConfig {
  layout: "executive" | "operational" | "analytical" | "investigative";
  primaryWidgets: string[];
  secondaryWidgets: string[];
  hiddenSections: string[];
  customizations: {
    colorScheme: string;
    density: "compact" | "comfortable" | "spacious";
    refreshInterval: number;
  };
}

export interface WidgetPermission {
  widgetId: string;
  access: "full" | "read-only" | "restricted" | "hidden";
  customizations: string[];
}

export interface ReportingCapability {
  reportType: string;
  frequency:
    | "real-time"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "quarterly";
  distribution: "view-only" | "download" | "share" | "schedule";
  dataLevel: "summary" | "detailed" | "raw";
}

export interface ArchetypeBasedInsight {
  id: string;
  archetypeId: string;
  type: "opportunity" | "risk" | "recommendation" | "alert";
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  actionable: boolean;
  relatedMetrics: string[];
  suggestedActions: string[];
  timeline: string;
  stakeholders: string[];
}

class UserArchetypeService {
  private static instance: UserArchetypeService;
  private archetypeProfiles: Map<string, UserArchetypeProfile> = new Map();

  public static getInstance(): UserArchetypeService {
    if (!UserArchetypeService.instance) {
      UserArchetypeService.instance = new UserArchetypeService();
    }
    return UserArchetypeService.instance;
  }

  constructor() {
    this.initializeArchetypes();
  }

  private initializeArchetypes() {
    const archetypes: UserArchetypeProfile[] = [
      {
        id: "ceo",
        title: "Chief Executive Officer",
        subtitle: "Executive Leadership",
        description:
          "Strategic oversight of global operations, ESG performance, and stakeholder relations",
        category: "executive",
        organizationType: "Corporate Executive",
        systemRole: "business",
        keyResponsibilities: [
          "Strategic decision making and corporate governance",
          "Stakeholder management and investor relations",
          "ESG strategy and sustainability leadership",
          "Risk management and crisis response",
          "Regulatory compliance oversight",
        ],
        primaryGoals: [
          "Maximize shareholder value while maintaining ESG standards",
          "Ensure regulatory compliance across all jurisdictions",
          "Drive sustainable business growth and innovation",
          "Maintain corporate reputation and stakeholder trust",
        ],
        decisionAuthority: "execute",
        analyticsLevel: "expert",
        technologyAccess: [
          "Executive dashboards with real-time KPIs",
          "Predictive analytics for strategic planning",
          "Stakeholder communication platforms",
          "Risk monitoring and early warning systems",
        ],
        dataCapabilities: [
          "Enterprise-wide performance metrics",
          "Market intelligence and competitive analysis",
          "ESG scoring and impact measurement",
          "Financial performance and risk indicators",
        ],
        complianceFrameworks: ["SOC 2", "ISO 27001", "GDPR", "Sarbanes-Oxley"],
        dashboardLayout: {
          layout: "executive",
          primaryWidgets: [
            "executive-summary",
            "key-metrics",
            "risk-alerts",
            "stakeholder-pulse",
          ],
          secondaryWidgets: [
            "market-intelligence",
            "esg-performance",
            "financial-overview",
          ],
          hiddenSections: ["technical-details", "operational-data"],
          customizations: {
            colorScheme: "executive-gold",
            density: "spacious",
            refreshInterval: 300000, // 5 minutes
          },
        },
        widgetPermissions: [
          {
            widgetId: "executive-summary",
            access: "full",
            customizations: ["time-range", "metrics-selection"],
          },
          {
            widgetId: "financial-data",
            access: "full",
            customizations: ["currency", "reporting-period"],
          },
          {
            widgetId: "operational-details",
            access: "restricted",
            customizations: [],
          },
        ],
        reportingCapabilities: [
          {
            reportType: "executive-summary",
            frequency: "daily",
            distribution: "schedule",
            dataLevel: "summary",
          },
          {
            reportType: "board-report",
            frequency: "monthly",
            distribution: "share",
            dataLevel: "detailed",
          },
          {
            reportType: "esg-report",
            frequency: "quarterly",
            distribution: "share",
            dataLevel: "detailed",
          },
        ],
        communicationChannels: [
          "executive-alerts",
          "board-communications",
          "stakeholder-updates",
        ],
        stakeholderGroups: [
          "board-of-directors",
          "investors",
          "regulators",
          "media",
        ],
        escalationPaths: [
          "board-chair",
          "lead-independent-director",
          "audit-committee",
        ],
      },

      {
        id: "supply-chain-executive",
        title: "Chief Supply Chain Officer",
        subtitle: "Supply Chain Leadership",
        description:
          "End-to-end supply chain strategy, supplier relationships, and operational excellence",
        category: "executive",
        organizationType: "Supply Chain Executive",
        systemRole: "business",
        keyResponsibilities: [
          "Global supply chain strategy and optimization",
          "Supplier relationship management and development",
          "Supply chain risk assessment and mitigation",
          "Sustainability and ESG integration",
          "Technology adoption and digital transformation",
        ],
        primaryGoals: [
          "Optimize supply chain efficiency and reduce costs",
          "Ensure supplier compliance and ethical sourcing",
          "Build resilient and sustainable supply networks",
          "Leverage technology for competitive advantage",
        ],
        decisionAuthority: "execute",
        analyticsLevel: "expert",
        technologyAccess: [
          "AI-powered demand forecasting and planning",
          "Supplier performance analytics and scorecards",
          "Real-time supply chain visibility platforms",
          "Blockchain verification and traceability systems",
        ],
        dataCapabilities: [
          "End-to-end supply chain analytics",
          "Supplier risk and performance metrics",
          "Cost optimization and efficiency analysis",
          "Sustainability and ESG impact measurement",
        ],
        complianceFrameworks: ["ISO 14001", "SA8000", "CTPAT", "AEO"],
        dashboardLayout: {
          layout: "operational",
          primaryWidgets: [
            "supply-chain-overview",
            "supplier-performance",
            "risk-monitor",
            "cost-analytics",
          ],
          secondaryWidgets: [
            "sustainability-metrics",
            "logistics-tracking",
            "demand-forecast",
          ],
          hiddenSections: ["financial-details", "hr-metrics"],
          customizations: {
            colorScheme: "supply-chain-blue",
            density: "comfortable",
            refreshInterval: 60000, // 1 minute
          },
        },
        widgetPermissions: [
          {
            widgetId: "supplier-data",
            access: "full",
            customizations: ["region-filter", "category-filter"],
          },
          {
            widgetId: "cost-analysis",
            access: "full",
            customizations: ["currency", "cost-center"],
          },
          {
            widgetId: "employee-data",
            access: "read-only",
            customizations: [],
          },
        ],
        reportingCapabilities: [
          {
            reportType: "supply-chain-dashboard",
            frequency: "real-time",
            distribution: "view-only",
            dataLevel: "detailed",
          },
          {
            reportType: "supplier-scorecard",
            frequency: "monthly",
            distribution: "share",
            dataLevel: "detailed",
          },
          {
            reportType: "sustainability-report",
            frequency: "quarterly",
            distribution: "share",
            dataLevel: "summary",
          },
        ],
        communicationChannels: [
          "supply-chain-alerts",
          "supplier-communications",
          "operations-updates",
        ],
        stakeholderGroups: [
          "suppliers",
          "logistics-partners",
          "procurement-team",
          "operations-managers",
        ],
        escalationPaths: ["ceo", "coo", "risk-committee"],
      },

      {
        id: "compliance-officer",
        title: "Chief Compliance Officer",
        subtitle: "Regulatory & Compliance",
        description:
          "Ensure organizational compliance with regulations, policies, and ethical standards",
        category: "governance",
        organizationType: "Compliance & Governance",
        systemRole: "compliance",
        keyResponsibilities: [
          "Regulatory compliance monitoring and reporting",
          "Policy development and implementation",
          "Audit coordination and remediation",
          "Training and awareness programs",
          "Incident investigation and response",
        ],
        primaryGoals: [
          "Maintain 100% regulatory compliance",
          "Minimize compliance risks and violations",
          "Establish robust governance frameworks",
          "Ensure ethical business practices",
        ],
        decisionAuthority: "approve",
        analyticsLevel: "advanced",
        technologyAccess: [
          "Automated compliance monitoring systems",
          "Regulatory change management platforms",
          "Audit trail and documentation systems",
          "Risk assessment and reporting tools",
        ],
        dataCapabilities: [
          "Compliance status and gap analysis",
          "Regulatory requirement tracking",
          "Audit findings and remediation progress",
          "Training completion and effectiveness metrics",
        ],
        complianceFrameworks: ["SOX", "GDPR", "CCPA", "HIPAA", "PCI DSS"],
        dashboardLayout: {
          layout: "analytical",
          primaryWidgets: [
            "compliance-status",
            "regulatory-alerts",
            "audit-tracker",
            "policy-manager",
          ],
          secondaryWidgets: [
            "training-metrics",
            "incident-log",
            "vendor-compliance",
          ],
          hiddenSections: ["operational-metrics", "financial-details"],
          customizations: {
            colorScheme: "compliance-green",
            density: "compact",
            refreshInterval: 300000, // 5 minutes
          },
        },
        widgetPermissions: [
          {
            widgetId: "compliance-data",
            access: "full",
            customizations: ["framework-filter", "status-filter"],
          },
          {
            widgetId: "audit-reports",
            access: "full",
            customizations: ["date-range", "auditor-filter"],
          },
          {
            widgetId: "operational-data",
            access: "read-only",
            customizations: [],
          },
        ],
        reportingCapabilities: [
          {
            reportType: "compliance-dashboard",
            frequency: "daily",
            distribution: "view-only",
            dataLevel: "detailed",
          },
          {
            reportType: "regulatory-report",
            frequency: "monthly",
            distribution: "share",
            dataLevel: "detailed",
          },
          {
            reportType: "audit-summary",
            frequency: "quarterly",
            distribution: "download",
            dataLevel: "summary",
          },
        ],
        communicationChannels: [
          "compliance-alerts",
          "regulatory-updates",
          "audit-notifications",
        ],
        stakeholderGroups: [
          "audit-committee",
          "legal-team",
          "risk-management",
          "business-units",
        ],
        escalationPaths: ["ceo", "audit-committee", "general-counsel"],
      },

      {
        id: "government-regulator",
        title: "Government Regulatory Officer",
        subtitle: "Public Sector Oversight",
        description:
          "Enforce regulations, conduct investigations, and ensure public interest protection",
        category: "governance",
        organizationType: "Government Agency",
        systemRole: "government",
        keyResponsibilities: [
          "Regulatory enforcement and investigation",
          "Policy development and implementation",
          "Stakeholder engagement and consultation",
          "Public interest protection",
          "Cross-border coordination and cooperation",
        ],
        primaryGoals: [
          "Protect public interest and consumer rights",
          "Ensure fair and competitive markets",
          "Maintain regulatory effectiveness",
          "Promote international cooperation",
        ],
        decisionAuthority: "execute",
        analyticsLevel: "advanced",
        technologyAccess: [
          "Government regulatory databases",
          "Investigation and case management systems",
          "Public consultation and feedback platforms",
          "International cooperation networks",
        ],
        dataCapabilities: [
          "Market surveillance and monitoring",
          "Violation detection and analysis",
          "Policy impact assessment",
          "Cross-jurisdictional intelligence",
        ],
        complianceFrameworks: [
          "Administrative Law",
          "International Treaties",
          "Public Interest Standards",
        ],
        dashboardLayout: {
          layout: "investigative",
          primaryWidgets: [
            "enforcement-actions",
            "investigation-tracker",
            "market-surveillance",
            "policy-impact",
          ],
          secondaryWidgets: [
            "stakeholder-feedback",
            "international-cooperation",
            "public-consultations",
          ],
          hiddenSections: ["commercial-data", "proprietary-information"],
          customizations: {
            colorScheme: "government-purple",
            density: "comfortable",
            refreshInterval: 180000, // 3 minutes
          },
        },
        widgetPermissions: [
          {
            widgetId: "enforcement-data",
            access: "full",
            customizations: ["jurisdiction-filter", "case-type"],
          },
          {
            widgetId: "investigation-files",
            access: "full",
            customizations: ["classification-level", "date-range"],
          },
          {
            widgetId: "commercial-data",
            access: "restricted",
            customizations: [],
          },
        ],
        reportingCapabilities: [
          {
            reportType: "enforcement-dashboard",
            frequency: "daily",
            distribution: "view-only",
            dataLevel: "detailed",
          },
          {
            reportType: "regulatory-report",
            frequency: "monthly",
            distribution: "share",
            dataLevel: "summary",
          },
          {
            reportType: "annual-report",
            frequency: "quarterly",
            distribution: "share",
            dataLevel: "detailed",
          },
        ],
        communicationChannels: [
          "enforcement-alerts",
          "policy-updates",
          "international-coordination",
        ],
        stakeholderGroups: [
          "regulated-entities",
          "international-regulators",
          "government-agencies",
          "public",
        ],
        escalationPaths: ["department-head", "minister", "cabinet"],
      },

      {
        id: "ngo-analyst",
        title: "NGO Human Rights Analyst",
        subtitle: "Human Rights & Advocacy",
        description:
          "Monitor human rights violations, conduct investigations, and advocate for worker protection",
        category: "oversight",
        organizationType: "Non-Governmental Organization",
        systemRole: "ngo",
        keyResponsibilities: [
          "Human rights monitoring and documentation",
          "Investigation of labor violations",
          "Advocacy campaign development",
          "Stakeholder engagement and coalition building",
          "Public awareness and education",
        ],
        primaryGoals: [
          "Protect and promote human rights",
          "Expose and address labor violations",
          "Advocate for policy and regulatory changes",
          "Build awareness and public support",
        ],
        decisionAuthority: "recommend",
        analyticsLevel: "intermediate",
        technologyAccess: [
          "Anonymous reporting and whistleblower systems",
          "Investigation and case management tools",
          "Advocacy campaign management platforms",
          "Secure communication and collaboration tools",
        ],
        dataCapabilities: [
          "Human rights violation tracking",
          "Investigation evidence management",
          "Impact measurement and reporting",
          "Campaign effectiveness analytics",
        ],
        complianceFrameworks: [
          "UN Global Compact",
          "ILO Conventions",
          "UNGP",
          "OECD Guidelines",
        ],
        dashboardLayout: {
          layout: "investigative",
          primaryWidgets: [
            "violation-tracker",
            "investigation-board",
            "campaign-manager",
            "impact-metrics",
          ],
          secondaryWidgets: [
            "whistleblower-portal",
            "coalition-network",
            "media-coverage",
          ],
          hiddenSections: ["commercial-data", "financial-details"],
          customizations: {
            colorScheme: "advocacy-orange",
            density: "comfortable",
            refreshInterval: 300000, // 5 minutes
          },
        },
        widgetPermissions: [
          {
            widgetId: "violation-data",
            access: "full",
            customizations: ["region-filter", "violation-type"],
          },
          {
            widgetId: "investigation-tools",
            access: "full",
            customizations: ["evidence-type", "priority-level"],
          },
          {
            widgetId: "corporate-data",
            access: "read-only",
            customizations: [],
          },
        ],
        reportingCapabilities: [
          {
            reportType: "violation-report",
            frequency: "weekly",
            distribution: "share",
            dataLevel: "detailed",
          },
          {
            reportType: "campaign-impact",
            frequency: "monthly",
            distribution: "download",
            dataLevel: "summary",
          },
          {
            reportType: "annual-assessment",
            frequency: "quarterly",
            distribution: "share",
            dataLevel: "detailed",
          },
        ],
        communicationChannels: [
          "violation-alerts",
          "campaign-updates",
          "coalition-communications",
        ],
        stakeholderGroups: [
          "affected-workers",
          "partner-ngos",
          "media",
          "policymakers",
        ],
        escalationPaths: [
          "executive-director",
          "board-chair",
          "international-partners",
        ],
      },

      {
        id: "platform-admin",
        title: "Platform Administrator",
        subtitle: "System Management",
        description:
          "Manage platform infrastructure, security, and technical operations",
        category: "technical",
        organizationType: "Platform Engineering",
        systemRole: "superadmin",
        keyResponsibilities: [
          "Platform infrastructure management",
          "System security and access control",
          "Performance monitoring and optimization",
          "User account and permission management",
          "Technical support and troubleshooting",
        ],
        primaryGoals: [
          "Ensure platform availability and performance",
          "Maintain security and data protection",
          "Optimize system resources and costs",
          "Provide excellent user experience",
        ],
        decisionAuthority: "execute",
        analyticsLevel: "advanced",
        technologyAccess: [
          "System administration and monitoring tools",
          "Security management and access control systems",
          "Performance analytics and optimization platforms",
          "Infrastructure automation and deployment tools",
        ],
        dataCapabilities: [
          "System performance and availability metrics",
          "Security incident and threat analysis",
          "User activity and engagement analytics",
          "Infrastructure cost and resource utilization",
        ],
        complianceFrameworks: [
          "ISO 27001",
          "SOC 2",
          "Cloud Security Standards",
          "ITIL",
        ],
        dashboardLayout: {
          layout: "operational",
          primaryWidgets: [
            "system-health",
            "security-monitor",
            "user-analytics",
            "performance-metrics",
          ],
          secondaryWidgets: [
            "cost-optimization",
            "backup-status",
            "deployment-pipeline",
          ],
          hiddenSections: ["business-metrics", "compliance-data"],
          customizations: {
            colorScheme: "technical-red",
            density: "compact",
            refreshInterval: 30000, // 30 seconds
          },
        },
        widgetPermissions: [
          {
            widgetId: "system-data",
            access: "full",
            customizations: ["environment-filter", "service-filter"],
          },
          {
            widgetId: "user-management",
            access: "full",
            customizations: ["role-filter", "status-filter"],
          },
          {
            widgetId: "business-data",
            access: "restricted",
            customizations: [],
          },
        ],
        reportingCapabilities: [
          {
            reportType: "system-health",
            frequency: "real-time",
            distribution: "view-only",
            dataLevel: "raw",
          },
          {
            reportType: "security-report",
            frequency: "daily",
            distribution: "download",
            dataLevel: "detailed",
          },
          {
            reportType: "performance-summary",
            frequency: "weekly",
            distribution: "share",
            dataLevel: "summary",
          },
        ],
        communicationChannels: [
          "system-alerts",
          "security-notifications",
          "maintenance-updates",
        ],
        stakeholderGroups: [
          "development-team",
          "security-team",
          "platform-users",
          "management",
        ],
        escalationPaths: ["cto", "engineering-director", "security-officer"],
      },
    ];

    archetypes.forEach((archetype) => {
      this.archetypeProfiles.set(archetype.id, archetype);
    });
  }

  getArchetypeProfile(archetypeId: string): UserArchetypeProfile | null {
    return this.archetypeProfiles.get(archetypeId) || null;
  }

  getAllArchetypes(): UserArchetypeProfile[] {
    return Array.from(this.archetypeProfiles.values());
  }

  getArchetypesByCategory(category: string): UserArchetypeProfile[] {
    return Array.from(this.archetypeProfiles.values()).filter(
      (archetype) => archetype.category === category,
    );
  }

  getArchetypesBySystemRole(systemRole: string): UserArchetypeProfile[] {
    return Array.from(this.archetypeProfiles.values()).filter(
      (archetype) => archetype.systemRole === systemRole,
    );
  }

  getDashboardConfig(archetypeId: string): DashboardLayoutConfig | null {
    const archetype = this.getArchetypeProfile(archetypeId);
    return archetype?.dashboardLayout || null;
  }

  getWidgetPermissions(archetypeId: string): WidgetPermission[] {
    const archetype = this.getArchetypeProfile(archetypeId);
    return archetype?.widgetPermissions || [];
  }

  getReportingCapabilities(archetypeId: string): ReportingCapability[] {
    const archetype = this.getArchetypeProfile(archetypeId);
    return archetype?.reportingCapabilities || [];
  }

  generateArchetypeInsights(archetypeId: string): ArchetypeBasedInsight[] {
    const archetype = this.getArchetypeProfile(archetypeId);
    if (!archetype) return [];

    // Generate contextual insights based on archetype
    const insights: ArchetypeBasedInsight[] = [];

    if (archetype.category === "executive") {
      insights.push({
        id: `insight-${archetypeId}-strategic`,
        archetypeId,
        type: "opportunity",
        title: "Strategic ESG Investment Opportunity",
        description:
          "Market analysis shows 23% ROI potential from ESG initiatives in your sector",
        priority: "high",
        actionable: true,
        relatedMetrics: [
          "esg-score",
          "financial-performance",
          "stakeholder-satisfaction",
        ],
        suggestedActions: [
          "Develop comprehensive ESG strategy",
          "Engage with sustainability consultants",
          "Set measurable ESG targets and KPIs",
        ],
        timeline: "6-12 months implementation",
        stakeholders: [
          "board-of-directors",
          "investors",
          "sustainability-team",
        ],
      });
    }

    if (archetype.category === "governance") {
      insights.push({
        id: `insight-${archetypeId}-compliance`,
        archetypeId,
        type: "alert",
        title: "Upcoming Regulatory Changes",
        description:
          "New EU AI Act requirements will affect your compliance framework in Q2 2025",
        priority: "critical",
        actionable: true,
        relatedMetrics: [
          "compliance-score",
          "audit-findings",
          "regulatory-changes",
        ],
        suggestedActions: [
          "Review current AI systems for compliance",
          "Update policies and procedures",
          "Schedule compliance assessment",
        ],
        timeline: "3-6 months preparation needed",
        stakeholders: ["legal-team", "it-department", "audit-committee"],
      });
    }

    return insights;
  }

  getPersonalizedWelcomeMessage(archetypeId: string): string {
    const archetype = this.getArchetypeProfile(archetypeId);
    if (!archetype) return "Welcome to Guardian-IO";

    const messages = {
      executive:
        "Welcome to your executive command center. Monitor global operations and strategic KPIs.",
      governance:
        "Welcome to your compliance control center. Ensure regulatory adherence and risk management.",
      oversight:
        "Welcome to your advocacy platform. Monitor violations and drive positive change.",
      operational:
        "Welcome to your operations hub. Optimize processes and manage day-to-day activities.",
      technical:
        "Welcome to your technical dashboard. Monitor systems and manage platform infrastructure.",
    };

    return messages[archetype.category] || "Welcome to Guardian-IO";
  }

  getContextualHelpContent(archetypeId: string): string[] {
    const archetype = this.getArchetypeProfile(archetypeId);
    if (!archetype) return [];

    const helpContent = {
      ceo: [
        "Use the Executive Summary widget for board presentations",
        "Monitor ESG scores for stakeholder reporting",
        "Set up alerts for critical risk indicators",
        "Access predictive analytics for strategic planning",
      ],
      "compliance-officer": [
        "Configure automated compliance monitoring",
        "Set up regulatory change notifications",
        "Use audit trail features for documentation",
        "Generate compliance reports for regulators",
      ],
      "ngo-analyst": [
        "Set up anonymous reporting channels",
        "Use investigation tools for case management",
        "Track campaign impact and effectiveness",
        "Collaborate with partner organizations",
      ],
    };

    return helpContent[archetypeId] || [];
  }
}

export const userArchetypeService = UserArchetypeService.getInstance();
export default userArchetypeService;
