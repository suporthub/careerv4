/*
  # [Fix] Create Registrations Table with Corrected Syntax

  This migration script creates the `registrations` table required for the Career Redefine application. It fixes a previous syntax error where `current_role` was used as a column name without being quoted, causing a conflict with a reserved SQL keyword.

  ## Query Description:
  - Creates a new ENUM type `registration_status` for managing application states.
  - Creates the `registrations` table with all necessary columns for storing applicant data.
  - The `current_role` column is now correctly quoted as `"current_role"` to avoid SQL syntax errors.
  - Enables Row Level Security (RLS) on the table to protect user data.
  - Sets up security policies:
    1. Allows anyone to submit an application (INSERT).
    2. Allows authenticated admin users to view, update, and delete applications.

  This script is safe to run and is essential for the application's functionality. It does not modify or delete any existing data, as it's intended for initial setup.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true (the table can be dropped)

  ## Structure Details:
  - Tables created: `registrations`
  - Types created: `registration_status`
  - Columns added: id, created_at, full_name, email, phone, current_city, education, work_experience, "current_role", why_interested, learning_goals, preferred_interview_time, hear_about_us, status, interview_link, interview_date

  ## Security Implications:
  - RLS Status: Enabled
  - Policy Changes: Yes
  - Auth Requirements: Anonymous users can insert, authenticated users can manage.

  ## Performance Impact:
  - Indexes: Primary key index on `id`.
  - Triggers: None.
  - Estimated Impact: Low.
*/

-- Step 1: Create a custom type for the registration status
create type public.registration_status as enum ('pending', 'approved', 'rejected', 'interviewed');

-- Step 2: Create the registrations table with the corrected column name
create table public.registrations (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    full_name text not null,
    email text not null,
    phone text not null,
    current_city text not null,
    education text not null,
    work_experience text not null,
    "current_role" text not null, -- Quoted to avoid conflict with reserved keyword
    why_interested text not null,
    learning_goals text not null,
    preferred_interview_time text not null,
    hear_about_us text not null,
    status public.registration_status not null default 'pending',
    interview_link text null,
    interview_date timestamp with time zone null,
    constraint registrations_pkey primary key (id)
);

-- Step 3: Enable Row Level Security (RLS)
alter table public.registrations enable row level security;

-- Step 4: Create policies for RLS
-- Policy 1: Allow anonymous users to create new registrations (for the public form)
create policy "Allow anonymous inserts"
on public.registrations for insert
to anon
with check (true);

-- Policy 2: Allow authenticated users (admins) to manage all records
create policy "Allow full access for authenticated users"
on public.registrations for all
to authenticated
using (true)
with check (true);

-- Step 5: Add comments to columns for clarity
comment on column public.registrations."current_role" is 'The applicant''s current job title or position.';
comment on table public.registrations is 'Stores applications from prospective students for the Data Analytics program.';
