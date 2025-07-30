-- Create waitlist table for email collection
CREATE TABLE IF NOT EXISTS public.waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  source VARCHAR(100) DEFAULT 'landing_page',
  ip_address INET,
  user_agent TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100), 
  utm_campaign VARCHAR(100),
  referrer_url TEXT,
  landing_page_url TEXT,
  device_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert (for waitlist signups)
CREATE POLICY "Allow public insert" ON public.waitlist
FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated read (for admin access)
CREATE POLICY "Allow authenticated read" ON public.waitlist  
FOR SELECT USING (true);

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on email for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_source ON public.waitlist(source);