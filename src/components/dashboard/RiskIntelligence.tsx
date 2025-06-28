import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, AlertTriangle, Info, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomProgress } from "@/components/ui/custom-progress";

export function RiskIntelligence() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Risk Intelligence</h2>
        <p className="text-muted-foreground">
          AI-powered insights to predict and prevent compliance issues
        </p>
      </div>

      <Tabs defaultValue="scorecard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scorecard">Supplier Scorecards</TabsTrigger>
          <TabsTrigger value="heatmap">Compliance Heatmap</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="scorecard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Trusted Supplier */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Eco-Tex Fabrics</CardTitle>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Trusted</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Human Rights</span>
                      <span className="text-green-600">98/100</span>
                    </div>
                    <CustomProgress value={98} className="h-1.5 bg-green-100" indicatorClassName="bg-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Environmental Impact</span>
                      <span className="text-green-600">95/100</span>
                    </div>
                    <CustomProgress value={95} className="h-1.5 bg-green-100" indicatorClassName="bg-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Fraud Risk</span>
                      <span className="text-green-600">99/100</span>
                    </div>
                    <CustomProgress value={99} className="h-1.5 bg-green-100" indicatorClassName="bg-green-600" />
                  </div>
                  <div className="mt-4 pt-3 border-t flex items-center text-xs text-muted-foreground">
                    <Shield className="mr-1 h-3 w-3" />
                    <span>Blockchain verified: 12 certificates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Moderate Risk Supplier */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Acme Industrial Parts</CardTitle>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Moderate Risk</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Human Rights</span>
                      <span className="text-yellow-600">78/100</span>
                    </div>
                    <CustomProgress value={78} className="h-1.5 bg-yellow-100" indicatorClassName="bg-yellow-600" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Environmental Impact</span>
                      <span className="text-red-600">62/100</span>
                    </div>
                    <CustomProgress value={62} className="h-1.5 bg-red-100" indicatorClassName="bg-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Fraud Risk</span>
                      <span className="text-green-600">89/100</span>
                    </div>
                    <CustomProgress value={89} className="h-1.5 bg-green-100" indicatorClassName="bg-green-600" />
                  </div>
                  <div className="mt-4 pt-3 border-t flex items-center text-xs text-muted-foreground">
                    <AlertTriangle className="mr-1 h-3 w-3 text-yellow-600" />
                    <span>2 compliance issues need attention</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* High Risk Supplier */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Global Resources Ltd</CardTitle>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Risk</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Human Rights</span>
                      <span className="text-red-600">58/100</span>
                    </div>
                    <CustomProgress value={58} className="h-1.5 bg-red-100" indicatorClassName="bg-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Environmental Impact</span>
                      <span className="text-red-600">45/100</span>
                    </div>
                    <CustomProgress value={45} className="h-1.5 bg-red-100" indicatorClassName="bg-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="font-medium">Fraud Risk</span>
                      <span className="text-yellow-600">72/100</span>
                    </div>
                    <CustomProgress value={72} className="h-1.5 bg-yellow-100" indicatorClassName="bg-yellow-600" />
                  </div>
                  <div className="mt-4 pt-3 border-t flex items-center text-xs text-red-600">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    <span>Urgent: 5 critical compliance violations</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button variant="outline" className="w-full">
            View All Suppliers <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Compliance Heatmap</CardTitle>
              <CardDescription>Interactive visualization of supply chain risks by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md mb-4">
                <div className="text-center text-muted-foreground">
                  <p className="mb-2">Interactive Global Risk Heatmap</p>
                  <p className="text-sm">Color-coded visualization showing high-risk regions</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      <span className="flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                        High Risk Region
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">Southeast Asia</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span>Risk Score</span>
                        <span className="text-red-600">82%</span>
                      </div>
                      <CustomProgress value={82} className="h-1.5 bg-red-100" indicatorClassName="bg-red-600" />
                    </div>
                    <div className="mt-3 text-xs">
                      <p className="text-muted-foreground">12 suppliers affected</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      <span className="flex items-center">
                        <Info className="mr-2 h-4 w-4 text-yellow-500" />
                        Emerging Risk Region
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">Eastern Europe</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span>Risk Score</span>
                        <span className="text-yellow-600">65%</span>
                      </div>
                      <CustomProgress value={65} className="h-1.5 bg-yellow-100" indicatorClassName="bg-yellow-600" />
                    </div>
                    <div className="mt-3 text-xs">
                      <p className="text-muted-foreground">8 suppliers affected</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      <span className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Stable Region
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">Western Europe</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span>Risk Score</span>
                        <span className="text-green-600">12%</span>
                      </div>
                      <CustomProgress value={12} className="h-1.5 bg-green-100" indicatorClassName="bg-green-600" />
                    </div>
                    <div className="mt-3 text-xs">
                      <p className="text-muted-foreground">37 suppliers in this region</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" className="w-full">
            Generate Detailed Risk Report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>6-Month Predictive Risk Analysis</CardTitle>
                <CardDescription>AI-driven forecast of your supply chain's emerging risks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border p-4 rounded-lg bg-amber-50 border-amber-200">
                    <div className="flex items-start">
                      <AlertTriangle className="mr-2 h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-amber-800">Southeast Asia: Increasing Regulatory Risk</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          New labor regulations in Vietnam and Thailand will impact 23% of your tier-1 suppliers. 
                          Estimated compliance gap will increase by 18% in the next 6 months.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-lg bg-blue-50 border-blue-200">
                    <div className="flex items-start">
                      <TrendingDown className="mr-2 h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-800">Cost Reduction Opportunity</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          AI recommends shifting 15% of manufacturing from current suppliers to verified alternatives 
                          for 20% lower risk and 12% cost reduction without impacting production capacity.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-lg bg-red-50 border-red-200">
                    <div className="flex items-start">
                      <TrendingDown className="mr-2 h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800">ESG Score Impact Warning</h3>
                        <p className="text-sm text-red-700 mt-1">
                          Your ESG score will drop by 15% without addressing carbon emissions from Global Resources Ltd.
                          Three specific suppliers require immediate engagement to avoid ratings downgrade.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Regulatory Change Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34 suppliers</div>
                <p className="text-xs text-muted-foreground">potentially affected by upcoming regulations</p>
                <div className="mt-4 h-[120px]">
                  {/* Regulatory change impact chart would go here */}
                  <div className="text-xs text-muted-foreground h-full flex items-center justify-center bg-slate-50 rounded-md">
                    Regulatory Change Impact Visualization
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Update Analysis
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Risk-Adjusted Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$2.4M</div>
                <p className="text-xs text-muted-foreground">potential savings with risk mitigation</p>
                <div className="mt-4 h-[120px]">
                  {/* Risk cost chart would go here */}
                  <div className="text-xs text-muted-foreground h-full flex items-center justify-center bg-slate-50 rounded-md">
                    Risk-Cost Trade-off Visualization
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Scenarios
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
