ALTER TABLE registrations
DROP COLUMN IF EXISTS current_city,
DROP COLUMN IF EXISTS work_experience,
DROP COLUMN IF EXISTS current_role,
DROP COLUMN IF EXISTS why_interested,
DROP COLUMN IF EXISTS learning_goals,
DROP COLUMN IF EXISTS preferred_interview_time,
DROP COLUMN IF EXISTS hear_about_us;
