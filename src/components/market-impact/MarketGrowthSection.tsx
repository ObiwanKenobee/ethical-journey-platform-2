
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// Sample data for market growth
const adoptionData = [
  { year: '2021', enterprise: 18, sme: 42, government: 5 },
  { year: '2022', enterprise: 35, sme: 78, government: 12 },
  { year: '2023', enterprise: 67, sme: 145, government: 28 },
  { year: '2024', enterprise: 124, sme: 256, government: 47 },
];

const industryAdoptionData = [
  { name: 'Manufacturing', value: 35 },
  { name: 'Retail', value: 28 },
  { name: 'Technology', value: 15 },
  { name: 'Agriculture', value: 12 },
  { name: 'Others', value: 10 },
];

const partnerGrowthData = [
  { month: 'Jan', partners: 12 },
  { month: 'Feb', partners: 19 },
  { month: 'Mar', partners: 28 },
  { month: 'Apr', partners: 39 },
  { month: 'May', partners: 48 },
  { month: 'Jun', partners: 59 },
  { month: 'Jul', partners: 73 },
  { month: 'Aug', partners: 85 },
  { month: 'Sep', partners: 96 },
  { month: 'Oct', partners: 112 },
  { month: 'Nov', partners: 128 },
  { month: 'Dec', partners: 145 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const MarketGrowthSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="space-y-8">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-4">Market Growth & Adoption</h2>
        <p className="text-muted-foreground mb-6">
          Guardian-IO is experiencing rapid market adoption across enterprises, SMEs, and government sectors,
          creating an entirely new market category for ethical supply chain intelligence.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className={cn(
            "glass-card transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h3 className="text-xl font-semibold mb-2">145+</h3>
            <p className="text-muted-foreground">Partner Organizations</p>
          </div>
          
          <div className={cn(
            "glass-card transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )} style={{ transitionDelay: inView ? '100ms' : '0ms' }}>
            <h3 className="text-xl font-semibold mb-2">35+</h3>
            <p className="text-muted-foreground">Countries</p>
          </div>
          
          <div className={cn(
            "glass-card transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )} style={{ transitionDelay: inView ? '200ms' : '0ms' }}>
            <h3 className="text-xl font-semibold mb-2">68%</h3>
            <p className="text-muted-foreground">YoY Growth</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Adoption by Organization Type</CardTitle>
              <CardDescription>Annual growth in customer acquisition</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ChartContainer 
                config={{
                  enterprise: { color: "#0ea5e9" },
                  sme: { color: "#10b981" },
                  government: { color: "#8b5cf6" }
                }}
              >
                <BarChart data={adoptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent />
                    }
                  />
                  <Legend />
                  <Bar dataKey="enterprise" name="Enterprise" fill="#0ea5e9" />
                  <Bar dataKey="sme" name="SMEs" fill="#10b981" />
                  <Bar dataKey="government" name="Government" fill="#8b5cf6" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Industry Adoption</CardTitle>
              <CardDescription>Distribution across sectors</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ChartContainer config={{}}>
                <PieChart>
                  <Pie
                    data={industryAdoptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {industryAdoptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="glass-card">
        <h3 className="text-xl font-semibold mb-4">Partner Ecosystem Growth</h3>
        <Card>
          <CardContent className="pt-6 h-[300px]">
            <ChartContainer 
              config={{
                partners: { color: "#8b5cf6" }
              }}
            >
              <LineChart data={partnerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="partners" 
                  name="Partners" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <PartnersCard 
            category="Technology" 
            count={42} 
            partnerNames={["Microsoft", "IBM", "Oracle", "Salesforce"]} 
          />
          <PartnersCard 
            category="Consulting" 
            count={28} 
            partnerNames={["Deloitte", "PwC", "McKinsey", "Accenture"]} 
          />
          <PartnersCard 
            category="NGOs" 
            count={35} 
            partnerNames={["Amnesty International", "Human Rights Watch", "ILO", "UN Global Compact"]} 
          />
        </div>
      </div>
      
      <div className="glass-card">
        <h3 className="text-xl font-semibold mb-4">Market Disruption & Monopoly Potential</h3>
        <p className="text-muted-foreground mb-6">
          Guardian-IO's unique AI x Blockchain fusion is creating an entirely new market category with significant monopoly potential:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card">
            <h4 className="text-lg font-medium mb-3">Zero to One Advantages</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5">1</Badge>
                <span>Proprietary AI models trained on ethical supply chain data</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5">2</Badge>
                <span>Network effects: more suppliers = more valuable platform</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5">3</Badge>
                <span>Immutable trust layer through blockchain verification</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5">4</Badge>
                <span>First-mover advantage in global compliance markets</span>
              </li>
            </ul>
          </div>
          
          <div className="glass-card">
            <h4 className="text-lg font-medium mb-3">Market Position</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">01</Badge>
                <span>First comprehensive ethical supply chain platform with integrated verification</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">02</Badge>
                <span>Creating new regulatory compliance standard for global enterprises</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">03</Badge>
                <span>Data moat: Collection of proprietary supply chain intelligence</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">04</Badge>
                <span>Ecosystem lock-in through extensive partner integrations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const PartnersCard = ({ 
  category, 
  count, 
  partnerNames 
}: { 
  category: string; 
  count: number;
  partnerNames: string[];
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-medium">{category} Partners</h4>
            <p className="text-3xl font-bold mt-1">{count}</p>
          </div>
          <Badge>{count > 40 ? 'Growing' : count > 20 ? 'Stable' : 'New'}</Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Top Partners:</p>
          <div className="flex flex-wrap gap-1">
            {partnerNames.map((name, index) => (
              <Badge key={index} variant="outline">{name}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketGrowthSection;
