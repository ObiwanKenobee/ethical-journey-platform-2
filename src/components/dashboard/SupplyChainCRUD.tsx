import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search, 
  Filter,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Building,
  Users,
  Globe,
  TrendingUp,
  MoreHorizontal,
  Shield,
  FileText,
  Activity
} from 'lucide-react';
import { 
  supplierCrudService, 
  riskCrudService,
  supplierEvaluationService,
  complianceMonitoringService,
  supplyChainIncidentService,
  enhancedComprehensiveCrudService,
  type EnhancedSupplier,
  type EnhancedRiskAssessment,
  type SupplierEvaluation,
  type ComplianceMonitoring,
  type SupplyChainIncident
} from '@/services/enhanced-comprehensive-crud.service';

const SupplyChainCRUD = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("suppliers");
  const [suppliers, setSuppliers] = useState<EnhancedSupplier[]>([]);
  const [risks, setRisks] = useState<EnhancedRiskAssessment[]>([]);
  const [evaluations, setEvaluations] = useState<SupplierEvaluation[]>([]);
  const [compliance, setCompliance] = useState<ComplianceMonitoring[]>([]);
  const [incidents, setIncidents] = useState<SupplyChainIncident[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    loadData();
    loadDashboardOverview();
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      switch (activeTab) {
        case "suppliers":
          const supplierData = await supplierCrudService.getAll();
          setSuppliers((supplierData.data || []) as EnhancedSupplier[]);
          break;
        case "risks":
          const riskData = await riskCrudService.getAll();
          setRisks((riskData.data || []) as EnhancedRiskAssessment[]);
          break;
        case "evaluations":
          const evaluationData = await supplierEvaluationService.getAll();
          setEvaluations((evaluationData.data || []) as SupplierEvaluation[]);
          break;
        case "compliance":
          const complianceData = await complianceMonitoringService.getAll();
          setCompliance((complianceData.data || []) as ComplianceMonitoring[]);
          break;
        case "incidents":
          const incidentData = await supplyChainIncidentService.getAll();
          setIncidents((incidentData.data || []) as SupplyChainIncident[]);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboardOverview = async () => {
    try {
      const overview = await enhancedComprehensiveCrudService.getDashboardOverview();
      setDashboardData(overview.data);
    } catch (error) {
      console.error('Error loading dashboard overview:', error);
    }
  };

  const handleCreate = async (data: any) => {
    try {
      let newRecord;
      switch (activeTab) {
        case "suppliers":
          newRecord = await supplierCrudService.create({
            ...data,
            risk_score: parseInt(data.risk_score) || 0,
            verified: false
          });
          setSuppliers(prev => [newRecord as EnhancedSupplier, ...prev]);
          break;
        case "risks":
          newRecord = await riskCrudService.create({
            ...data,
            impact_score: parseInt(data.impact_score) || 0,
            probability_score: parseInt(data.probability_score) || 0,
            user_id: 'current-user-id'
          });
          setRisks(prev => [newRecord as EnhancedRiskAssessment, ...prev]);
          break;
        case "evaluations":
          newRecord = await supplierEvaluationService.create({
            ...data,
            assessor_id: 'current-user-id',
            score: parseFloat(data.score) || 0
          });
          setEvaluations(prev => [newRecord as SupplierEvaluation, ...prev]);
          break;
        case "compliance":
          newRecord = await complianceMonitoringService.create(data);
          setCompliance(prev => [newRecord as ComplianceMonitoring, ...prev]);
          break;
        case "incidents":
          newRecord = await supplyChainIncidentService.create({
            ...data,
            reported_by: 'current-user-id'
          });
          setIncidents(prev => [newRecord as SupplyChainIncident, ...prev]);
          break;
      }
      
      setNewItem({});
      toast({
        title: "Success",
        description: "Item created successfully",
      });
    } catch (error) {
      console.error('Error creating item:', error);
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    try {
      let updated;
      switch (activeTab) {
        case "suppliers":
          updated = await supplierCrudService.update(id, data);
          setSuppliers(prev => prev.map(item => item.id === id ? updated as EnhancedSupplier : item));
          break;
        case "risks":
          updated = await riskCrudService.update(id, data);
          setRisks(prev => prev.map(item => item.id === id ? updated as EnhancedRiskAssessment : item));
          break;
        case "evaluations":
          updated = await supplierEvaluationService.update(id, data);
          setEvaluations(prev => prev.map(item => item.id === id ? updated as SupplierEvaluation : item));
          break;
        case "compliance":
          updated = await complianceMonitoringService.update(id, data);
          setCompliance(prev => prev.map(item => item.id === id ? updated as ComplianceMonitoring : item));
          break;
        case "incidents":
          updated = await supplyChainIncidentService.update(id, data);
          setIncidents(prev => prev.map(item => item.id === id ? updated as SupplyChainIncident : item));
          break;
      }
      
      setEditingItem(null);
      toast({
        title: "Success",
        description: "Item updated successfully",
      });
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      switch (activeTab) {
        case "suppliers":
          await supplierCrudService.delete(id);
          setSuppliers(prev => prev.filter(item => item.id !== id));
          break;
        case "risks":
          await riskCrudService.delete(id);
          setRisks(prev => prev.filter(item => item.id !== id));
          break;
        case "evaluations":
          await supplierEvaluationService.delete(id);
          setEvaluations(prev => prev.filter(item => item.id !== id));
          break;
        case "compliance":
          await complianceMonitoringService.delete(id);
          setCompliance(prev => prev.filter(item => item.id !== id));
          break;
        case "incidents":
          await supplyChainIncidentService.delete(id);
          setIncidents(prev => prev.filter(item => item.id !== id));
          break;
      }
      
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      });
    }
  };

  // Filter functions for each data type
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || supplier.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || risk.risk_level === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.assessment_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || evaluation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredCompliance = compliance.filter(comp => {
    const matchesSearch = comp.framework.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.requirement.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || comp.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.incident_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || incident.severity === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const SupplierForm = ({ supplier, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(supplier || {
      name: '', category: '', location: '', status: 'active',
      contact_email: '', contact_phone: '', risk_score: 0
    });

    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Supplier Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
          <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <Input
            placeholder="Contact Email"
            type="email"
            value={formData.contact_email}
            onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
          />
          <Input
            placeholder="Contact Phone"
            value={formData.contact_phone}
            onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onSave(formData)} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={onCancel} variant="outline" size="sm">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  const RiskForm = ({ risk, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(risk || {
      title: '', description: '', risk_level: 'medium', category: '',
      impact_score: 0, probability_score: 0, status: 'active', mitigation_plan: ''
    });

    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Risk Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.risk_level}
            onChange={(e) => setFormData({...formData, risk_level: e.target.value})}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="active">Active</option>
            <option value="mitigated">Mitigated</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onSave(formData)} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={onCancel} variant="outline" size="sm">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  // ... keep existing code (form components would be here but truncated for space)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Supply Chain Management</h2>
          <p className="text-muted-foreground">Comprehensive supplier, risk, and compliance management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{suppliers.length}</div>
              <p className="text-xs text-muted-foreground">
                {suppliers.filter(s => s.verified).length} verified
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.compliance ? Math.round((dashboardData.compliance.compliant / dashboardData.compliance.total) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.compliance?.compliant || 0} compliant
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{risks.filter(r => r.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">
                {risks.filter(r => r.risk_level === 'critical').length} critical
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incidents.filter(i => i.status === 'open').length}</div>
              <p className="text-xs text-muted-foreground">
                {incidents.filter(i => i.severity === 'critical').length} critical
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessments</TabsTrigger>
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <Button onClick={() => setNewItem({})}>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </div>

          {Object.keys(newItem).length > 0 && (
            <SupplierForm
              onSave={(data: any) => handleCreate(data)}
              onCancel={() => setNewItem({})}
            />
          )}
          <div className="grid grid-cols-1 gap-4">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                          {supplier.status}
                        </Badge>
                        {supplier.verified && (
                          <Badge variant="outline" className="text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <span>Category: {supplier.category}</span>
                        <span>Location: {supplier.location}</span>
                        <span>Risk Score: {supplier.risk_score}/100</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(supplier)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(supplier.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search risks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            <Button onClick={() => setNewItem({})}>
              <Plus className="h-4 w-4 mr-2" />
              Add Risk
            </Button>
          </div>

          {Object.keys(newItem).length > 0 && (
            <RiskForm
              onSave={(data: any) => handleCreate(data)}
              onCancel={() => setNewItem({})}
            />
          )}

          <div className="grid grid-cols-1 gap-4">
            {filteredRisks.map((risk) => (
              <Card key={risk.id}>
                <CardContent className="p-4">
                  {editingItem?.id === risk.id ? (
                    <RiskForm
                      risk={risk}
                      onSave={(data: any) => handleUpdate(risk.id, data)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`h-5 w-5 ${
                            risk.risk_level === 'critical' ? 'text-red-600' :
                            risk.risk_level === 'high' ? 'text-orange-600' :
                            risk.risk_level === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`} />
                          <h3 className="font-semibold">{risk.title}</h3>
                          <Badge variant={
                            risk.risk_level === 'critical' ? 'destructive' :
                            risk.risk_level === 'high' ? 'default' :
                            'secondary'
                          }>
                            {risk.risk_level}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <span>Category: {risk.category}</span>
                          <span>Impact: {risk.impact_score}/10</span>
                          <span>Status: {risk.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingItem(risk)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(risk.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search evaluations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
            <Button onClick={() => setNewItem({})}>
              <Plus className="h-4 w-4 mr-2" />
              Add Evaluation
            </Button>
          </div>

          {/* Evaluation Form */}
          <div className="grid grid-cols-1 gap-4">
            {filteredEvaluations.map((evaluation) => (
              <Card key={evaluation.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold">{evaluation.assessment_type}</h3>
                        <Badge variant={evaluation.status === 'completed' ? 'default' : 'secondary'}>
                          {evaluation.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <span>Score: {evaluation.score}/100</span>
                        <span>Date: {evaluation.assessment_date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(evaluation)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(evaluation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search compliance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="non_compliant">Non-Compliant</option>
              <option value="under_review">Under Review</option>
              <option value="remediation_required">Remediation Required</option>
            </select>
            <Button onClick={() => setNewItem({})}>
              <Plus className="h-4 w-4 mr-2" />
              Add Compliance
            </Button>
          </div>

          {/* Compliance Form */}
          <div className="grid grid-cols-1 gap-4">
            {filteredCompliance.map((comp) => (
              <Card key={comp.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-yellow-600" />
                        <h3 className="font-semibold">{comp.framework}</h3>
                        <Badge variant={comp.status === 'compliant' ? 'default' : 'secondary'}>
                          {comp.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <span>Requirement: {comp.requirement}</span>
                        <span>Last Checked: {comp.last_checked}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(comp)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(comp.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            <Button onClick={() => setNewItem({})}>
              <Plus className="h-4 w-4 mr-2" />
              Add Incident
            </Button>
          </div>

          {/* Incident Form */}
          <div className="grid grid-cols-1 gap-4">
            {filteredIncidents.map((incident) => (
              <Card key={incident.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-red-600" />
                        <h3 className="font-semibold">{incident.title}</h3>
                        <Badge variant={incident.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {incident.severity}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <span>Type: {incident.incident_type}</span>
                        <span>Reported: {incident.reported_date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(incident)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(incident.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
      </Tabs>
    </div>
  );
};

export default SupplyChainCRUD;
