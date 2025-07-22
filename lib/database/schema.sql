-- AcquireFlow.ai Database Schema
-- Comprehensive data models for real estate investment platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company TEXT,
    role TEXT CHECK (role IN ('Lead Investor', 'Real Estate Agent', 'Property Manager', 'Wholesaler', 'Other')),
    phone TEXT,
    avatar_url TEXT,
    timezone TEXT DEFAULT 'America/Denver',
    language TEXT DEFAULT 'English',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Investment criteria for users
CREATE TABLE investment_criteria (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    min_price INTEGER,
    max_price INTEGER,
    target_locations TEXT[],
    property_types TEXT[],
    min_roi DECIMAL(5,2),
    max_cap_rate DECIMAL(5,2),
    min_cash_flow INTEGER,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Properties table
CREATE TABLE properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    price INTEGER,
    bedrooms INTEGER,
    bathrooms DECIMAL(3,1),
    square_feet INTEGER,
    lot_size INTEGER,
    year_built INTEGER,
    property_type TEXT,
    listing_status TEXT CHECK (listing_status IN ('active', 'pending', 'sold', 'off_market', 'coming_soon')),
    listing_date DATE,
    days_on_market INTEGER,
    mls_number TEXT,
    description TEXT,
    photos TEXT[],
    features TEXT[],
    neighborhood_score DECIMAL(3,1),
    walkability_score DECIMAL(3,1),
    school_rating DECIMAL(3,1),
    crime_rating DECIMAL(3,1),
    investment_metrics JSONB DEFAULT '{}',
    ai_score DECIMAL(3,1),
    deal_probability DECIMAL(5,2),
    is_bookmarked BOOLEAN DEFAULT FALSE,
    notes TEXT,
    source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property analysis and calculations
CREATE TABLE property_analysis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    purchase_price INTEGER,
    down_payment INTEGER,
    loan_amount INTEGER,
    interest_rate DECIMAL(5,3),
    loan_term INTEGER,
    estimated_rent INTEGER,
    monthly_expenses INTEGER,
    vacancy_rate DECIMAL(5,2),
    cap_rate DECIMAL(5,2),
    cash_on_cash_return DECIMAL(5,2),
    total_roi DECIMAL(5,2),
    monthly_cash_flow INTEGER,
    break_even_ratio DECIMAL(5,2),
    repair_costs INTEGER,
    closing_costs INTEGER,
    analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Market data and comparables
CREATE TABLE market_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    zip_code TEXT NOT NULL,
    city TEXT,
    state TEXT,
    median_home_price INTEGER,
    median_rent INTEGER,
    price_per_sqft DECIMAL(8,2),
    rent_per_sqft DECIMAL(6,2),
    median_cap_rate DECIMAL(5,2),
    price_growth_1yr DECIMAL(5,2),
    price_growth_5yr DECIMAL(5,2),
    rent_growth_1yr DECIMAL(5,2),
    inventory_months DECIMAL(4,2),
    market_hotness_score DECIMAL(3,1),
    data_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(zip_code, data_date)
);

-- Contacts (realtors, agents, wholesalers, etc.)
CREATE TABLE contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    contact_type TEXT CHECK (contact_type IN ('realtor', 'agent', 'wholesaler', 'investor', 'contractor', 'lender', 'other')),
    status TEXT CHECK (status IN ('active', 'prospect', 'inactive', 'lead')) DEFAULT 'prospect',
    source TEXT,
    tags TEXT[],
    notes TEXT,
    social_profiles JSONB DEFAULT '{}',
    deal_count INTEGER DEFAULT 0,
    total_deal_value INTEGER DEFAULT 0,
    last_contact_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact interactions and activity log
CREATE TABLE contact_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    interaction_type TEXT CHECK (interaction_type IN ('call', 'email', 'meeting', 'text', 'deal', 'note')) NOT NULL,
    subject TEXT,
    description TEXT,
    outcome TEXT,
    follow_up_date DATE,
    interaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communication campaigns
CREATE TABLE campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    campaign_type TEXT CHECK (campaign_type IN ('email', 'sms', 'direct_mail')) NOT NULL,
    status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')) DEFAULT 'draft',
    template_id UUID,
    target_criteria JSONB,
    recipients_count INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    responded_count INTEGER DEFAULT 0,
    scheduled_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Message templates for campaigns
CREATE TABLE message_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    template_type TEXT CHECK (template_type IN ('email', 'sms', 'loi')) NOT NULL,
    subject TEXT,
    content TEXT NOT NULL,
    variables JSONB DEFAULT '{}',
    category TEXT,
    usage_count INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Letters of Intent (LOIs)
CREATE TABLE lois (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id),
    contact_id UUID REFERENCES contacts(id),
    template_id UUID REFERENCES message_templates(id),
    property_address TEXT NOT NULL,
    offer_amount INTEGER NOT NULL,
    recipient_name TEXT,
    recipient_email TEXT,
    status TEXT CHECK (status IN ('draft', 'sent', 'viewed', 'responded', 'accepted', 'rejected', 'expired')) DEFAULT 'draft',
    terms JSONB DEFAULT '{}',
    personal_message TEXT,
    response_deadline DATE,
    sent_date TIMESTAMP WITH TIME ZONE,
    viewed_date TIMESTAMP WITH TIME ZONE,
    responded_date TIMESTAMP WITH TIME ZONE,
    response_details TEXT,
    document_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign recipients and tracking
CREATE TABLE campaign_recipients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'responded', 'bounced', 'failed')) DEFAULT 'pending',
    sent_date TIMESTAMP WITH TIME ZONE,
    delivered_date TIMESTAMP WITH TIME ZONE,
    opened_date TIMESTAMP WITH TIME ZONE,
    clicked_date TIMESTAMP WITH TIME ZONE,
    responded_date TIMESTAMP WITH TIME ZONE,
    bounce_reason TEXT,
    response_content TEXT,
    tracking_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User portfolios and investments
CREATE TABLE portfolios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    purchase_date DATE,
    purchase_price INTEGER,
    current_value INTEGER,
    monthly_rent INTEGER,
    monthly_expenses INTEGER,
    total_investment INTEGER,
    renovation_costs INTEGER,
    holding_period_months INTEGER,
    exit_strategy TEXT,
    status TEXT CHECK (status IN ('active', 'sold', 'pending_sale', 'under_contract')) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- Financial transactions and cash flow
CREATE TABLE transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    transaction_type TEXT CHECK (transaction_type IN ('income', 'expense', 'capital_improvement', 'repair', 'purchase', 'sale')) NOT NULL,
    category TEXT,
    amount INTEGER NOT NULL,
    description TEXT,
    transaction_date DATE NOT NULL,
    vendor TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports and analytics
CREATE TABLE reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    report_type TEXT CHECK (report_type IN ('portfolio_summary', 'property_performance', 'market_analysis', 'roi_analysis', 'cash_flow', 'tax_summary')) NOT NULL,
    parameters JSONB DEFAULT '{}',
    data JSONB,
    scheduled BOOLEAN DEFAULT FALSE,
    frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'quarterly', 'annually')),
    last_generated TIMESTAMP WITH TIME ZONE,
    recipients TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API integrations and settings
CREATE TABLE integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    integration_type TEXT NOT NULL,
    name TEXT NOT NULL,
    status TEXT CHECK (status IN ('connected', 'disconnected', 'error', 'syncing')) DEFAULT 'disconnected',
    credentials JSONB,
    settings JSONB DEFAULT '{}',
    last_sync TIMESTAMP WITH TIME ZONE,
    sync_frequency TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, integration_type)
);

-- User notifications and preferences
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User notification preferences
CREATE TABLE notification_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    email_notifications JSONB DEFAULT '{}',
    sms_notifications JSONB DEFAULT '{}',
    push_notifications JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Saved searches and alerts
CREATE TABLE saved_searches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    search_criteria JSONB NOT NULL,
    alert_frequency TEXT CHECK (alert_frequency IN ('instant', 'daily', 'weekly')) DEFAULT 'daily',
    is_active BOOLEAN DEFAULT TRUE,
    last_alert_sent TIMESTAMP WITH TIME ZONE,
    results_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property watchlist
CREATE TABLE watchlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    notes TEXT,
    alerts_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- Activity logs for audit trail
CREATE TABLE activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    activity_type TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    description TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_properties_price_range ON properties(price) WHERE listing_status = 'active';
CREATE INDEX idx_properties_location ON properties(city, state);
CREATE INDEX idx_properties_ai_score ON properties(ai_score DESC) WHERE ai_score IS NOT NULL;
CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_lois_user_id ON lois(user_id);
CREATE INDEX idx_lois_status ON lois(status);
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_transactions_portfolio_id ON transactions(portfolio_id);
CREATE INDEX idx_notifications_user_id_unread ON notifications(user_id) WHERE is_read = FALSE;
CREATE INDEX idx_market_data_location_date ON market_data(zip_code, data_date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investment_criteria_updated_at BEFORE UPDATE ON investment_criteria FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_message_templates_updated_at BEFORE UPDATE ON message_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lois_updated_at BEFORE UPDATE ON lois FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON saved_searches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE lois ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (users can only access their own data)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own investment criteria" ON investment_criteria FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own properties" ON properties FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own property analysis" ON property_analysis FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own contacts" ON contacts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own contact interactions" ON contact_interactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own campaigns" ON campaigns FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own message templates" ON message_templates FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own LOIs" ON lois FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own campaign recipients" ON campaign_recipients FOR ALL USING (auth.uid() IN (SELECT user_id FROM campaigns WHERE id = campaign_id));
CREATE POLICY "Users can manage own portfolios" ON portfolios FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own transactions" ON transactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own reports" ON reports FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own integrations" ON integrations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own notification preferences" ON notification_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own saved searches" ON saved_searches FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own watchlist" ON watchlist FOR ALL USING (auth.uid() = user_id);

-- Market data is publicly readable but only admins can write
CREATE POLICY "Market data is publicly readable" ON market_data FOR SELECT TO authenticated USING (true);

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    
    INSERT INTO public.investment_criteria (user_id)
    VALUES (new.id);
    
    INSERT INTO public.notification_preferences (user_id)
    VALUES (new.id);
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Comments for documentation
COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE properties IS 'Property listings and data from various sources';
COMMENT ON TABLE contacts IS 'Real estate contacts including agents, wholesalers, etc.';
COMMENT ON TABLE campaigns IS 'Email/SMS marketing campaigns';
COMMENT ON TABLE lois IS 'Letters of Intent generated and sent to sellers';
COMMENT ON TABLE portfolios IS 'User-owned investment properties';
COMMENT ON TABLE market_data IS 'Market statistics and trends by location'; 