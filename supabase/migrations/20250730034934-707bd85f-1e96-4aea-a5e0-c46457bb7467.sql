-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow admin read access" ON public.waitlist;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.waitlist;
DROP POLICY IF EXISTS "Allow public insert" ON public.waitlist;
DROP POLICY IF EXISTS "Allow waitlist signups" ON public.waitlist;

-- Create a single, clear policy for public inserts
CREATE POLICY "Allow waitlist signups" ON public.waitlist
FOR INSERT WITH CHECK (true);

-- Create a policy for reading (for admin purposes)
CREATE POLICY "Allow authenticated read" ON public.waitlist  
FOR SELECT USING (true);