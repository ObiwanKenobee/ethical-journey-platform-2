
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomProgress } from "@/components/ui/custom-progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  Check, 
  AlertTriangle, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  GitCompare, 
  PackageCheck, 
  PackageSearch, 
  ShieldCheck
} from "lucide-react";

// Mock data for supplier comparison
const supplierData = [
  {
    id: "sup-001",
    name: "EcoFriendly Materials Co.",
    compliance_score: 92,
    risk_level: "low",
    certifications: ["ISO 14001", "Fair Trade", "B Corp"],
    cost_index: 85,
    blockchain_verified: true,
    last_audit: "2023-05-12",
    location: "Netherlands",
    category: "Raw Materials",
    violations: 0
  },
  {
    id: "sup-002",
    name: "Global Textiles Inc.",
    compliance_score: 78,
    risk_level: "medium",
    certifications: ["ISO 9001", "OEKO-TEX"],
    cost_index: 72,
    blockchain_verified: true,
    last_audit: "2023-06-18",
    location: "India",
    category: "Textiles",
    violations: 1
  },
  {
    id: "sup-003",
    name: "Quick Ship Logistics",
    compliance_score: 65,
    risk_level: "medium",
    certifications: ["ISO 9001"],
    cost_index: 65,
    blockchain_verified: false,
    last_audit: "2023-03-24",
    location: "Malaysia",
    category: "Logistics",
    violations: 2
  },
  {
    id: "sup-004",
    name: "Budget Components Ltd.",
    compliance_score: 45,
    risk_level: "high",
    certifications: [],
    cost_index: 40,
    blockchain_verified: false,
    last_audit: "2022-11-30",
    location: "China",
    category: "Components",
    violations: 5
  }
];

// Blacklisted suppliers
const blacklistedSuppliers = [
  {
    id: "black-001",
    name: "Shadow Manufacturers Inc.",
    reason: "Documented labor violations",
    flagged_at: "2023-01-15",
    risk_score: 92
  },
  {
    id: "black-002",
    name: "Low Cost Industries",
    reason: "Environmental compliance failure",
    flagged_at: "2023-04-22",
    risk_score: 87
  }
];

export function SupplierCompliance() {
  const [compareSuppliers, setCompareSuppliers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("verification");

  const getRiskColor = (level: string) => {
    switch(level) {
      case "low": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "high": return "bg-red-100 text-red-800 hover:bg-red-100";
      case "critical": return "bg-red-900 text-white hover:bg-red-900";
      default: return "bg-slate-100 text-slate-800 hover:bg-slate-100";
    }
  };

  const toggleSupplierCompare = (supplierId: string) => {
    if (compareSuppliers.includes(supplierId)) {
      setCompareSuppliers(prev => prev.filter(id => id !== supplierId));
    } else if (compareSuppliers.length < 2) {
      setCompareSuppliers(prev => [...prev, supplierId]);
    }
  };

  const getComparedSuppliers = () => {
    return supplierData.filter(supplier => compareSuppliers.includes(supplier.id));
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Supplier Compliance & Blockchain Verification</h2>
        <p className="text-muted-foreground">
          Trust, but verify – AI-powered supplier validation and risk assessment
        </p>
      </div>

      <Tabs defaultValue="verification" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="verification">Compliance Verification</TabsTrigger>
          <TabsTrigger value="comparison">Supplier Comparison</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                AI-Powered Compliance Verification
              </CardTitle>
              <CardDescription>
                Automated due diligence, background checks, and blockchain-verified certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {supplierData.map(supplier => (
                    <Card key={supplier.id} className="bg-card border overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{supplier.name}</CardTitle>
                            <CardDescription>{supplier.location} • {supplier.category}</CardDescription>
                          </div>
                          <Badge className={getRiskColor(supplier.risk_level)}>
                            {supplier.risk_level.charAt(0).toUpperCase() + supplier.risk_level.slice(1)} Risk
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pb-6 pt-0">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1 text-xs">
                              <span className="font-medium">Compliance Score</span>
                              <span className={supplier.compliance_score >= 80 
                                ? "text-green-600" 
                                : supplier.compliance_score >= 60 
                                  ? "text-yellow-600" 
                                  : "text-red-600"
                              }>
                                {supplier.compliance_score}/100
                              </span>
                            </div>
                            <CustomProgress 
                              value={supplier.compliance_score} 
                              className="h-1.5 bg-slate-100" 
                              indicatorClassName={supplier.compliance_score >= 80 
                                ? "bg-green-600" 
                                : supplier.compliance_score >= 60 
                                  ? "bg-yellow-600" 
                                  : "bg-red-600"
                              } 
                            />
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {supplier.certifications.length > 0 ? (
                              supplier.certifications.map((cert, idx) => (
                                <Badge key={idx} variant="outline" className="flex items-center gap-1">
                                  {supplier.blockchain_verified && <Check className="h-3 w-3 text-green-500" />}
                                  {cert}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">No certifications</span>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center mt-4 pt-2 border-t">
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-muted-foreground">Last Audit:</span>
                              <span className="font-medium">{new Date(supplier.last_audit).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              {supplier.blockchain_verified && (
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                  <Shield className="h-3 w-3" />
                                  <span>Blockchain Verified</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => toggleSupplierCompare(supplier.id)}
                          >
                            {compareSuppliers.includes(supplier.id) 
                              ? "Remove from Comparison" 
                              : "Add to Comparison"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-primary" />
                Supplier Comparison Tool
              </CardTitle>
              <CardDescription>
                Compare suppliers side-by-side based on cost, risk, and compliance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {compareSuppliers.length === 2 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div></div>
                    {getComparedSuppliers().map(supplier => (
                      <div key={supplier.id} className="text-center">
                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                        <p className="text-sm text-muted-foreground">{supplier.location}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="font-medium">Compliance Score</div>
                    {getComparedSuppliers().map(supplier => (
                      <div key={supplier.id} className="text-center">
                        <span className={`text-xl font-bold ${
                          supplier.compliance_score >= 80 
                            ? "text-green-600" 
                            : supplier.compliance_score >= 60 
                              ? "text-yellow-600" 
                              : "text-red-600"
                        }`}>
                          {supplier.compliance_score}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="font-medium">Risk Level</div>
                    {getComparedSuppliers().map(supplier => (
                      <div key={supplier.id} className="text-center">
                        <Badge className={getRiskColor(supplier.risk_level)}>
                          {supplier.risk_level.charAt(0).toUpperCase() + supplier.risk_level.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="font-medium">Cost Index</div>
                    {getComparedSuppliers().map(supplier => (
                      <div key={supplier.id} className="text-center">
                        <span className="text-xl font-bold">{supplier.cost_index}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="font-medium">Certifications</div>
                    {getComparedSuppliers().map(supplier => (
                      <div key={supplier.id} className="text-center">
                        <span>{supplier.certifications.length}</span>
                        <p className="text-xs text-muted-foreground">
                          {supplier.certifications.join(', ') || 'None'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="font-medium">Blockchain Verified</div>
                    {getComparedSuppliers().map(supplier => (
                      <div key={supplier.id} className="text-center">
                        {supplier.blockchain_verified ? (
                          <span className="text-green-600 flex items-center justify-center gap-1">
                            <Check className="h-4 w-4" /> Verified
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center justify-center gap-1">
                            <AlertTriangle className="h-4 w-4" /> Not Verified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="font-medium">Compliance Violations</div>
                    {getComparedSuppliers().map(supplier => (
                      <div key={supplier.id} className="text-center">
                        <span className={`text-xl font-bold ${
                          supplier.violations === 0 
                            ? "text-green-600" 
                            : supplier.violations <= 2 
                              ? "text-yellow-600" 
                              : "text-red-600"
                        }`}>
                          {supplier.violations}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-blue-800">AI Recommendation</h4>
                        {getComparedSuppliers()[0]?.compliance_score > getComparedSuppliers()[1]?.compliance_score ? (
                          <p className="text-sm text-blue-700 mt-1">
                            Recommended: <strong>{getComparedSuppliers()[0]?.name}</strong> has a {getComparedSuppliers()[0]?.compliance_score - getComparedSuppliers()[1]?.compliance_score}% 
                            higher ESG compliance score and fewer violations.
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 mt-1">
                            Recommended: <strong>{getComparedSuppliers()[1]?.name}</strong> has a {getComparedSuppliers()[1]?.compliance_score - getComparedSuppliers()[0]?.compliance_score}% 
                            higher ESG compliance score and fewer violations.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-12 border border-dashed rounded-lg">
                  <GitCompare className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select Suppliers to Compare</h3>
                  <p className="text-muted-foreground mb-4">
                    Select two suppliers from the verification tab to see a detailed comparison
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("verification")}
                  >
                    Select Suppliers
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Fraud Detection & Blacklist Alerts
              </CardTitle>
              <CardDescription>
                AI cross-checks supplier data for violations and flags suspicious entities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-red-800">Blacklisted Suppliers</h4>
                    <p className="text-sm text-red-700 mt-1">
                      The following suppliers are blacklisted due to compliance violations or other risks
                    </p>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Flagged At</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blacklistedSuppliers.map(supplier => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.reason}</TableCell>
                      <TableCell>{new Date(supplier.flagged_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600 font-medium">{supplier.risk_score}</span>
                          <CustomProgress 
                            value={supplier.risk_score} 
                            className="h-1.5 w-12 bg-red-100" 
                            indicatorClassName="bg-red-600" 
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Card className="bg-slate-50 border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">AI Fraud Detection System</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Suppliers Analyzed</span>
                      <span className="font-medium">214</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Anomalies Detected</span>
                      <span className="font-medium">27</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Alerts Generated</span>
                      <span className="font-medium">9</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">False Positives</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Model Accuracy</span>
                      <span className="font-medium">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-green-800">AI Cross-Checking Features</h4>
                    <ul className="text-sm text-green-700 mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3" /> Cross-reference against global sanctions lists
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3" /> Identify hidden parent company relationships
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3" /> Validate certification authenticity with blockchain
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3" /> Detect suspicious pattern changes in compliance documentation
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3" /> Monitor news and reports for emerging compliance issues
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
