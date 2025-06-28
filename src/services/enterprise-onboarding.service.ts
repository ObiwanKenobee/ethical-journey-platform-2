export interface CompanyProfile {
  id?: string;
  industry: string;
  revenue: number;
  employees: number;
  suppliers: number;
  regions: number;
  complianceFrameworks: string[];
  currentTools: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
}

export interface ROIAssumptions {
  auditCostPerSupplier: number;
  auditFrequency: number;
  complianceStaffCost: number;
  averageIncidentCost: number;
  incidentProbability: number;
  premiumBrandingUplift: number;
  discountRate: number;
  timeHorizon: number;
}

export interface ROICalculation {
  companyProfileId?: string;
  roi: number;
  netBenefit: number;
  totalCostSavings: number;
  totalRevenueBenefit: number;
  totalRiskAvoidance: number;
  paybackPeriod: number;
  assumptions: ROIAssumptions;
  createdAt: string;
}

export interface DemoRequest {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  phone?: string;
  employees?: string;
  interests: string[];
  message?: string;
  preferredTime?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ipAddress?: string;
  userAgent?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  status?: "submitted" | "contacted" | "scheduled" | "completed" | "cancelled";
  createdAt?: string;
}

class EnterpriseOnboardingService {
  // Company Profile methods
  async createCompanyProfile(
    profile: CompanyProfile,
  ): Promise<{ data?: CompanyProfile; error?: Error }> {
    try {
      // In a real implementation, this would save to the database
      const createdProfile = {
        ...profile,
        id: `cp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      return { data: createdProfile };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // ROI Calculation methods
  calculateROI(
    profile: CompanyProfile,
    assumptions: ROIAssumptions,
  ): ROICalculation {
    const {
      auditCostPerSupplier,
      auditFrequency,
      complianceStaffCost,
      averageIncidentCost,
      incidentProbability,
      premiumBrandingUplift,
      discountRate,
      timeHorizon,
    } = assumptions;

    // Calculate annual costs
    const annualAuditCosts =
      profile.suppliers * auditCostPerSupplier * auditFrequency;
    const annualComplianceCosts = complianceStaffCost * 12;
    const totalAnnualCosts = annualAuditCosts + annualComplianceCosts;

    // Calculate cost savings (50% reduction in audit costs, 30% in compliance costs)
    const annualCostSavings =
      annualAuditCosts * 0.5 + annualComplianceCosts * 0.3;

    // Calculate risk avoidance
    const expectedAnnualIncidentCost =
      averageIncidentCost * incidentProbability;
    const annualRiskAvoidance = expectedAnnualIncidentCost * 0.7; // 70% risk reduction

    // Calculate revenue benefits
    const annualRevenueBenefit = profile.revenue * premiumBrandingUplift;

    // Calculate NPV over time horizon
    let totalCostSavings = 0;
    let totalRevenueBenefit = 0;
    let totalRiskAvoidance = 0;

    for (let year = 1; year <= timeHorizon; year++) {
      const discountFactor = Math.pow(1 + discountRate, year);
      totalCostSavings += annualCostSavings / discountFactor;
      totalRevenueBenefit += annualRevenueBenefit / discountFactor;
      totalRiskAvoidance += annualRiskAvoidance / discountFactor;
    }

    const totalBenefits =
      totalCostSavings + totalRevenueBenefit + totalRiskAvoidance;
    const implementationCost = this.getImplementationCost(profile);
    const netBenefit = totalBenefits - implementationCost;
    const roi = (netBenefit / implementationCost) * 100;

    // Calculate payback period
    const annualBenefits =
      annualCostSavings + annualRevenueBenefit + annualRiskAvoidance;
    const paybackPeriod = implementationCost / annualBenefits;

    return {
      roi,
      netBenefit,
      totalCostSavings,
      totalRevenueBenefit,
      totalRiskAvoidance,
      paybackPeriod,
      assumptions,
      createdAt: new Date().toISOString(),
    };
  }

  private getImplementationCost(profile: CompanyProfile): number {
    // Base implementation cost
    let baseCost = 50000;

    // Scale by company size
    if (profile.employees > 5000) baseCost *= 3;
    else if (profile.employees > 1000) baseCost *= 2;
    else if (profile.employees > 200) baseCost *= 1.5;

    // Scale by supplier count
    baseCost += profile.suppliers * 100;

    // Scale by regions
    baseCost += profile.regions * 10000;

    return baseCost;
  }

  async saveROICalculation(
    calculation: ROICalculation,
  ): Promise<{ data?: ROICalculation; error?: Error }> {
    try {
      // In a real implementation, this would save to the database
      const savedCalculation = {
        ...calculation,
        id: `roi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      return { data: savedCalculation };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // Demo Request methods
  async createDemoRequest(
    request: DemoRequest,
  ): Promise<{ data?: DemoRequest; error?: Error }> {
    try {
      // Calculate priority based on company size and industry
      const priority = this.calculateDemoPriority(request);

      const createdRequest = {
        ...request,
        id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        priority,
        status: "submitted" as const,
        createdAt: new Date().toISOString(),
      };

      return { data: createdRequest };
    } catch (error) {
      return { error: error as Error };
    }
  }

  private calculateDemoPriority(
    request: DemoRequest,
  ): "low" | "medium" | "high" | "urgent" {
    let score = 0;

    // Company size scoring
    if (request.employees === "5000+") score += 4;
    else if (request.employees === "1001-5000") score += 3;
    else if (request.employees === "201-1000") score += 2;
    else if (request.employees === "51-200") score += 1;

    // Title scoring (C-level, VP, Director get higher priority)
    const title = request.title.toLowerCase();
    if (title.includes("ceo") || title.includes("cto") || title.includes("cfo"))
      score += 3;
    else if (title.includes("vp") || title.includes("vice president"))
      score += 2;
    else if (title.includes("director")) score += 1;

    // Interest scoring
    if (request.interests.includes("enterprise")) score += 2;
    if (request.interests.includes("integration")) score += 1;

    // Return priority based on score
    if (score >= 7) return "urgent";
    else if (score >= 5) return "high";
    else if (score >= 3) return "medium";
    else return "low";
  }

  // Industry Recommendations
  getIndustryRecommendations(industry: string): any {
    const recommendations = {
      "fashion-retail": {
        keyRisks: [
          "labor conditions",
          "environmental impact",
          "sourcing transparency",
        ],
        priorityFeatures: [
          "supplier auditing",
          "traceability",
          "sustainability tracking",
        ],
        expectedROI: "15-25%",
        implementationTime: "3-6 months",
      },
      electronics: {
        keyRisks: [
          "conflict minerals",
          "labor practices",
          "environmental compliance",
        ],
        priorityFeatures: [
          "mineral tracking",
          "supplier verification",
          "compliance monitoring",
        ],
        expectedROI: "20-30%",
        implementationTime: "4-8 months",
      },
      automotive: {
        keyRisks: [
          "supply chain disruption",
          "quality control",
          "regulatory compliance",
        ],
        priorityFeatures: [
          "tier 2+ visibility",
          "risk monitoring",
          "quality assurance",
        ],
        expectedROI: "25-35%",
        implementationTime: "6-12 months",
      },
      "food-beverage": {
        keyRisks: ["food safety", "agricultural practices", "sustainability"],
        priorityFeatures: [
          "farm-to-table tracking",
          "quality monitoring",
          "certification management",
        ],
        expectedROI: "18-28%",
        implementationTime: "3-9 months",
      },
      pharmaceuticals: {
        keyRisks: [
          "regulatory compliance",
          "quality control",
          "supply chain integrity",
        ],
        priorityFeatures: [
          "GMP compliance",
          "batch tracking",
          "regulatory reporting",
        ],
        expectedROI: "22-32%",
        implementationTime: "6-18 months",
      },
      manufacturing: {
        keyRisks: [
          "operational efficiency",
          "quality control",
          "sustainability",
        ],
        priorityFeatures: [
          "process optimization",
          "quality tracking",
          "environmental monitoring",
        ],
        expectedROI: "20-30%",
        implementationTime: "4-10 months",
      },
    };

    return recommendations[industry as keyof typeof recommendations] || null;
  }

  // Onboarding Progress
  async getOnboardingProgress(
    companyProfileId: string,
  ): Promise<{ data?: any; error?: Error }> {
    try {
      // In a real implementation, this would fetch from the database
      const progress = {
        companyProfileId,
        currentStep: "roi-calculation",
        completedSteps: ["company-profile"],
        totalSteps: [
          "company-profile",
          "roi-calculation",
          "demo-request",
          "implementation-plan",
        ],
        progressPercentage: 25,
      };

      return { data: progress };
    } catch (error) {
      return { error: error as Error };
    }
  }
}

export const enterpriseOnboardingService = new EnterpriseOnboardingService();
