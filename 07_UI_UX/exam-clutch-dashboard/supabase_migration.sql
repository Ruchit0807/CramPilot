-- Run this script in your Supabase SQL Editor to safely update your existing database.

-- 1. Update users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS credits_remaining INT DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS credits_expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS usage_limits JSONB DEFAULT '{}'::jsonb;

-- 2. Update ai_generations table
ALTER TABLE public.ai_generations ADD COLUMN IF NOT EXISTS model_version TEXT;
ALTER TABLE public.ai_generations ADD COLUMN IF NOT EXISTS prompt_version TEXT;
ALTER TABLE public.ai_generations ADD COLUMN IF NOT EXISTS workflow_version TEXT;

-- 3. Update uploaded_files table
ALTER TABLE public.uploaded_files ADD COLUMN IF NOT EXISTS error_message TEXT;
ALTER TABLE public.uploaded_files ADD COLUMN IF NOT EXISTS page_count INT;

-- 4. Update usage_tracking table
ALTER TABLE public.usage_tracking ADD COLUMN IF NOT EXISTS credits_used INT DEFAULT 0;
ALTER TABLE public.usage_tracking ADD COLUMN IF NOT EXISTS model_used TEXT;
ALTER TABLE public.usage_tracking ADD COLUMN IF NOT EXISTS estimated_cost NUMERIC(10, 6);

-- 5. Create Payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  payment_id TEXT UNIQUE NOT NULL, -- Dodo Payment ID
  dodo_customer_id TEXT,
  amount INT NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL, -- 'succeeded', 'failed', 'refunded'
  product_type TEXT NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create Payment Events table
CREATE TABLE IF NOT EXISTS public.payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT UNIQUE NOT NULL, -- Dodo Webhook Event ID
  payment_id TEXT,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL -- 'processed', 'failed', 'ignored'
);

-- 7. Create App Config table
CREATE TABLE IF NOT EXISTS public.app_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert safe defaults for emergency controls if not exists
INSERT INTO public.app_config (key, value)
VALUES ('emergency_controls', '{"force_disable_ai": false, "emergency_free_mode": false, "provider_disable_switches": []}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 8. Create Analytics Views
CREATE OR REPLACE VIEW public.daily_ai_metrics AS
SELECT 
  DATE_TRUNC('day', created_at) as day,
  event_type,
  model_used,
  COUNT(id) as total_requests,
  SUM(credits_used) as total_credits_consumed,
  SUM(estimated_cost) as total_cost_usd
FROM public.usage_tracking
GROUP BY 1, 2, 3;

CREATE OR REPLACE VIEW public.conversion_metrics AS
SELECT
  DATE_TRUNC('day', purchased_at) as day,
  product_type,
  status,
  COUNT(id) as total_purchases,
  SUM(amount) / 100.0 as revenue_usd
FROM public.payments
GROUP BY 1, 2, 3;

-- 9. Add RLS Policies for new tables
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Safely recreate policy using a DO block to prevent "policy already exists" error
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Admin read only app_config' AND tablename = 'app_config'
  ) THEN
    CREATE POLICY "Admin read only app_config" ON public.app_config FOR SELECT USING (true);
  END IF;
END
$$;
