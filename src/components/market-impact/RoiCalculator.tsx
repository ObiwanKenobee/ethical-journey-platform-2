
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CustomProgress } from '@/components/ui/custom-progress';
import { DollarSign, Clock, Shield, AlertTriangle, Zap, BarChart3 } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const RoiCalculator = () => {
  // Input states
  const [suppliers, setSuppliers] = useState<number>(100);
  const [auditCost, setAuditCost] = useState<number>(2500);
  const [riskExposure, setRiskExposure] = useState<number>(50);
  const [complianceComplexity, setComplianceComplexity] = useState<number>(50);
  
  // Calculated results
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [riskMitigationScore, setRiskMitigationScore] = useState<number>(0);
  const [timeEfficiency, setTimeEfficiency] = useState<number>(0);
  const [complianceScore, setComplianceScore] = useState<number>(0);
  
  // Comparison data for chart
  const [comparisonData, setComparisonData] = useState<any[]>([]);

  // Calculate ROI when inputs change
  useEffect(() => {
    // Annual savings calculation
    const traditionalCost = suppliers * auditCost;
    const guardianIOCost = suppliers * (auditCost * 0.4); // 60% cost reduction
    const totalSavings = traditionalCost - guardianIOCost;
    setAnnualSavings(totalSavings);
    
    // Risk mitigation score calculation (0-100)
    const baseRiskReduction = 40; // Base 40% risk reduction
    const adjustedRiskReduction = baseRiskReduction + (riskExposure * 0.4); // Higher risk exposure = more benefit
    setRiskMitigationScore(Math.min(adjustedRiskReduction, 95)); // Cap at 95%
    
    // Time efficiency calculation (0-100)
    const baseTimeEfficiency = 65; // Base 65% time savings
    const adjustedTimeEfficiency = baseTimeEfficiency + (suppliers * 0.05); // More suppliers = more time saved
    setTimeEfficiency(Math.min(adjustedTimeEfficiency, 90)); // Cap at 90%
    
    // Compliance score improvement calculation (0-100)
    const baseComplianceImprovement = 35; // Base 35% improvement
    const adjustedComplianceImprovement = baseComplianceImprovement + (complianceComplexity * 0.3); // More complex = more improvement
    setComplianceScore(Math.min(adjustedComplianceImprovement, 90)); // Cap at 90%
    
    // Update comparison chart data
    setComparisonData([
      {
        name: 'Cost',
        traditional: traditionalCost,
        guardianIO: guardianIOCost,
      },
      {
        name: 'Time (hrs)',
        traditional: suppliers * 12, // Traditional: 12 hours per supplier
        guardianIO: suppliers * 2, // Guardian-IO: 2 hours per supplier
      },
      {
        name: 'Risk Score',
        traditional: 100 - (100 - riskExposure) * 0.5, // Traditional reduces risk by 50% of the gap
        guardianIO: 100 - (100 - riskExposure) * 0.9, // Guardian-IO reduces risk by 90% of the gap
      }
    ]);
  }, [suppliers, auditCost, riskExposure, complianceComplexity]);

  return (
    <div className="space-y-8">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-2">ROI & Business Value Calculator</h2>
        <p className="text-muted-foreground mb-8">
          Estimate your potential savings and risk mitigation with Guardian-IO's ethical supply chain platform.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Input Your Supply Chain Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Number of Suppliers</label>
                      <span className="text-sm">{suppliers}</span>
                    </div>
                    <Slider
                      value={[suppliers]}
                      min={10}
                      max={500}
                      step={10}
                      onValueChange={(value) => setSuppliers(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10</span>
                      <span>250</span>
                      <span>500</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Average Audit Cost ($ per supplier)</label>
                      <span className="text-sm">${auditCost}</span>
                    </div>
                    <Slider
                      value={[auditCost]}
                      min={500}
                      max={5000}
                      step={100}
                      onValueChange={(value) => setAuditCost(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$500</span>
                      <span>$2,500</span>
                      <span>$5,000</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Current Risk Exposure Level</label>
                      <span className="text-sm">{riskExposure}%</span>
                    </div>
                    <Slider
                      value={[riskExposure]}
                      min={10}
                      max={90}
                      step={5}
                      onValueChange={(value) => setRiskExposure(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low (10%)</span>
                      <span>Medium (50%)</span>
                      <span>High (90%)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Compliance Complexity</label>
                      <span className="text-sm">{complianceComplexity}%</span>
                    </div>
                    <Slider
                      value={[complianceComplexity]}
                      min={10}
                      max={90}
                      step={5}
                      onValueChange={(value) => setComplianceComplexity(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Simple (10%)</span>
                      <span>Medium (50%)</span>
                      <span>Complex (90%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Comparative Analysis</CardTitle>
                <CardDescription>Guardian-IO vs. Traditional Methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      traditional: { color: "#ef4444" },
                      guardianIO: { color: "#10b981" }
                    }}
                  >
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent />
                        }
                      />
                      <Legend />
                      <Bar dataKey="traditional" name="Traditional Methods" fill="#ef4444" />
                      <Bar dataKey="guardianIO" name="Guardian-IO Platform" fill="#10b981" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Projected Annual Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-5xl font-bold mb-2">${annualSavings.toLocaleString()}</div>
                  <p className="text-primary-foreground/80">Estimated annual cost reduction</p>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Traditional Methods</span>
                      <span>${(suppliers * auditCost).toLocaleString()}</span>
                    </div>
                    <CustomProgress value={100} className="h-2 bg-primary-foreground/20" indicatorClassName="bg-primary-foreground/50" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>With Guardian-IO</span>
                      <span>${(suppliers * auditCost * 0.4).toLocaleString()}</span>
                    </div>
                    <CustomProgress value={40} className="h-2 bg-primary-foreground/20" indicatorClassName="bg-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <h3 className="font-medium">Risk Mitigation</h3>
                      </div>
                      <p className="text-3xl font-bold mt-1">{riskMitigationScore.toFixed(0)}%</p>
                    </div>
                  </div>
                  <CustomProgress value={riskMitigationScore} className="h-2" indicatorClassName="bg-amber-500" />
                  <p className="text-xs text-muted-foreground mt-2">Improved risk identification and mitigation</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <h3 className="font-medium">Time Efficiency</h3>
                      </div>
                      <p className="text-3xl font-bold mt-1">{timeEfficiency.toFixed(0)}%</p>
                    </div>
                  </div>
                  <CustomProgress value={timeEfficiency} className="h-2" indicatorClassName="bg-blue-500" />
                  <p className="text-xs text-muted-foreground mt-2">Reduction in audit and compliance time</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-green-500" />
                        <h3 className="font-medium">Compliance Score</h3>
                      </div>
                      <p className="text-3xl font-bold mt-1">{complianceScore.toFixed(0)}%</p>
                    </div>
                  </div>
                  <CustomProgress value={complianceScore} className="h-2" indicatorClassName="bg-green-500" />
                  <p className="text-xs text-muted-foreground mt-2">Improvement in compliance accuracy</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <h3 className="font-medium">Real-Time Insights</h3>
                      </div>
                      <p className="text-3xl font-bold mt-1">24/7</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Traditional</p>
                    <p className="text-xs text-muted-foreground">Guardian-IO</p>
                  </div>
                  <div className="flex items-center h-2 mt-1 mb-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="w-[20%] h-full bg-purple-200"></div>
                    <div className="w-[80%] h-full bg-purple-500"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Continuous monitoring vs. periodic checks</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <Button size="lg" className="w-full md:w-auto">
                <DollarSign className="mr-2 h-4 w-4" /> Get Custom ROI Report
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card">
        <h3 className="text-xl font-semibold mb-4">Key Business Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-100 text-green-600">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Risk Prevention</h3>
              <p className="text-muted-foreground text-sm">
                Prevent costly labor violations, supply chain disruptions, and 
                reputational damage through proactive risk identification.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 text-blue-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">ESG Excellence</h3>
              <p className="text-muted-foreground text-sm">
                Strengthen ESG metrics with verifiable ethical supply chain 
                practices that attract ethical investors and partners.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-amber-100 text-amber-600">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Competitive Edge</h3>
              <p className="text-muted-foreground text-sm">
                Differentiate your brand with verified ethical practices that 
                increasingly matter to consumers and business partners.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoiCalculator;
