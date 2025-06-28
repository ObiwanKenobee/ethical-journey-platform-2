
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Play,
  Pause,
  Square,
  Plus,
  Trash2,
  Settings,
  Save,
  Upload,
  Download,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  GitBranch,
  Workflow,
  Bot,
  Mail,
  Database,
  Globe,
  FileText,
  Bell
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  name: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  status: 'draft' | 'active' | 'paused';
  lastRun?: string;
  runCount: number;
}

const WorkflowBuilder = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [showNodePalette, setShowNodePalette] = useState(false);
  const [draggedNode, setDraggedNode] = useState<WorkflowNode | null>(null);
  const { toast } = useToast();

  const nodeTypes = [
    {
      type: 'trigger',
      name: 'Data Change Trigger',
      icon: Database,
      description: 'Triggered when data changes'
    },
    {
      type: 'trigger',
      name: 'Schedule Trigger',
      icon: Clock,
      description: 'Run on a schedule'
    },
    {
      type: 'trigger',
      name: 'Webhook Trigger',
      icon: Globe,
      description: 'Triggered by HTTP request'
    },
    {
      type: 'action',
      name: 'Send Email',
      icon: Mail,
      description: 'Send notification email'
    },
    {
      type: 'action',
      name: 'Create Report',
      icon: FileText,
      description: 'Generate automated report'
    },
    {
      type: 'action',
      name: 'Update Database',
      icon: Database,
      description: 'Update database records'
    },
    {
      type: 'action',
      name: 'Send Notification',
      icon: Bell,
      description: 'Send in-app notification'
    },
    {
      type: 'condition',
      name: 'If/Then Condition',
      icon: GitBranch,
      description: 'Conditional logic branch'
    },
    {
      type: 'delay',
      name: 'Wait/Delay',
      icon: Clock,
      description: 'Add delay between actions'
    }
  ];

  const createNewWorkflow = () => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: 'New Workflow',
      description: 'Describe your workflow',
      nodes: [],
      status: 'draft',
      runCount: 0
    };
    setWorkflows(prev => [...prev, newWorkflow]);
    setSelectedWorkflow(newWorkflow);
  };

  const addNode = useCallback((nodeType: any, position: { x: number; y: number }) => {
    if (!selectedWorkflow) return;

    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type: nodeType.type,
      name: nodeType.name,
      config: {},
      position,
      connections: []
    };

    const updatedWorkflow = {
      ...selectedWorkflow,
      nodes: [...selectedWorkflow.nodes, newNode]
    };

    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
  }, [selectedWorkflow]);

  const deleteNode = (nodeId: string) => {
    if (!selectedWorkflow) return;

    const updatedWorkflow = {
      ...selectedWorkflow,
      nodes: selectedWorkflow.nodes.filter(n => n.id !== nodeId)
    };

    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
  };

  const connectNodes = (fromId: string, toId: string) => {
    if (!selectedWorkflow) return;

    const updatedNodes = selectedWorkflow.nodes.map(node => {
      if (node.id === fromId) {
        return {
          ...node,
          connections: [...node.connections.filter(c => c !== toId), toId]
        };
      }
      return node;
    });

    const updatedWorkflow = {
      ...selectedWorkflow,
      nodes: updatedNodes
    };

    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
  };

  const runWorkflow = (workflow: Workflow) => {
    const updatedWorkflow = {
      ...workflow,
      status: 'active' as const,
      lastRun: new Date().toISOString(),
      runCount: workflow.runCount + 1
    };

    setWorkflows(prev => prev.map(w => w.id === workflow.id ? updatedWorkflow : w));
    if (selectedWorkflow?.id === workflow.id) {
      setSelectedWorkflow(updatedWorkflow);
    }

    toast({
      title: "Workflow Started",
      description: `${workflow.name} is now running.`,
    });

    // Simulate workflow completion
    setTimeout(() => {
      const completedWorkflow = { ...updatedWorkflow, status: 'draft' as const };
      setWorkflows(prev => prev.map(w => w.id === workflow.id ? completedWorkflow : w));
      if (selectedWorkflow?.id === workflow.id) {
        setSelectedWorkflow(completedWorkflow);
      }
    }, 3000);
  };

  const getNodeIcon = (nodeType: string, nodeName: string) => {
    const nodeConfig = nodeTypes.find(nt => nt.name === nodeName);
    return nodeConfig?.icon || Workflow;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflow Builder</h1>
          <p className="text-muted-foreground">Automate your supply chain processes with visual workflows</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={createNewWorkflow}>
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
          <Button variant="outline" onClick={() => setShowNodePalette(!showNodePalette)}>
            <Workflow className="h-4 w-4 mr-2" />
            Node Palette
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Workflow List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Workflows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {workflows.map(workflow => (
                <div
                  key={workflow.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedWorkflow?.id === workflow.id 
                      ? 'border-primary bg-primary/10' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{workflow.name}</h4>
                    <Badge className={getStatusColor(workflow.status)}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{workflow.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{workflow.nodes.length} nodes</span>
                    <span>{workflow.runCount} runs</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Node Palette */}
          {showNodePalette && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Node Palette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {nodeTypes.map((nodeType, index) => {
                  const Icon = nodeType.icon;
                  return (
                    <div
                      key={index}
                      className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                      draggable
                      onDragStart={() => setDraggedNode(nodeType as any)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium text-sm">{nodeType.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{nodeType.description}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Workflow Canvas */}
        <div className="lg:col-span-3">
          {selectedWorkflow ? (
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Input
                      value={selectedWorkflow.name}
                      onChange={(e) => {
                        const updated = { ...selectedWorkflow, name: e.target.value };
                        setSelectedWorkflow(updated);
                        setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updated : w));
                      }}
                      className="font-semibold text-lg border-none p-0 h-auto"
                    />
                    <Badge className={getStatusColor(selectedWorkflow.status)}>
                      {selectedWorkflow.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => runWorkflow(selectedWorkflow)}
                      disabled={selectedWorkflow.status === 'active'}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Run
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={selectedWorkflow.description}
                  onChange={(e) => {
                    const updated = { ...selectedWorkflow, description: e.target.value };
                    setSelectedWorkflow(updated);
                    setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updated : w));
                  }}
                  placeholder="Describe what this workflow does..."
                  className="border-none p-0 resize-none"
                  rows={2}
                />
              </CardHeader>
              <CardContent className="h-full">
                <div
                  className="w-full h-full border-2 border-dashed border-muted rounded-lg relative overflow-auto"
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedNode) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const position = {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top
                      };
                      addNode(draggedNode, position);
                      setDraggedNode(null);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {selectedWorkflow.nodes.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <Workflow className="h-12 w-12 mx-auto mb-4" />
                        <p className="text-lg font-medium">Drag nodes here to build your workflow</p>
                        <p className="text-sm">Start with a trigger, then add actions and conditions</p>
                      </div>
                    </div>
                  ) : (
                    selectedWorkflow.nodes.map((node, index) => {
                      const Icon = getNodeIcon(node.type, node.name);
                      return (
                        <div
                          key={node.id}
                          className="absolute bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow min-w-[200px]"
                          style={{
                            left: node.position.x,
                            top: node.position.y
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span className="font-medium text-sm">{node.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => deleteNode(node.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Badge variant="secondary" className="text-xs">
                            {node.type}
                          </Badge>

                          {/* Connection points */}
                          <div className="absolute -right-2 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2 cursor-pointer">
                            <ArrowRight className="h-3 w-3 text-white m-0.5" />
                          </div>
                          
                          {index > 0 && (
                            <div className="absolute -left-2 top-1/2 w-4 h-4 bg-gray-400 rounded-full transform -translate-y-1/2" />
                          )}
                        </div>
                      );
                    })
                  )}
                  
                  {/* Draw connections */}
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {selectedWorkflow.nodes.map(node => 
                      node.connections.map(targetId => {
                        const targetNode = selectedWorkflow.nodes.find(n => n.id === targetId);
                        if (!targetNode) return null;
                        
                        return (
                          <line
                            key={`${node.id}-${targetId}`}
                            x1={node.position.x + 200}
                            y1={node.position.y + 40}
                            x2={targetNode.position.x}
                            y2={targetNode.position.y + 40}
                            stroke="#3b82f6"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                        );
                      })
                    )}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill="#3b82f6"
                        />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[600px]">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <Bot className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Build Automated Workflows</h3>
                  <p className="mb-4">Create powerful automations to streamline your supply chain processes</p>
                  <Button onClick={createNewWorkflow}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Workflow
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workflow Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { workflow: 'Supplier Risk Assessment', action: 'Completed', time: '2 minutes ago', status: 'success' },
              { workflow: 'ESG Report Generation', action: 'Started', time: '5 minutes ago', status: 'running' },
              { workflow: 'Compliance Alert System', action: 'Failed', time: '1 hour ago', status: 'error' },
              { workflow: 'Carbon Footprint Tracker', action: 'Completed', time: '3 hours ago', status: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {activity.status === 'running' && <Clock className="h-4 w-4 text-blue-500" />}
                  {activity.status === 'error' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  <div>
                    <div className="font-medium text-sm">{activity.workflow}</div>
                    <div className="text-xs text-muted-foreground">{activity.action}</div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowBuilder;
