-- Enterprise Onboarding Database Schema
-- This migration creates all necessary tables for the enterprise onboarding flow

-- Company Profiles Table
CREATE TABLE IF NOT EXISTS company_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    industry VARCHAR(100) NOT NULL,
    revenue BIGINT NOT NULL,
    employees INTEGER NOT NULL,
    suppliers INTEGER NOT NULL,
    regions INTEGER NOT NULL,
    compliance_frameworks JSONB DEFAULT '[]'::jsonb,
    current_tools JSONB DEFAULT '[]'::jsonb,
    risk_level VARCHAR(20) CHECK (risk_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROI Calculations Table
CREATE TABLE IF NOT EXISTS roi_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_profile_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
    cost_savings JSONB NOT NULL,
    risk_avoidance JSONB NOT NULL,
    revenue_impact JSONB NOT NULL,
    implementation JSONB NOT NULL,
    total_benefits DECIMAL(15,2) NOT NULL,
    total_costs DECIMAL(15,2) NOT NULL,
    net_benefit DECIMAL(15,2) NOT NULL,
    roi DECIMAL(8,2) NOT NULL,
    payback_period DECIMAL(6,2) NOT NULL,
    npv DECIMAL(15,2) NOT NULL,
    assumptions JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demo Requests Table
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_profile_id UUID REFERENCES company_profiles(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    employees VARCHAR(20),
    interests JSONB DEFAULT '[]'::jsonb,
    message TEXT,
    preferred_time VARCHAR(20),
    source VARCHAR(100),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    status VARCHAR(20) CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')) DEFAULT 'pending',
    priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    assigned_to VARCHAR(255),
    scheduled_date TIMESTAMP WITH TIME ZONE,
    meeting_link TEXT,
    notes TEXT,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Onboarding Steps Table
CREATE TABLE IF NOT EXISTS onboarding_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_profile_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
    step VARCHAR(50) CHECK (step IN ('profile', 'current_state', 'roi_calculation', 'demo_scheduled', 'pilot_approved', 'implementation', 'completed')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')) DEFAULT 'pending',
    data JSONB,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Implementation Plans Table
CREATE TABLE IF NOT EXISTS implementation_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_profile_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
    phase VARCHAR(20) CHECK (phase IN ('planning', 'pilot', 'rollout', 'optimization', 'completed')) DEFAULT 'planning',
    timeline JSONB NOT NULL,
    scope JSONB NOT NULL,
    team JSONB NOT NULL,
    budget JSONB NOT NULL,
    risks JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demo Feedback Table
CREATE TABLE IF NOT EXISTS demo_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_request_id UUID NOT NULL REFERENCES demo_requests(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    likelihood_to_purchase INTEGER CHECK (likelihood_to_purchase >= 1 AND likelihood_to_purchase <= 10),
    timeline_expectation VARCHAR(50),
    budget_range VARCHAR(50),
    decision_makers JSONB DEFAULT '[]'::jsonb,
    current_solutions TEXT,
    main_challenges TEXT,
    follow_up_requested BOOLEAN DEFAULT false,
    next_steps TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enterprise Opportunities Table (Sales Pipeline)
CREATE TABLE IF NOT EXISTS enterprise_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_profile_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
    demo_request_id UUID REFERENCES demo_requests(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    stage VARCHAR(50) CHECK (stage IN ('lead', 'qualified', 'demo', 'proposal', 'negotiation', 'closed_won', 'closed_lost')) DEFAULT 'lead',
    value DECIMAL(15,2),
    probability INTEGER CHECK (probability >= 0 AND probability <= 100) DEFAULT 0,
    expected_close_date DATE,
    actual_close_date DATE,
    lead_source VARCHAR(100),
    assigned_sales_rep VARCHAR(255),
    decision_criteria JSONB,
    competitors JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    last_activity_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS enterprise_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_profile_id UUID REFERENCES company_profiles(id) ON DELETE SET NULL,
    demo_request_id UUID REFERENCES demo_requests(id) ON DELETE SET NULL,
    opportunity_id UUID REFERENCES enterprise_opportunities(id) ON DELETE SET NULL,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    actor VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_company_profiles_industry ON company_profiles(industry);
CREATE INDEX IF NOT EXISTS idx_company_profiles_revenue ON company_profiles(revenue);
CREATE INDEX IF NOT EXISTS idx_company_profiles_created_at ON company_profiles(created_at);

CREATE INDEX IF NOT EXISTS idx_roi_calculations_company_profile_id ON roi_calculations(company_profile_id);
CREATE INDEX IF NOT EXISTS idx_roi_calculations_roi ON roi_calculations(roi);
CREATE INDEX IF NOT EXISTS idx_roi_calculations_created_at ON roi_calculations(created_at);

CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_priority ON demo_requests(priority);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_company ON demo_requests(company);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_demo_requests_assigned_to ON demo_requests(assigned_to);

CREATE INDEX IF NOT EXISTS idx_onboarding_steps_company_profile_id ON onboarding_steps(company_profile_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_steps_step ON onboarding_steps(step);
CREATE INDEX IF NOT EXISTS idx_onboarding_steps_status ON onboarding_steps(status);

CREATE INDEX IF NOT EXISTS idx_implementation_plans_company_profile_id ON implementation_plans(company_profile_id);
CREATE INDEX IF NOT EXISTS idx_implementation_plans_phase ON implementation_plans(phase);

CREATE INDEX IF NOT EXISTS idx_enterprise_opportunities_stage ON enterprise_opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_enterprise_opportunities_assigned_sales_rep ON enterprise_opportunities(assigned_sales_rep);
CREATE INDEX IF NOT EXISTS idx_enterprise_opportunities_expected_close_date ON enterprise_opportunities(expected_close_date);

CREATE INDEX IF NOT EXISTS idx_activity_logs_company_profile_id ON enterprise_activity_logs(company_profile_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_activity_type ON enterprise_activity_logs(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON enterprise_activity_logs(created_at);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_company_profiles_updated_at 
    BEFORE UPDATE ON company_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roi_calculations_updated_at 
    BEFORE UPDATE ON roi_calculations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demo_requests_updated_at 
    BEFORE UPDATE ON demo_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_steps_updated_at 
    BEFORE UPDATE ON onboarding_steps 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_implementation_plans_updated_at 
    BEFORE UPDATE ON implementation_plans 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demo_feedback_updated_at 
    BEFORE UPDATE ON demo_feedback 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enterprise_opportunities_updated_at 
    BEFORE UPDATE ON enterprise_opportunities 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE implementation_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_activity_logs ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (can be customized based on specific requirements)
CREATE POLICY "Enable read access for all users" ON company_profiles FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON company_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON company_profiles FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON roi_calculations FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON roi_calculations FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON demo_requests FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON demo_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON demo_requests FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON onboarding_steps FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON onboarding_steps FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON onboarding_steps FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON implementation_plans FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON implementation_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON implementation_plans FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON demo_feedback FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON demo_feedback FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON enterprise_opportunities FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON enterprise_opportunities FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON enterprise_opportunities FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON enterprise_activity_logs FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON enterprise_activity_logs FOR INSERT WITH CHECK (true);

-- Create views for common queries
CREATE OR REPLACE VIEW enterprise_pipeline_summary AS
SELECT 
    cp.industry,
    COUNT(DISTINCT cp.id) as total_companies,
    COUNT(DISTINCT dr.id) as demo_requests,
    COUNT(DISTINCT CASE WHEN dr.status = 'completed' THEN dr.id END) as completed_demos,
    COUNT(DISTINCT eo.id) as opportunities,
    SUM(CASE WHEN eo.stage = 'closed_won' THEN eo.value ELSE 0 END) as closed_revenue,
    AVG(rc.roi) as average_roi
FROM company_profiles cp
LEFT JOIN demo_requests dr ON cp.id = dr.company_profile_id
LEFT JOIN enterprise_opportunities eo ON cp.id = eo.company_profile_id
LEFT JOIN roi_calculations rc ON cp.id = rc.company_profile_id
GROUP BY cp.industry;

-- Create a view for onboarding funnel analysis
CREATE OR REPLACE VIEW onboarding_funnel AS
SELECT 
    step,
    COUNT(*) as total_companies,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
    ROUND(
        COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*), 
        2
    ) as completion_rate
FROM onboarding_steps
GROUP BY step
ORDER BY 
    CASE step
        WHEN 'profile' THEN 1
        WHEN 'current_state' THEN 2
        WHEN 'roi_calculation' THEN 3
        WHEN 'demo_scheduled' THEN 4
        WHEN 'pilot_approved' THEN 5
        WHEN 'implementation' THEN 6
        WHEN 'completed' THEN 7
    END;

-- Create materialized view for analytics dashboard (refresh periodically)
CREATE MATERIALIZED VIEW IF NOT EXISTS enterprise_analytics_dashboard AS
SELECT 
    DATE_TRUNC('month', cp.created_at) as month,
    cp.industry,
    COUNT(DISTINCT cp.id) as new_profiles,
    COUNT(DISTINCT dr.id) as demo_requests,
    COUNT(DISTINCT CASE WHEN dr.status IN ('scheduled', 'completed') THEN dr.id END) as qualified_demos,
    AVG(rc.roi) as avg_roi,
    AVG(rc.net_benefit) as avg_net_benefit,
    SUM(CASE WHEN eo.stage = 'closed_won' THEN eo.value ELSE 0 END) as revenue_won,
    COUNT(DISTINCT CASE WHEN eo.stage = 'closed_won' THEN eo.id END) as deals_won
FROM company_profiles cp
LEFT JOIN demo_requests dr ON cp.id = dr.company_profile_id
LEFT JOIN roi_calculations rc ON cp.id = rc.company_profile_id
LEFT JOIN enterprise_opportunities eo ON cp.id = eo.company_profile_id
WHERE cp.created_at >= DATE_TRUNC('month', NOW() - INTERVAL '12 months')
GROUP BY DATE_TRUNC('month', cp.created_at), cp.industry
ORDER BY month DESC, cp.industry;

-- Create index on materialized view
CREATE INDEX IF NOT EXISTS idx_enterprise_analytics_month ON enterprise_analytics_dashboard(month);
CREATE INDEX IF NOT EXISTS idx_enterprise_analytics_industry ON enterprise_analytics_dashboard(industry);

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_enterprise_analytics()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW enterprise_analytics_dashboard;
END;
$$ LANGUAGE plpgsql;

-- Create function to log enterprise activities
CREATE OR REPLACE FUNCTION log_enterprise_activity(
    p_company_profile_id UUID DEFAULT NULL,
    p_demo_request_id UUID DEFAULT NULL,
    p_opportunity_id UUID DEFAULT NULL,
    p_activity_type VARCHAR DEFAULT NULL,
    p_description TEXT DEFAULT NULL,
    p_actor VARCHAR DEFAULT NULL,
    p_metadata JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    new_id UUID;
BEGIN
    INSERT INTO enterprise_activity_logs (
        company_profile_id,
        demo_request_id,
        opportunity_id,
        activity_type,
        description,
        actor,
        metadata
    ) VALUES (
        p_company_profile_id,
        p_demo_request_id,
        p_opportunity_id,
        p_activity_type,
        p_description,
        p_actor,
        p_metadata
    ) RETURNING id INTO new_id;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON SCHEMA public IS 'Enterprise Onboarding Database Schema - Complete implementation for Atlas platform enterprise customer onboarding flow including ROI calculation, demo management, implementation planning, and sales pipeline tracking.';
