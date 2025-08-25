ALTER TABLE public.registrations
ADD CONSTRAINT registrations_email_key UNIQUE (email);

ALTER TABLE public.registrations
ADD CONSTRAINT registrations_phone_key UNIQUE (phone);
