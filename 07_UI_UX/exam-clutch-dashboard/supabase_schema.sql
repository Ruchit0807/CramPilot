-- Create custom types for enum-like behavior
CREATE TYPE target_marks_type AS ENUM ('pass', '55-70', '70-85', '85+');
CREATE TYPE exam_mode_type AS ENUM ('emergency', 'standard', 'thorough');
CREATE TYPE workflow_phase_type AS ENUM ('triage', 'coverage', 'recall', 'gap-repair', 'simulate', 'complete');

-- USERS (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE,
  credits_remaining INT DEFAULT 0,
  credits_expires_at TIMESTAMP WITH TIME ZONE,
  usage_limits JSONB DEFAULT '{}'::jsonb
);

-- AI CACHE (for future response caching and API cost optimization)
CREATE TABLE public.ai_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT UNIQUE NOT NULL,
  output_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- SESSIONS
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Nullable for Guest Mode
  guest_id UUID, -- For anonymous/guest sessions
  subject TEXT NOT NULL,
  subject_category TEXT,
  hours_remaining INT NOT NULL,
  target_marks target_marks_type,
  weak_topics TEXT[] DEFAULT '{}',
  professor_archetype TEXT,
  exam_mode exam_mode_type,
  current_phase workflow_phase_type DEFAULT 'triage',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_paid BOOLEAN DEFAULT FALSE
);

-- AI GENERATIONS (JSONB storage prioritized for MVP speed)
CREATE TABLE public.ai_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  generation_type TEXT NOT NULL, -- e.g., 'strategy', 'roadmap', 'prompts'
  content JSONB NOT NULL, -- Full GeneratedStrategy object here
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tokens_used INT,
  model_version TEXT,
  prompt_version TEXT,
  workflow_version TEXT
);

-- UPLOADED FILES
CREATE TABLE public.uploaded_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  guest_id UUID,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'pdf', 'image', etc.
  file_category TEXT, -- 'syllabus', 'pyq', 'notes'
  processing_status TEXT DEFAULT 'pending', -- 'queued', 'processing', 'completed', 'failed'
  error_message TEXT,
  page_count INT,
  extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- USAGE TRACKING
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  guest_id UUID,
  event_type TEXT NOT NULL, -- e.g., 'generate_strategy', 'upload_file'
  credits_used INT DEFAULT 0,
  model_used TEXT,
  estimated_cost NUMERIC(10, 6),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FEEDBACK
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  feedback_type TEXT NOT NULL, -- e.g., 'prediction_accuracy'
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PAYMENTS (Dodo Payments one-time purchases)
CREATE TABLE public.payments (
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

-- PAYMENT EVENTS (Audit log for webhooks and retries)
CREATE TABLE public.payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT UNIQUE NOT NULL, -- Dodo Webhook Event ID
  payment_id TEXT,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL -- 'processed', 'failed', 'ignored'
);

-- SYSTEM CONFIG (Real-time emergency controls and global limits)
CREATE TABLE public.app_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ANALYTICS VIEWS
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

-- ROW LEVEL SECURITY (RLS) POLICIES --

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read only app_config" ON public.app_config FOR SELECT USING (true);

-- MVP Security: 
-- We rely on Next.js Server Actions (using the Supabase Service Role Key) for handling guest logic securely.
-- These RLS policies allow authenticated users to act on their own data.
-- Guest operations will bypass RLS since they are executed exclusively on the server side using the service_role key.

CREATE POLICY "Users can read own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Allow select if user owns the session
CREATE POLICY "Users can read own sessions" ON public.sessions FOR SELECT USING (auth.uid() = user_id);
-- (Guest sessions are handled via Server Actions bypassing RLS using service_role)

CREATE POLICY "Users can read own generations" ON public.ai_generations FOR SELECT USING (
  session_id IN (SELECT id FROM public.sessions WHERE user_id = auth.uid())
);
