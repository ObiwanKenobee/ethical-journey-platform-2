
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import {
  Settings,
  Eye,
  Layout,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Grid,
  List,
  BarChart,
  PieChart,
  LineChart,
  Map,
  Calendar,
  Clock,
  Users,
  Target,
  Zap,
  Save,
  RefreshCw,
  Download,
  Upload,
  Copy,
  Trash2,
  Plus,
  Move,
  Maximize,
  Minimize
} from 'lucide-react';

interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large' | 'full';
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, any>;
  visible: boolean;
}

interface DashboardLayout {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  theme: string;
  layout: 'grid' | 'masonry' | 'list';
  responsive: boolean;
}

const DashboardPersonalization = () => {
  const [layouts, setLayouts] = useState<DashboardLayout[]>([]);
  const [activeLayout, setActiveLayout] = useState<DashboardLayout | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<DashboardWidget | null>(null);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { toast } = useToast();

  const availableWidgets = [
    { type: 'metric', title: 'Key Metric Card', icon: Target, category: 'Analytics' },
    { type: 'chart', title: 'Line Chart', icon: LineChart, category: 'Charts' },
    { type: 'bar-chart', title: 'Bar Chart', icon: BarChart, category: 'Charts' },
    { type: 'pie-chart', title: 'Pie Chart', icon: PieChart, category: 'Charts' },
    { type: 'map', title: 'Geographic Map', icon: Map, category: 'Maps' },
    { type: 'calendar', title: 'Calendar View', icon: Calendar, category: 'Planning' },
    { type: 'timeline', title: 'Timeline', icon: Clock, category: 'Planning' },
    { type: 'user-list', title: 'User List', icon: Users, category: 'Data' },
    { type: 'activity-feed', title: 'Activity Feed', icon: Zap, category: 'Social' },
    { type: 'weather', title: 'Weather Widget', icon: Monitor, category: 'External' }
  ];

  const themes = [
    { id: 'light', name: 'Light', colors: ['#ffffff', '#f8f9fa', '#e9ecef'] },
    { id: 'dark', name: 'Dark', colors: ['#1a1a1a', '#2d3748', '#4a5568'] },
    { id: 'blue', name: 'Ocean Blue', colors: ['#e6f3ff', '#0066cc', '#004499'] },
    { id: 'green', name: 'Forest Green', colors: ['#e6f7ed', '#00a65a', '#007143'] },
    { id: 'purple', name: 'Royal Purple', colors: ['#f0e6ff', '#7c3aed', '#5b21b6'] }
  ];

  useEffect(() => {
    loadLayouts();
  }, []);

  const loadLayouts = () => {
    // Mock data - replace with actual API calls
    const mockLayouts: DashboardLayout[] = [
      {
        id: '1',
        name: 'Executive Dashboard',
        description: 'High-level overview for executives',
        theme: 'light',
        layout: 'grid',
        responsive: true,
        widgets: [
          {
            id: 'w1',
            type: 'metric',
            title: 'Total Suppliers',
            size: 'small',
            position: { x: 0, y: 0, w: 3, h: 2 },
            config: { value: 247, change: '+12%' },
            visible: true
          },
          {
            id: 'w2',
            type: 'chart',
            title: 'Risk Trends',
            size: 'medium',
            position: { x: 3, y: 0, w: 6, h: 4 },
            config: { chartType: 'line', timeRange: '30d' },
            visible: true
          },
          {
            id: 'w3',
            type: 'map',
            title: 'Global Supply Chain',
            size: 'large',
            position: { x: 0, y: 2, w: 9, h: 4 },
            config: { zoom: 2, markers: true },
            visible: true
          }
        ]
      },
      {
        id: '2',
        name: 'Operations Dashboard',
        description: 'Operational metrics and KPIs',
        theme: 'dark',
        layout: 'masonry',
        responsive: true,
        widgets: [
          {
            id: 'w4',
            type: 'bar-chart',
            title: 'Compliance Scores',
            size: 'medium',
            position: { x: 0, y: 0, w: 6, h: 3 },
            config: { orientation: 'horizontal' },
            visible: true
          }
        ]
      }
    ];
    
    setLayouts(mockLayouts);
    setActiveLayout(mockLayouts[0]);
  };

  const addWidget = (widgetType: any) => {
    if (!activeLayout) return;

    const newWidget: DashboardWidget = {
      id: `w_${Date.now()}`,
      type: widgetType.type,
      title: widgetType.title,
      size: 'medium',
      position: { x: 0, y: 0, w: 4, h: 3 },
      config: {},
      visible: true
    };

    const updatedLayout = {
      ...activeLayout,
      widgets: [...activeLayout.widgets, newWidget]
    };

    setActiveLayout(updatedLayout);
    setLayouts(prev => prev.map(l => l.id === activeLayout.id ? updatedLayout : l));
    setShowWidgetLibrary(false);

    toast({
      title: "Widget Added",
      description: `${widgetType.title} has been added to your dashboard.`,
    });
  };

  const removeWidget = (widgetId: string) => {
    if (!activeLayout) return;

    const updatedLayout = {
      ...activeLayout,
      widgets: activeLayout.widgets.filter(w => w.id !== widgetId)
    };

    setActiveLayout(updatedLayout);
    setLayouts(prev => prev.map(l => l.id === activeLayout.id ? updatedLayout : l));
  };

  const updateWidgetConfig = (widgetId: string, config: Record<string, any>) => {
    if (!activeLayout) return;

    const updatedLayout = {
      ...activeLayout,
      widgets: activeLayout.widgets.map(w => 
        w.id === widgetId ? { ...w, config: { ...w.config, ...config } } : w
      )
    };

    setActiveLayout(updatedLayout);
    setLayouts(prev => prev.map(l => l.id === activeLayout.id ? updatedLayout : l));
  };

  const duplicateLayout = () => {
    if (!activeLayout) return;

    const newLayout: DashboardLayout = {
      ...activeLayout,
      id: Date.now().toString(),
      name: `${activeLayout.name} (Copy)`,
      widgets: activeLayout.widgets.map(w => ({ ...w, id: `${w.id}_copy` }))
    };

    setLayouts(prev => [...prev, newLayout]);
    toast({
      title: "Layout Duplicated",
      description: "Layout has been successfully duplicated.",
    });
  };

  const exportLayout = () => {
    if (!activeLayout) return;

    const dataStr = JSON.stringify(activeLayout, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${activeLayout.name.replace(/\s+/g, '_')}_layout.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getDevicePreviewClass = () => {
    switch (previewDevice) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'w-full';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Personalization</h1>
          <p className="text-muted-foreground">Customize your dashboard layout, widgets, and themes</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={editMode ? "default" : "outline"}
            onClick={() => setEditMode(!editMode)}
          >
            <Settings className="h-4 w-4 mr-2" />
            {editMode ? 'Exit Edit' : 'Edit Mode'}
          </Button>
          <Button variant="outline" onClick={duplicateLayout}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" onClick={exportLayout}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Layout Selector */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Layouts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {layouts.map(layout => (
                <div
                  key={layout.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeLayout?.id === layout.id 
                      ? 'border-primary bg-primary/10' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveLayout(layout)}
                >
                  <h4 className="font-medium text-sm">{layout.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{layout.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="secondary">{layout.theme}</Badge>
                    <span>{layout.widgets.length} widgets</span>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const newLayout: DashboardLayout = {
                    id: Date.now().toString(),
                    name: 'New Layout',
                    description: 'Custom dashboard layout',
                    theme: 'light',
                    layout: 'grid',
                    responsive: true,
                    widgets: []
                  };
                  setLayouts(prev => [...prev, newLayout]);
                  setActiveLayout(newLayout);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Layout
              </Button>
            </CardContent>
          </Card>

          {editMode && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Preview Device</label>
                  <div className="flex gap-1 mt-1">
                    <Button
                      size="sm"
                      variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                      onClick={() => setPreviewDevice('desktop')}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                      onClick={() => setPreviewDevice('tablet')}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                      onClick={() => setPreviewDevice('mobile')}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Theme</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {themes.map(theme => (
                      <div
                        key={theme.id}
                        className={`p-2 rounded border cursor-pointer ${
                          activeLayout?.theme === theme.id ? 'border-primary' : 'border-muted'
                        }`}
                        onClick={() => {
                          if (activeLayout) {
                            const updated = { ...activeLayout, theme: theme.id };
                            setActiveLayout(updated);
                            setLayouts(prev => prev.map(l => l.id === activeLayout.id ? updated : l));
                          }
                        }}
                      >
                        <div className="flex gap-1 mb-1">
                          {theme.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="text-xs">{theme.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setShowWidgetLibrary(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Widget
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Dashboard Preview */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{activeLayout?.name || 'Select a Layout'}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{previewDevice}</Badge>
                  {activeLayout && (
                    <Badge>{activeLayout.widgets.length} widgets</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full overflow-auto">
              {activeLayout ? (
                <div className={`${getDevicePreviewClass()} h-full`}>
                  <div className="grid grid-cols-12 gap-4 h-full">
                    {activeLayout.widgets.map(widget => (
                      <div
                        key={widget.id}
                        className={`col-span-${widget.position.w} row-span-${widget.position.h} border rounded-lg p-4 relative ${
                          editMode ? 'border-dashed border-2 hover:border-primary' : ''
                        }`}
                        style={{
                          gridColumn: `span ${widget.position.w}`,
                          minHeight: `${widget.position.h * 100}px`
                        }}
                      >
                        {editMode && (
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0"
                              onClick={() => setSelectedWidget(widget)}
                            >
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0"
                              onClick={() => removeWidget(widget.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        
                        <div className="h-full flex flex-col">
                          <h4 className="font-medium mb-2">{widget.title}</h4>
                          <div className="flex-1 flex items-center justify-center bg-muted/20 rounded">
                            <span className="text-muted-foreground text-sm">
                              {widget.type} widget
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Layout className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Layout Selected</h3>
                    <p>Choose a layout from the sidebar to start customizing</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Widget Library Modal */}
      {showWidgetLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Widget Library</CardTitle>
                <Button variant="outline" onClick={() => setShowWidgetLibrary(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableWidgets.map((widget, index) => {
                  const Icon = widget.icon;
                  return (
                    <div
                      key={index}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => addWidget(widget)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-6 w-6" />
                        <div>
                          <h4 className="font-medium">{widget.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {widget.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Widget Config Panel */}
      {selectedWidget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Configure Widget</CardTitle>
                <Button variant="outline" onClick={() => setSelectedWidget(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={selectedWidget.title}
                  onChange={(e) => {
                    const updated = { ...selectedWidget, title: e.target.value };
                    setSelectedWidget(updated);
                    updateWidgetConfig(selectedWidget.id, { title: e.target.value });
                  }}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Size</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedWidget.size}
                  onChange={(e) => {
                    const updated = { ...selectedWidget, size: e.target.value as any };
                    setSelectedWidget(updated);
                    updateWidgetConfig(selectedWidget.id, { size: e.target.value });
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="full">Full Width</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Visible</label>
                <Switch
                  checked={selectedWidget.visible}
                  onCheckedChange={(checked) => {
                    const updated = { ...selectedWidget, visible: checked };
                    setSelectedWidget(updated);
                    updateWidgetConfig(selectedWidget.id, { visible: checked });
                  }}
                />
              </div>

              <Button onClick={() => setSelectedWidget(null)} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardPersonalization;
