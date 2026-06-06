# README Generator

AI-powered README generator. Paste a GitHub repo URL, it scans the code, and generates a proper README using OpenRouter.

## Deploy to Vercel

1. Fork or clone this repo
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo
3. In Vercel dashboard → Settings → Environment Variables, add:
   ```
   OPENROUTER_API_KEY = sk-or-v1-your-key-here
   ```
4. Deploy — done.

## Local development

```bash
npm i -g vercel
vercel dev
```

Copy `.env.example` to `.env.local` and add your key.

## License

MIT
