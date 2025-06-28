import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Download,
  Mail,
  Phone,
  Building2,
  Users,
  Globe,
  Zap,
  Database,
  ArrowRight,
  Target,
  PieChart,
  LineChart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  useResponsive,
  useResponsiveForm,
  useResponsiveLayout,
} from "@/hooks/useResponsive";

interface CompanyProfile {
  industry: string;
  revenue: number;
  employees: number;
  suppliers: number;
  regions: number;
  complianceFrameworks: string[];
  currentTools: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
}

interface ROICalculation {
  costSavings: {
    auditReduction: number;
    complianceAutomation: number;
    riskMitigation: number;
    supplierEfficiency: number;
    total: number;
  };
  riskAvoidance: {
    reputationalRisk: number;
    legalPenalties: number;
    supplierDisruption: number;
    operationalDowntime: number;
    total: number;
  };
  revenueImpact: {
    premiumBranding: number;
    newMarketAccess: number;
    customerRetention: number;
    supplierPartnerships: number;
    total: number;
  };
  implementation: {
    softwareCosts: number;
    professionalServices: number;
    training: number;
    integration: number;
    total: number;
  };
  totalBenefits: number;
  totalCosts: number;
  netBenefit: number;
  roi: number;
  paybackPeriod: number;
  npv: number;
}

const EnterpriseROICalculator = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    industry: "",
    revenue: 0,
    employees: 0,
    suppliers: 0,
    regions: 0,
    complianceFrameworks: [],
    currentTools: [],
    riskLevel: "medium",
  });

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    company: "",
    phone: "",
  });

  const [assumptions, setAssumptions] = useState({
    auditCostPerSupplier: 5000,
    auditFrequency: 2, // per year
    complianceStaffCost: 150000, // annual salary
    averageIncidentCost: 2000000,
    incidentProbability: 0.15, // 15% chance per year
    premiumBrandingUplift: 0.03, // 3% revenue increase
    discountRate: 0.1, // 10% for NPV calculation
    timeHorizon: 3, // years
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Industry-specific risk factors and cost multipliers
  const industryData = {
    "fashion-retail": {
      name: "Fashion & Retail",
      riskMultiplier: 1.8,
      complianceComplexity: "high",
      auditFrequency: 3,
      reputationalRisk: "critical",
    },
    electronics: {
      name: "Electronics & Technology",
      riskMultiplier: 1.6,
      complianceComplexity: "high",
      auditFrequency: 2,
      reputationalRisk: "high",
    },
    automotive: {
      name: "Automotive",
      riskMultiplier: 1.4,
      complianceComplexity: "medium",
      auditFrequency: 2,
      reputationalRisk: "medium",
    },
    "food-beverage": {
      name: "Food & Beverage",
      riskMultiplier: 1.3,
      complianceComplexity: "medium",
      auditFrequency: 3,
      reputationalRisk: "high",
    },
    manufacturing: {
      name: "Manufacturing",
      riskMultiplier: 1.5,
      complianceComplexity: "medium",
      auditFrequency: 2,
      reputationalRisk: "medium",
    },
    pharmaceutical: {
      name: "Pharmaceutical",
      riskMultiplier: 1.2,
      complianceComplexity: "critical",
      auditFrequency: 4,
      reputationalRisk: "critical",
    },
  };

  // Calculate comprehensive ROI
  const roiCalculation = useMemo((): ROICalculation => {
    const industry =
      industryData[companyProfile.industry as keyof typeof industryData];
    if (!industry) {
      return {
        costSavings: {
          auditReduction: 0,
          complianceAutomation: 0,
          riskMitigation: 0,
          supplierEfficiency: 0,
          total: 0,
        },
        riskAvoidance: {
          reputationalRisk: 0,
          legalPenalties: 0,
          supplierDisruption: 0,
          operationalDowntime: 0,
          total: 0,
        },
        revenueImpact: {
          premiumBranding: 0,
          newMarketAccess: 0,
          customerRetention: 0,
          supplierPartnerships: 0,
          total: 0,
        },
        implementation: {
          softwareCosts: 0,
          professionalServices: 0,
          training: 0,
          integration: 0,
          total: 0,
        },
        totalBenefits: 0,
        totalCosts: 0,
        netBenefit: 0,
        roi: 0,
        paybackPeriod: 0,
        npv: 0,
      };
    }

    // Cost Savings Calculations
    const auditReduction =
      companyProfile.suppliers * assumptions.auditCostPerSupplier * 0.6; // 60% reduction
    const complianceAutomation =
      assumptions.complianceStaffCost * 0.4 * companyProfile.regions; // 40% efficiency gain
    const riskMitigation =
      assumptions.averageIncidentCost * assumptions.incidentProbability * 0.7; // 70% risk reduction
    const supplierEfficiency = companyProfile.revenue * 0.02; // 2% efficiency gain on procurement

    const costSavings = {
      auditReduction,
      complianceAutomation,
      riskMitigation,
      supplierEfficiency,
      total:
        auditReduction +
        complianceAutomation +
        riskMitigation +
        supplierEfficiency,
    };

    // Risk Avoidance Calculations
    const reputationalRisk =
      companyProfile.revenue * 0.05 * industry.riskMultiplier * 0.8; // Avoid 80% of reputation damage
    const legalPenalties =
      Math.min(companyProfile.revenue * 0.02, 10000000) * 0.9; // Avoid 90% of penalties
    const supplierDisruption = companyProfile.revenue * 0.01 * 0.6; // Avoid 60% of disruption costs
    const operationalDowntime = companyProfile.revenue * 0.005 * 0.75; // Avoid 75% of downtime costs

    const riskAvoidance = {
      reputationalRisk,
      legalPenalties,
      supplierDisruption,
      operationalDowntime,
      total:
        reputationalRisk +
        legalPenalties +
        supplierDisruption +
        operationalDowntime,
    };

    // Revenue Impact Calculations
    const premiumBranding =
      companyProfile.revenue * assumptions.premiumBrandingUplift;
    const newMarketAccess = companyProfile.revenue * 0.015; // 1.5% new market access
    const customerRetention = companyProfile.revenue * 0.01; // 1% retention improvement
    const supplierPartnerships = companyProfile.suppliers * 50000; // $50K value per supplier relationship

    const revenueImpact = {
      premiumBranding,
      newMarketAccess,
      customerRetention,
      supplierPartnerships,
      total:
        premiumBranding +
        newMarketAccess +
        customerRetention +
        supplierPartnerships,
    };

    // Implementation Costs
    const baseSoftwareCost = Math.min(companyProfile.employees * 120, 2000000); // $120 per employee, capped
    const softwareCosts = baseSoftwareCost + companyProfile.suppliers * 10; // $10 per supplier
    const professionalServices = softwareCosts * 0.3; // 30% of software cost
    const training = companyProfile.employees * 500; // $500 per employee training
    const integration = Math.min(companyProfile.revenue * 0.001, 500000); // 0.1% of revenue, capped

    const implementation = {
      softwareCosts,
      professionalServices,
      training,
      integration,
      total: softwareCosts + professionalServices + training + integration,
    };

    // Calculate totals and metrics
    const totalBenefits =
      costSavings.total + riskAvoidance.total + revenueImpact.total;
    const totalCosts = implementation.total;
    const netBenefit = totalBenefits - totalCosts;
    const roi = totalCosts > 0 ? (netBenefit / totalCosts) * 100 : 0;
    const paybackPeriod =
      totalBenefits > 0 ? totalCosts / (totalBenefits / 12) : 0; // months

    // NPV calculation over 3 years
    const annualBenefit = totalBenefits / assumptions.timeHorizon;
    let npv = -totalCosts; // Initial investment
    for (let year = 1; year <= assumptions.timeHorizon; year++) {
      npv += annualBenefit / Math.pow(1 + assumptions.discountRate, year);
    }

    return {
      costSavings,
      riskAvoidance,
      revenueImpact,
      implementation,
      totalBenefits,
      totalCosts,
      netBenefit,
      roi,
      paybackPeriod,
      npv,
    };
  }, [companyProfile, assumptions]);

  const handleCalculate = async () => {
    setIsCalculating(true);

    // Simulate calculation time for better UX
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsCalculating(false);
    setShowResults(true);
    setCurrentStep(3);

    toast({
      title: "ROI Calculation Complete",
      description: "Your comprehensive ROI analysis is ready for review.",
    });
  };

  const handleGenerateReport = async () => {
    // In production, this would generate a PDF report
    toast({
      title: "Report Generated",
      description: "Your detailed ROI report has been sent to your email.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const steps = [
    {
      title: "Company Profile",
      description: "Tell us about your organization",
    },
    {
      title: "Current State",
      description: "Your current compliance setup",
    },
    {
      title: "Assumptions",
      description: "Customize calculation parameters",
    },
    {
      title: "ROI Results",
      description: "Your comprehensive analysis",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Enterprise ROI Calculator | Atlas Platform</title>
        <meta
          name="description"
          content="Calculate the return on investment for Atlas enterprise supply chain transparency platform with comprehensive analysis."
        />
        <meta
          name="keywords"
          content="ROI calculator, enterprise ROI, supply chain ROI, compliance cost savings, Atlas ROI"
        />
        <link
          rel="canonical"
          href="https://atlas.com/enterprise/roi-calculator"
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                ROI Calculator
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                Calculate Your Enterprise{" "}
                <span className="text-gradient">ROI</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover the financial impact of implementing Atlas for your
                enterprise supply chain transparency and compliance operations.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-xs mt-2 text-center max-w-20">
                      <div className="font-medium">{step.title}</div>
                      <div className="text-muted-foreground hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Progress
                value={(currentStep / (steps.length - 1)) * 100}
                className="h-2"
              />
            </div>
          </div>
        </section>

        {/* Calculator Form */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto">
              <Tabs value={currentStep.toString()} className="w-full">
                {/* Step 1: Company Profile */}
                <TabsContent value="0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        Company Profile
                      </CardTitle>
                      <CardDescription>
                        Help us understand your organization's scale and
                        industry context
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="industry">Industry</Label>
                          <Select
                            value={companyProfile.industry}
                            onValueChange={(value) =>
                              setCompanyProfile((prev) => ({
                                ...prev,
                                industry: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(industryData).map(
                                ([key, data]) => (
                                  <SelectItem key={key} value={key}>
                                    {data.name}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="revenue">Annual Revenue (USD)</Label>
                          <Input
                            type="number"
                            placeholder="1000000000"
                            value={companyProfile.revenue || ""}
                            onChange={(e) =>
                              setCompanyProfile((prev) => ({
                                ...prev,
                                revenue: Number(e.target.value),
                              }))
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="employees">Number of Employees</Label>
                          <Input
                            type="number"
                            placeholder="5000"
                            value={companyProfile.employees || ""}
                            onChange={(e) =>
                              setCompanyProfile((prev) => ({
                                ...prev,
                                employees: Number(e.target.value),
                              }))
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="suppliers">
                            Number of Active Suppliers
                          </Label>
                          <Input
                            type="number"
                            placeholder="500"
                            value={companyProfile.suppliers || ""}
                            onChange={(e) =>
                              setCompanyProfile((prev) => ({
                                ...prev,
                                suppliers: Number(e.target.value),
                              }))
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="regions">Geographic Regions</Label>
                          <Input
                            type="number"
                            placeholder="10"
                            value={companyProfile.regions || ""}
                            onChange={(e) =>
                              setCompanyProfile((prev) => ({
                                ...prev,
                                regions: Number(e.target.value),
                              }))
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="riskLevel">Current Risk Level</Label>
                          <Select
                            value={companyProfile.riskLevel}
                            onValueChange={(
                              value: "low" | "medium" | "high" | "critical",
                            ) =>
                              setCompanyProfile((prev) => ({
                                ...prev,
                                riskLevel: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low Risk</SelectItem>
                              <SelectItem value="medium">
                                Medium Risk
                              </SelectItem>
                              <SelectItem value="high">High Risk</SelectItem>
                              <SelectItem value="critical">
                                Critical Risk
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => setCurrentStep(1)}
                          disabled={
                            !companyProfile.industry || !companyProfile.revenue
                          }
                        >
                          Next: Current State
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 2: Current State */}
                <TabsContent value="1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Current Compliance Setup
                      </CardTitle>
                      <CardDescription>
                        Tell us about your existing compliance and supply chain
                        tools
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label>
                          Compliance Frameworks (select all that apply)
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {[
                            "ISO 14001",
                            "SA8000",
                            "WRAP",
                            "BSCI",
                            "Sedex",
                            "Fair Trade",
                            "OEKO-TEX",
                            "GOTS",
                            "GRS",
                            "Custom Framework",
                          ].map((framework) => (
                            <Button
                              key={framework}
                              variant={
                                companyProfile.complianceFrameworks.includes(
                                  framework,
                                )
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className="justify-start text-xs"
                              onClick={() => {
                                setCompanyProfile((prev) => ({
                                  ...prev,
                                  complianceFrameworks:
                                    prev.complianceFrameworks.includes(
                                      framework,
                                    )
                                      ? prev.complianceFrameworks.filter(
                                          (f) => f !== framework,
                                        )
                                      : [
                                          ...prev.complianceFrameworks,
                                          framework,
                                        ],
                                }));
                              }}
                            >
                              {framework}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Current Tools & Systems</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {[
                            "Excel Spreadsheets",
                            "ERP System",
                            "Supplier Portals",
                            "Audit Management",
                            "Risk Assessment Tools",
                            "Manual Processes",
                            "Third-party Platforms",
                            "Custom Solutions",
                            "No System",
                          ].map((tool) => (
                            <Button
                              key={tool}
                              variant={
                                companyProfile.currentTools.includes(tool)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className="justify-start text-xs"
                              onClick={() => {
                                setCompanyProfile((prev) => ({
                                  ...prev,
                                  currentTools: prev.currentTools.includes(tool)
                                    ? prev.currentTools.filter(
                                        (t) => t !== tool,
                                      )
                                    : [...prev.currentTools, tool],
                                }));
                              }}
                            >
                              {tool}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(0)}
                        >
                          Previous
                        </Button>
                        <Button onClick={() => setCurrentStep(2)}>
                          Next: Assumptions
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 3: Assumptions */}
                <TabsContent value="2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-primary" />
                        Calculation Assumptions
                      </CardTitle>
                      <CardDescription>
                        Customize the parameters for your ROI calculation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>
                            Audit Cost per Supplier: $
                            {assumptions.auditCostPerSupplier.toLocaleString()}
                          </Label>
                          <Slider
                            value={[assumptions.auditCostPerSupplier]}
                            onValueChange={([value]) =>
                              setAssumptions((prev) => ({
                                ...prev,
                                auditCostPerSupplier: value,
                              }))
                            }
                            min={1000}
                            max={20000}
                            step={500}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>
                            Compliance Staff Annual Cost: $
                            {assumptions.complianceStaffCost.toLocaleString()}
                          </Label>
                          <Slider
                            value={[assumptions.complianceStaffCost]}
                            onValueChange={([value]) =>
                              setAssumptions((prev) => ({
                                ...prev,
                                complianceStaffCost: value,
                              }))
                            }
                            min={80000}
                            max={300000}
                            step={10000}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>
                            Average Incident Cost: $
                            {(
                              assumptions.averageIncidentCost / 1000000
                            ).toFixed(1)}
                            M
                          </Label>
                          <Slider
                            value={[assumptions.averageIncidentCost]}
                            onValueChange={([value]) =>
                              setAssumptions((prev) => ({
                                ...prev,
                                averageIncidentCost: value,
                              }))
                            }
                            min={500000}
                            max={10000000}
                            step={250000}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>
                            Incident Probability:{" "}
                            {formatPercentage(
                              assumptions.incidentProbability * 100,
                            )}
                          </Label>
                          <Slider
                            value={[assumptions.incidentProbability * 100]}
                            onValueChange={([value]) =>
                              setAssumptions((prev) => ({
                                ...prev,
                                incidentProbability: value / 100,
                              }))
                            }
                            min={5}
                            max={50}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={handleCalculate}
                          disabled={isCalculating}
                        >
                          {isCalculating ? (
                            <>
                              <Calculator className="h-4 w-4 mr-2 animate-spin" />
                              Calculating...
                            </>
                          ) : (
                            <>
                              Calculate ROI
                              <TrendingUp className="h-4 w-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 4: Results */}
                <TabsContent value="3">
                  {showResults && (
                    <div className="space-y-6">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-primary">
                              {formatPercentage(roiCalculation.roi)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Return on Investment
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {formatCurrency(roiCalculation.netBenefit)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Net Benefit (3 years)
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {roiCalculation.paybackPeriod.toFixed(1)} months
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Payback Period
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {formatCurrency(roiCalculation.npv)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Net Present Value
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Detailed Breakdown */}
                      <Tabs defaultValue="benefits" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="benefits">Benefits</TabsTrigger>
                          <TabsTrigger value="costs">Costs</TabsTrigger>
                          <TabsTrigger value="analysis">Analysis</TabsTrigger>
                          <TabsTrigger value="action">Next Steps</TabsTrigger>
                        </TabsList>

                        <TabsContent value="benefits" className="space-y-4">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Cost Savings
                                </CardTitle>
                                <CardDescription>
                                  {formatCurrency(
                                    roiCalculation.costSavings.total,
                                  )}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Audit Reduction
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.costSavings.auditReduction,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Compliance Automation
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.costSavings
                                        .complianceAutomation,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Risk Mitigation
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.costSavings.riskMitigation,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Supplier Efficiency
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.costSavings
                                        .supplierEfficiency,
                                    )}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Risk Avoidance
                                </CardTitle>
                                <CardDescription>
                                  {formatCurrency(
                                    roiCalculation.riskAvoidance.total,
                                  )}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Reputational Risk
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.riskAvoidance
                                        .reputationalRisk,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Legal Penalties
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.riskAvoidance
                                        .legalPenalties,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Supplier Disruption
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.riskAvoidance
                                        .supplierDisruption,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Operational Downtime
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.riskAvoidance
                                        .operationalDowntime,
                                    )}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Revenue Impact
                                </CardTitle>
                                <CardDescription>
                                  {formatCurrency(
                                    roiCalculation.revenueImpact.total,
                                  )}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Premium Branding
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.revenueImpact
                                        .premiumBranding,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    New Market Access
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.revenueImpact
                                        .newMarketAccess,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Customer Retention
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.revenueImpact
                                        .customerRetention,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    Supplier Partnerships
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(
                                      roiCalculation.revenueImpact
                                        .supplierPartnerships,
                                    )}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>

                        <TabsContent value="costs">
                          <Card>
                            <CardHeader>
                              <CardTitle>Implementation Costs</CardTitle>
                              <CardDescription>
                                Total:{" "}
                                {formatCurrency(
                                  roiCalculation.implementation.total,
                                )}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                  <div className="text-lg font-semibold">
                                    {formatCurrency(
                                      roiCalculation.implementation
                                        .softwareCosts,
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Software Licenses
                                  </div>
                                </div>
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                  <div className="text-lg font-semibold">
                                    {formatCurrency(
                                      roiCalculation.implementation
                                        .professionalServices,
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Professional Services
                                  </div>
                                </div>
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                  <div className="text-lg font-semibold">
                                    {formatCurrency(
                                      roiCalculation.implementation.training,
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Training & Change Mgmt
                                  </div>
                                </div>
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                  <div className="text-lg font-semibold">
                                    {formatCurrency(
                                      roiCalculation.implementation.integration,
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    System Integration
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        <TabsContent value="analysis">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle>Risk Assessment</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span>Implementation Risk</span>
                                    <Badge variant="secondary">Low</Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Adoption Risk</span>
                                    <Badge variant="secondary">Medium</Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Technology Risk</span>
                                    <Badge variant="secondary">Low</Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>ROI Confidence</span>
                                    <Badge className="bg-green-100 text-green-800">
                                      High
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle>Key Success Factors</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2">
                                  <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">
                                      Executive sponsorship
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">
                                      Cross-functional team
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">
                                      Phased implementation
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">
                                      Change management
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">
                                      Supplier engagement
                                    </span>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>

                        <TabsContent value="action">
                          <div className="space-y-6">
                            <Card>
                              <CardHeader>
                                <CardTitle>Recommended Next Steps</CardTitle>
                                <CardDescription>
                                  Based on your ROI analysis, here's your
                                  recommended path forward
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="flex gap-4 p-4 bg-primary/5 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                                      1
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">
                                        Schedule Executive Demo
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        Present ROI findings to key stakeholders
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex gap-4 p-4 bg-primary/5 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                                      2
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">
                                        Pilot Program
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        Start with a focused supplier segment
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex gap-4 p-4 bg-primary/5 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                                      3
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">
                                        Implementation Planning
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        Develop detailed rollout strategy
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Contact Form */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Get Your Detailed Report</CardTitle>
                                <CardDescription>
                                  Receive a comprehensive PDF report with your
                                  ROI analysis and implementation roadmap
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="firstName">
                                      First Name
                                    </Label>
                                    <Input
                                      id="firstName"
                                      value={contact.firstName}
                                      onChange={(e) =>
                                        setContact((prev) => ({
                                          ...prev,
                                          firstName: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                      id="lastName"
                                      value={contact.lastName}
                                      onChange={(e) =>
                                        setContact((prev) => ({
                                          ...prev,
                                          lastName: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      value={contact.email}
                                      onChange={(e) =>
                                        setContact((prev) => ({
                                          ...prev,
                                          email: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="title">Job Title</Label>
                                    <Input
                                      id="title"
                                      value={contact.title}
                                      onChange={(e) =>
                                        setContact((prev) => ({
                                          ...prev,
                                          title: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="md:col-span-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                      id="company"
                                      value={contact.company}
                                      onChange={(e) =>
                                        setContact((prev) => ({
                                          ...prev,
                                          company: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                  <Button
                                    onClick={handleGenerateReport}
                                    className="flex-1"
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Generate Detailed Report
                                  </Button>
                                  <Button
                                    asChild
                                    variant="outline"
                                    className="flex-1"
                                  >
                                    <Link to="/enterprise/demo">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      Schedule Demo
                                    </Link>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        {!showResults && (
          <section className="section bg-accent/20">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need Help with Your Analysis?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our enterprise specialists can help customize this analysis
                  for your specific requirements.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg">
                    <Link to="/enterprise/demo">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="mailto:enterprise@atlas.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Our Experts
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EnterpriseROICalculator;
