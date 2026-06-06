export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  const { model, prompt } = req.body;
  if (!model || !prompt) {
    return res.status(400).json({ error: 'Missing model or prompt.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://readme-gen.vercel.app',
        'X-Title': 'README Generator',
      },
      body: JSON.stringify({
        model,
        max_tokens: 4000,
        temperature: 0.65,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err?.error?.message || 'OpenRouter error: ' + response.status });
    }

    const data = await response.json();
    const readme = data.choices?.[0]?.message?.content?.trim();
    if (!readme) return res.status(500).json({ error: 'Model returned empty response.' });

    return res.status(200).json({ readme });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
