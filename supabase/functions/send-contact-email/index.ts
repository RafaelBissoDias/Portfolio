const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { name, email, message } = await req.json()
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio RBD <onboarding@resend.dev>',
        to: ['rafaelbissodias@hotmail.com'],
        subject: `[Oportunidade] ${name} entrou em contato pelo seu portfólio`,
        html: `
          <div style="font-family:monospace;background:#050505;color:#e5e7eb;padding:32px;border-radius:12px;max-width:520px">
            <p style="color:#f97316;font-size:12px;letter-spacing:0.2em;text-transform:uppercase">&gt; novo_contato.sh</p>
            <h2 style="color:#fff;margin:16px 0">Rafael Bisso<span style="color:#f97316">.</span></h2>
            <hr style="border-color:#1f2937;margin:24px 0"/>
            <p><span style="color:#6b7280">Nome:</span> <strong style="color:#fff">${name}</strong></p>
            <p><span style="color:#6b7280">Email:</span> <a href="mailto:${email}" style="color:#f97316">${email}</a></p>
            <p style="color:#6b7280;margin-top:24px">Mensagem:</p>
            <p style="color:#d1d5db;border-left:2px solid #f97316;padding-left:16px;margin:8px 0">${message}</p>
          </div>
        `,
      }),
    })

    const data = await res.json()
    console.log('Resend response:', JSON.stringify(data))

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: res.ok ? 200 : 500,
    })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
