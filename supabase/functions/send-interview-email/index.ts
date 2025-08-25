import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { send } from "https://deno.land/x/deno_smtp/mod.ts";
import { corsHeaders } from '../_shared/cors.ts'

console.log(`Function "send-interview-email" up and running!`);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { registrationId } = await req.json()
    if (!registrationId) throw new Error("Registration ID is required.");

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: registration, error: fetchError } = await supabaseAdmin
      .from('registrations')
      .select('email, full_name, interview_date, interview_link')
      .eq('id', registrationId)
      .single()

    if (fetchError) throw fetchError;
    if (!registration) throw new Error("Registration not found.");

    const smtpHost = Deno.env.get('SMTP_HOST');
    const smtpPort = Deno.env.get('SMTP_PORT');
    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPassword = Deno.env.get('SMTP_PASSWORD');

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || smtpHost === 'YOUR_SMTP_HOST') {
        const message = "Email sending is in simulation mode. Configure SMTP credentials to send real emails."
        console.warn(message);
        return new Response(JSON.stringify({ message, simulated: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    }

    const interviewDate = new Date(registration.interview_date).toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    console.log(`Attempting to send interview confirmation to: ${registration.email} via SMTP.`);
    
    await send({
      connection: {
        hostname: smtpHost,
        port: Number(smtpPort),
        tls: true,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      },
      from: `Career Redefine <${smtpUser}>`,
      to: [registration.email],
      subject: `Interview Scheduled with Career Redefine`,
      content: `Hi ${registration.full_name}, Your interview with Career Redefine has been scheduled.`,
      html: `
        <h1>Interview Confirmation</h1>
        <p>Hi ${registration.full_name},</p>
        <p>Your interview with Career Redefine has been scheduled for:</p>
        <p><strong>${interviewDate}</strong></p>
        <p>Please join using the following link: <a href="${registration.interview_link}">${registration.interview_link}</a></p>
        <p>We look forward to speaking with you!</p>
      `,
    });

    return new Response(JSON.stringify({ message: "Interview confirmation email sent successfully.", simulated: false }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
