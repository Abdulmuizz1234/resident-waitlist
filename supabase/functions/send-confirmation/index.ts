const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer re_TXgeQW4N_9MGTmZ5Qx3eCGL6h1s9Ba1MT',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'You are on the Residency Rate waitlist!',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2 style="color: #2563EB;">You are on the list! 🎉</h2>
            <p>Hey there,</p>
            <p>Thanks for joining the Residency Rate waitlist. We are building the platform that medical residents deserve.</p>
            <p>We will reach out as soon as we are ready to give you access.</p>
            <br/>
            <p>— The Residency Rate Team</p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    console.log('Resend response:', data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.log('Error:', err);
    return new Response(JSON.stringify({ success: false }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }

});