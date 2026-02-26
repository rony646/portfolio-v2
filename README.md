# Portfolio v2

Modern personal portfolio built with Next.js App Router and deployed to AWS with SST.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- SST v4 (AWS infrastructure and deploy)
- Radix UI + Lucide icons

## Infrastructure

Infrastructure is defined in `sst.config.ts`.

- `sst.aws.Nextjs("MyWeb")` deploys the Next.js app to AWS

## Project Structure

- `app/` - routes and layouts
- `components/` - reusable UI and sections
- `components/ProfileSection/` - hero/profile section
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

Or run with SST linked resources:

```bash
npx sst dev
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
