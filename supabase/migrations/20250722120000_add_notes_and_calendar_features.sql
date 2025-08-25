/*
          # [Operation Name]
          Add Notes Column and RLS for Admin Features

          ## Query Description: [This migration adds a 'notes' column to the 'registrations' table to allow admins to save notes on applicants. It also enables Row Level Security (RLS) on the table and creates policies to ensure that only authenticated users (admins) can read and write data, while allowing public inserts for new applications. This is a crucial security enhancement.]
          
          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Medium"
          - Requires-Backup: false
          - Reversible: true
          
          ## Structure Details:
          - Table(s) Affected: `registrations`
          - Column(s) Added: `notes` (TEXT)
          
          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes
          - Auth Requirements: Policies are created for `authenticated` role and `anon` (public) role.
          
          ## Performance Impact:
          - Indexes: None
          - Triggers: None
          - Estimated Impact: Low. RLS checks will add a minor overhead to queries, which is negligible for this use case but essential for security.
          */

-- Add a 'notes' column to store admin notes for each applicant.
ALTER TABLE public.registrations ADD COLUMN notes TEXT;

-- Enable Row Level Security on the registrations table to protect data.
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent conflicts.
DROP POLICY IF EXISTS "Allow public insert for new applications" ON public.registrations;
DROP POLICY IF EXISTS "Allow admin read access to all applications" ON public.registrations;
DROP POLICY IF EXISTS "Allow admin update access to all applications" ON public.registrations;

-- Create a policy to allow anyone to submit a new application.
-- This is necessary for the public-facing registration form to work.
CREATE POLICY "Allow public insert for new applications"
ON public.registrations
FOR INSERT
WITH CHECK (true);

-- Create a policy to allow authenticated users (admins) to view all registration records.
CREATE POLICY "Allow admin read access to all applications"
ON public.registrations
FOR SELECT
TO authenticated
USING (true);

-- Create a policy to allow authenticated users (admins) to update any registration record.
-- This allows admins to change status, schedule interviews, and add notes.
CREATE POLICY "Allow admin update access to all applications"
ON public.registrations
FOR UPDATE
TO authenticated
USING (true);
