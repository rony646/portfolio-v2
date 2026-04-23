# Portfolio v2

Modern personal portfolio built with Next.js App Router, deployed to AWS with SST, and featuring an AI-powered chat assistant.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- SST v4 (AWS infrastructure and deploy)
- Radix UI + Lucide icons
- OpenAI SDK + AWS SDK v3

## AI Features

An AI chat widget lets visitors ask questions about me, answered in first person from my LinkedIn profile.

- **Model**: OpenAI `gpt-4o` via the official `openai` SDK
- **Grounding**: System prompt + `content/linkedin_profile.txt` injected as context
- **Tool calling**: A `report_unknown_question` function tool is triggered when the model can't confidently answer, which sends me an email via Amazon SES and then generates a graceful fallback reply
- **API route**: `app/api/chat/route.ts`

## AWS Services

Provisioned and linked through `sst.config.ts`:

- **AWS Lambda + CloudFront** — via `sst.aws.Nextjs`, which deploys the Next.js app as serverless functions behind a CloudFront CDN
- **Amazon SES v2** — via `sst.aws.Email("TransactionalEmail")` for transactional emails (unknown-question notifications, contact form). Sender: `noreply@ronydev.com`
- **AWS Secrets (SST)** — `OpenAiApiKey` secret, securely linked to the Next.js runtime via `Resource.OpenAiApiKey.value`
- **Route 53 + ACM** — custom domain `ronydev.com` (with `www` redirect) in production, `{stage}.ronydev.com` for preview stages

## Project Structure

- `app/` - routes and layouts
  - `app/api/chat/` - AI chat endpoint (OpenAI + SES)
  - `app/api/send-email-example/` - SES email example
- `components/` - reusable UI and sections
  - `components/AIChatWidget/` - chat UI
  - `components/ProfileSection/` - hero/profile section
- `content/linkedin_profile.txt` - profile used as AI context
- `public/` - static assets
- `sst.config.ts` - SST infrastructure config

## Getting Started

Install dependencies:

```bash
npm install
```

Run local development:

```bash
npm run dev
```

Or run with SST linked resources (SES, secrets):

```bash
npx sst dev
```

Set the OpenAI key once per stage:

```bash
npx sst secret set OpenAiApiKey sk-...
```

Use only one dev command at a time (`npm run dev` or `npx sst dev`) to avoid lock conflicts in `.next/dev/lock`.

## Scripts

- `npm run dev` - start Next.js locally
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint
- `npm run format` - format code with Prettier
- `npm run format:check` - check formatting

## Deploy

Deploy to AWS with SST:

```bash
npx sst deploy --stage production
```

After deploy, check outputs in SST Console or via:

```bash
npx sst outputs --stage production
```

