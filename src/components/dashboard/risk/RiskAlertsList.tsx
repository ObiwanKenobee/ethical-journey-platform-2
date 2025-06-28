
import React, { useState, useEffect } from 'react';
import { RiskAlert, riskAlertService, riskService } from '@/services/dashboard/risk.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function RiskAlertsList() {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const activeAlerts = await riskService.getActiveAlerts();
      setAlerts(activeAlerts);
    } catch (error) {
      console.error('Error fetching risk alerts:', error);
      toast({
        title: 'Error loading alerts',
        description: 'Could not load risk alerts. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    try {
      await riskService.acknowledgeAlert(alertId);
      setAlerts(alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'acknowledged' } 
          : alert
      ));
      
      toast({
        title: 'Alert acknowledged',
        description: 'The risk alert has been acknowledged successfully.',
      });
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      toast({
        title: 'Error',
        description: 'Could not acknowledge the alert. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const getSeverityColor = (severity: RiskAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-700 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Active Risk Alerts</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchAlerts}
          disabled={loading}
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : alerts.length === 0 ? (
        <Card>
          <CardContent className="py-6 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
              <p className="text-muted-foreground">No active risk alerts at the moment.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Card key={alert.id}>
              <CardHeader className="py-3 px-4 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center">
                  <AlertTriangle className={`h-5 w-5 mr-2 ${
                    alert.severity === 'critical' || alert.severity === 'high' 
                      ? 'text-red-500' 
                      : alert.severity === 'medium' 
                      ? 'text-yellow-500' 
                      : 'text-green-500'
                  }`} />
                  <CardTitle className="text-base font-medium">{alert.title}</CardTitle>
                </div>
                <Badge className={`${getSeverityColor(alert.severity)}`}>
                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <p className="text-sm mb-3">{alert.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Detected: {new Date(alert.date_detected).toLocaleDateString()}</span>
                  <span>Occurred: {new Date(alert.date_occurred).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {alert.affected_entities.map((entity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {entity}
                    </Badge>
                  ))}
                </div>
                {alert.status === 'new' ? (
                  <Button 
                    size="sm" 
                    className="w-full" 
                    onClick={() => handleAcknowledge(alert.id)}
                  >
                    Acknowledge
                  </Button>
                ) : (
                  <Badge variant="outline" className="bg-blue-50">Acknowledged</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default RiskAlertsList;
