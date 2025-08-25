/*
# [Create Registrations Table and Policies]
This script creates the main 'registrations' table to store user application data and sets up Row Level Security (RLS) policies to control access.

## Query Description:
This is a foundational script for the application. It creates a new table and enables RLS, which is a critical security feature. Initially, the table will be empty. No existing data is at risk.

- **`registrations` table:** Stores all the details submitted by applicants through the registration form.
- **RLS Policies:**
  - **Public Insert:** Allows anyone to submit a new registration (create an application). This is necessary for the public-facing registration form to work.
  - **Admin Access:** Allows authenticated users (i.e., admins who have logged in) to view, update, and delete any registration records. This is essential for the admin dashboard functionality.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (The table can be dropped, but any submitted data would be lost).

## Structure Details:
- **Table Created:** `public.registrations`
- **Columns:** `id`, `created_at`, `full_name`, `email`, `phone`, `current_city`, `education`, `work_experience`, `current_role`, `why_interested`, `learning_goals`, `preferred_interview_time`, `hear_about_us`, `status`, `interview_link`, `interview_date`.

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes (New policies are created for insert and admin access).
- Auth Requirements: Required for read/update/delete operations. Public access is limited to insert only.

## Performance Impact:
- Indexes: A primary key index is created on the `id` column.
- Triggers: None.
- Estimated Impact: Minimal performance impact as this is a new table creation.
*/

-- Create the registrations table
CREATE TABLE public.registrations (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    full_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    current_city text NOT NULL,
    education text NOT NULL,
    work_experience text NOT NULL,
    current_role text NOT NULL,
    why_interested text NOT NULL,
    learning_goals text NOT NULL,
    preferred_interview_time text NOT NULL,
    hear_about_us text NOT NULL,
    status text NOT NULL DEFAULT 'pending'::text,
    interview_link text NULL,
    interview_date timestamp with time zone NULL,
    CONSTRAINT registrations_pkey PRIMARY KEY (id)
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.registrations IS 'Stores applicant registration data for the Career Redefine program.';
COMMENT ON COLUMN public.registrations.status IS 'The current status of the application (e.g., pending, approved, rejected, interviewed).';

-- Enable Row Level Security on the table
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public access to create new registrations
CREATE POLICY "Allow public insert"
ON public.registrations
FOR INSERT
WITH CHECK (true);

-- Policy: Allow admin users (authenticated) to manage all records
CREATE POLICY "Allow admin full access"
ON public.registrations
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
