# Book Converse

**Turn any book into a voice conversation.**

Upload a PDF and talk to an AI-powered reading companion that has actually read it. Ask questions, explore ideas, and discuss through natural voice conversations.

Built with Next.js, MongoDB, Clerk, Vapi, and ElevenLabs.

### Live Demo

Live Application: https://bookconverse.vercel.app/

## How it works

1. **Upload** — Drop in a PDF (plus an optional cover image), give it a title and author.
2. **Process** — The PDF is parsed in the browser (`pdfjs-dist`), split into indexed, searchable text segments, and stored alongside the original file in Vercel Blob.
3. **Choose a voice** — Pick from a set of preconfigured ElevenLabs voices/personas for your conversation partner.
4. **Talk** — Start a live voice session (via Vapi) with an assistant that pulls relevant passages from the book to ground its answers.
5. **Track** — Session length, usage, and book limits are enforced per subscription plan.

## Features

- **Real-time voice conversations** about the book's actual content, powered by [Vapi](https://vapi.ai) and ElevenLabs text-to-speech
- **PDF ingestion & segmentation** — books are parsed and chunked into searchable segments with page numbers and word counts
- **Content search** — MongoDB text search (with a regex fallback) surfaces the passages most relevant to what's being discussed
- **Selectable voices/personas** for the conversational assistant
- **Authentication** via Clerk, with per-user libraries
- **Subscription tiers** (Free / Standard / Pro) that gate the number of books, sessions per month, and max session duration
- **Personal library** — browse, search, and revisit uploaded books
- **Session tracking** — voice sessions are recorded with start/end time and duration for billing and history

## Tech stack

| Layer              | Technology                                                          |
| ------------------ | ------------------------------------------------------------------- |
| Framework          | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript |
| Styling            | Tailwind CSS 4, shadcn/ui (Radix primitives)                        |
| Animation          | Framer Motion                                                       |
| Auth               | [Clerk](https://clerk.com)                                          |
| Database           | MongoDB via [Mongoose](https://mongoosejs.com)                      |
| File storage       | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)          |
| Voice AI           | [Vapi](https://vapi.ai) + ElevenLabs                                |
| PDF parsing        | `pdfjs-dist`                                                        |
| Forms & validation | React Hook Form + Zod                                               |

## Project structure

```bash
bookconverse/
├── .env.local
├── .gitignore
├── app/
│   ├── (root)/
│   │   ├── books/
│   │   │   ├── new/                # Upload a new book
│   │   ├── library/                # User's book library
│   ├── api/
│   │   ├── upload/                 # Vercel Blob upload endpoint (auth-gated)
│   ├── books/
│   │   ├── [slug]/                 # Book detail / conversation page
│   ├── data/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
├── components/                     # UI components (uploader, voice controls, transcript, etc.)
├── database/
│   ├── models/                     # Book, BookSegment, VoiceSession Mongoose models
│   ├── mongoose.ts                 # DB connection helper
├── hooks/
│   ├── useSubscription.ts          # Plan/limit awareness
│   ├── useVapi.ts                  # Core voice-session hook (call lifecycle, transcripts, limits)
├── lib/
│   ├── actions/
│   │   ├── book.actions.ts         # Server actions (books, sessions)
│   │   ├── session.actions.ts
│   ├── constants.ts                # Voice options, file limits, Vapi/Clerk config
│   ├── subscription-constants.ts   # Plan limits
│   ├── subscription.server.ts      # Resolves the current user's plan
│   ├── utils.ts
│   ├── zod.ts
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── public/
│   ├── assets/
├── README.md
├── tsconfig.json
├── types.d.ts

```

## Getting started

### Prerequisites

- Node.js 18+
- A [MongoDB](https://www.mongodb.com/) database
- A [Clerk](https://clerk.com) application (for auth, with billing/plans configured if you want subscription limits enforced)
- A [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) store (`BLOB_READ_WRITE_TOKEN`)
- A [Vapi](https://vapi.ai) account with an assistant configured, plus an ElevenLabs voice setup

### Installation

```bash
git clone https://github.com/Sushmitha-SK/BookConverse.git
cd BookConverse
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```bash
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Vapi
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key
NEXT_PUBLIC_ASSISTANT_ID=your_vapi_assistant_id
```

> The Vapi assistant should be configured (via the Vapi dashboard) to accept `title`, `author`, and `bookId` variables, and to use the book-segment search flow for grounding responses in the uploaded content.

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Other scripts

```bash
npm run build   # production build
npm run start   # start production server
npm run lint    # run ESLint
```

## Subscription plans

| Plan     | Max books | Sessions / month | Max session length | Session history |
| -------- | --------- | ---------------- | ------------------ | --------------- |
| Free     | 1         | 5                | 5 min              | ✗               |
| Standard | 10        | 100              | 15 min             | ✓               |
| Pro      | 100       | Unlimited        | 60 min             | ✓               |

Plan limits are enforced server-side when creating books and starting voice sessions.

### Conclusion

BookConverse reimagines reading as a conversation, enabling users to interact with books through natural voice discussions powered by AI. By combining PDF understanding, semantic search, and real-time voice technology, it offers a more engaging and accessible way to explore knowledge.
