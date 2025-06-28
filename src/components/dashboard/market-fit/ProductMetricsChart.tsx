
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  marketFitService, 
  ProductMetric 
} from '@/services/dashboard/market-fit.service';
import { toast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';

const ProductMetricsChart = () => {
  const [metrics, setMetrics] = useState<ProductMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProductMetric['category']>('engagement');

  useEffect(() => {
    fetchMetrics(activeCategory);
  }, [activeCategory]);

  const fetchMetrics = async (category: ProductMetric['category']) => {
    try {
      setLoading(true);
      const data = await marketFitService.getRecentProductMetrics(category);
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching product metrics:', error);
      toast({
        title: 'Error loading metrics',
        description: 'Could not load product metrics. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Transform data for chart display
  const chartData = metrics.map(metric => ({
    name: metric.name,
    value: metric.value,
    previousValue: metric.previous_value || 0,
    change: metric.previous_value 
      ? ((metric.value - metric.previous_value) / metric.previous_value * 100).toFixed(1)
      : '0'
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Analytics</CardTitle>
        <Tabs 
          value={activeCategory} 
          onValueChange={(value) => setActiveCategory(value as ProductMetric['category'])}
          className="w-full mt-2"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'value') return [value, 'Current'];
                  if (name === 'previousValue') return [value, 'Previous'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="previousValue" fill="#64748b" name="Previous" />
              <Bar dataKey="value" fill="#3b82f6" name="Current" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductMetricsChart;
