# Ezra Odyn — Technical Publication & Services

A personal platform with two purposes:

- **Learn from me** — Technical publication with articles on AI, software engineering, cybersecurity, and system design.
- **Work with us** — Professional tech & creative services including web development, marketing, design, video, and AI.

Built with Next.js 16, React 19, Tailwind CSS 4, and GSAP.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Animations:** GSAP + ScrollTrigger
- **Icons:** Lucide React
- **Fonts:** Space Grotesk + Space Mono
- **Markdown:** react-markdown + rehype-highlight
- **Language:** TypeScript

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
├── page.tsx                    # Homepage — articles, about
├── layout.tsx                  # Root layout (fonts, metadata)
├── globals.css                 # Global styles, prose, animations
├── [slug]/page.tsx             # Article detail pages
├── admin/page.tsx              # Article management (passcode protected)
├── services/page.tsx           # Services landing page
├── services/[slug]/page.tsx    # Service detail pages
├── api/articles/route.ts       # Articles CRUD API
├── api/articles/[id]/route.ts  # Single article API
└── components/
    ├── Navigation.tsx          # Adaptive nav (articles vs services)
    ├── Hero.tsx                # Homepage hero
    ├── Articles.tsx            # Article grid with search & categories
    ├── About.tsx               # Author section
    ├── Footer.tsx              # Site footer
    ├── AdminGate.tsx           # Admin authentication gate
    ├── CustomCursor.tsx        # Custom cursor effect
    └── PixelParticles.tsx      # Background particle animation

data/
├── articles/                   # Article JSON files (sample data included)
└── services.ts                 # Service definitions & categories
```

---

## Features

### Publication (`/`)

- Article listing with category filters and search
- Featured article highlight
- Markdown rendering with syntax highlighting
- Mobile-optimized reading experience
- Reading time, date, tags, and category metadata

### Services (`/services`)

- 5 service categories: Build, Grow, Create, Media, Technology
- 16 individual service pages with features, deliverables, and process
- Interactive 5-step quote request form
- Web development pricing tiers (Starter → Custom)
- Team section (Ezra Odyn + Mwenda, CEO RedAppleKE)
- WhatsApp integration with pre-filled messages
- Contact form with service selection and budget range

### Admin (`/admin`)

- Passcode-protected article management
- Create, edit, delete articles
- Markdown editor for content and premium content
- Draft/publish workflow
- Category and tag management

**Default credentials:**
- Email: `ezraakush@gmail.com`
- Passcode: `Dev#101`

### Paid Content

- Articles can be marked free or premium
- Premium content is paywalled with a subtle lock
- Content gated server-side via API (not just CSS/JS hiding)
- Simple one-time payment model

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/articles` | List all articles (supports `?q=search` and `?status=published`) |
| `POST` | `/api/articles` | Create a new article |
| `GET` | `/api/articles/[id]` | Get article by ID or slug |
| `PUT` | `/api/articles/[id]` | Update an article |
| `DELETE` | `/api/articles/[id]` | Delete an article |

---

## Data

Articles are stored as JSON files in `data/articles/`. Each article includes:

```json
{
  "id": "art001",
  "slug": "article-slug",
  "title": "Article Title",
  "description": "Short description",
  "date": "2025-09-15",
  "readingTime": "8 MIN",
  "category": "AI",
  "tags": ["Tag1", "Tag2"],
  "content": "Markdown content...",
  "premiumContent": "Locked content (optional)",
  "isPremium": false,
  "price": 9,
  "status": "published"
}
```

Services are defined in `data/services.ts` with full metadata including features, deliverables, complexity levels, and process steps.

---

## Deployment (Vercel)

```bash
# Build
npm run build

# Or deploy directly to Vercel
npx vercel
```

No special configuration needed. Vercel auto-detects Next.js and handles API routes via serverless functions.

**Note:** The `data/` directory must be committed to git — it contains all articles and service definitions.

---

## Environment

No environment variables required for basic functionality. The project uses:

- File-based article storage (`data/articles/`)
- Hardcoded service definitions (`data/services.ts`)
- Client-side session storage for admin auth

---

## License

Private — Ezra Odyn
