# Snip: URL Shortener & Analytics

A scalable URL shortening service built with Node.js, MongoDB, and Redis. The architecture follows standard system design principles for URL shorteners, focusing on read-heavy optimizations, collision prevention, and low-latency redirection.

**Live Frontend:** [https://trysnip.vercel.app](https://trysnip.vercel.app)  
**Live Backend:** [https://snip-backend.onrender.com](https://snip-backend.onrender.com)

## Tech Stack

- **Runtime:** Bun
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose) with compound indexing
- **Caching:** Redis (ioredis)
- **Validation:** Zod
- **Security:** Helmet, express-rate-limit, bcrypt

## System Architecture

Instead of basic CRUD, the system is designed to handle concurrency and read-heavy traffic efficiently:

- **Collision-Free URL Generation:** Uses a centralized MongoDB counter combined with Base62 encoding. This guarantees zero hash collisions and sequential uniqueness compared to random string generation (e.g., NanoID/MD5).
- **Cache-Aside Pattern:** Redis sits in front of MongoDB. URL mappings are cached in memory with a TTL. If Redis goes down, the system gracefully degrades and falls back to MongoDB.
- **Fire-and-Forget Analytics:** The server responds immediately with an HTTP 302 redirect. Analytics (Geo-IP lookup, User-Agent parsing) are executed asynchronously in the background so they never block the user's redirect latency.
- **URL validation:** Zod validates standard URL format (requires protocol) and rejects URLs containing localhost or 127.0.0.1.

## Features

- Base62 auto-generated short IDs or custom aliases.
- Reserved aliases blocked for custom links: api, signin, signup, dashboard, analytics, 404.
- Optional expiration dates (redirects to /404?reason=expired).
- Asynchronous click tracking (Device, Browser, Referrer, Country, 7-day timeline).
- JWT-based authentication and rate-limited endpoints.

## API Contract

| Endpoint | Method | Request / Auth | Response / Behavior |
| --- | --- | --- | --- |
| `/:shortId` | GET | Optional `?ref=<referrer>` | 302 to destination; 302 to `${FRONTEND_URL}/404` if not found; 302 to `${FRONTEND_URL}/404?reason=expired` if expired |
| `/api/auth/signup` | POST | Body: `{ name, email, password }` | `201 { token, user: { id, name, email } }` |
| `/api/auth/signin` | POST | Body: `{ email, password }` | `200 { token, user: { id, name, email } }` |
| `/api/auth/me` | GET | Bearer token | `200 { user: { id, name, email } }` |
| JWT Payload | — | — | `{ id, name, email }` (signed with `JWT_SECRET`, expires 7d) |
| `/api/links` | GET | Bearer token | `200 { links: [link] }` (sorted newest first by `createdAt: -1`) |
| `/api/links/shorten` | POST | Bearer token, Body: `{ originalUrl, title?, customAlias?, expiresAt? }` | `200 { _id, finalId, originalUrl }` |
| `/api/links/:id` | PATCH | Bearer token, Body: `{ originalUrl?, title? }` | `200 { message: "Updated successfully" }` |
| `/api/links/:id` | DELETE | Bearer token | `200 { message: "Link and associated analytics deleted" }` |
| `/api/links/analytics/:linkId` | GET | Bearer token | `200 { link, analytics: { devices, browsers, countries, referrers, timeline, summary: { totalClicks, lastClick } } }` |

## Running Locally

Requires **Bun** and **Redis** to be installed.

```bash
# Clone the repository
git clone https://github.com/adityasrc/snip-backend.git
cd snip-backend

# Install dependencies
bun install

# Start the development server
bun run dev
```

The server will start on `http://localhost:10000`.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
PORT=10000
MONGO_URI=mongodb://localhost:27017/snip
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
FRONTEND_URL=http://localhost:5173
```