
import React from 'react';
import GlobalImpactDashboard from '@/components/market-impact/GlobalImpactDashboard';
import MarketGrowthSection from '@/components/market-impact/MarketGrowthSection';
import RoiCalculator from '@/components/market-impact/RoiCalculator';
import ComplianceTools from '@/components/market-impact/ComplianceTools';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Shield, TrendingUp, DollarSign, FileCheck } from 'lucide-react';

const MarketImpactDashboard = () => {
  const [activeTab, setActiveTab] = React.useState<string>('impact');

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-muted/50 p-1">
            <TabsTrigger 
              value="impact" 
              onClick={() => setActiveTab('impact')}
              className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'impact' ? 'bg-background' : ''}`}
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Global Impact</span>
            </TabsTrigger>
            <TabsTrigger 
              value="growth" 
              onClick={() => setActiveTab('growth')}
              className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'growth' ? 'bg-background' : ''}`}
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Market Growth</span>
            </TabsTrigger>
            <TabsTrigger 
              value="roi" 
              onClick={() => setActiveTab('roi')}
              className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'roi' ? 'bg-background' : ''}`}
            >
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">ROI Calculator</span>
            </TabsTrigger>
            <TabsTrigger 
              value="compliance" 
              onClick={() => setActiveTab('compliance')}
              className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'compliance' ? 'bg-background' : ''}`}
            >
              <FileCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Compliance Tools</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {activeTab === 'impact' && <GlobalImpactDashboard />}
        {activeTab === 'growth' && <MarketGrowthSection />}
        {activeTab === 'roi' && <RoiCalculator />}
        {activeTab === 'compliance' && <ComplianceTools />}
      </div>
    </div>
  );
};

export default MarketImpactDashboard;
