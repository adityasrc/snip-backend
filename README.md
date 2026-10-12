# Snip: URL Shortener & Analytics

A scalable URL shortening service built with Node.js, MongoDB, and Redis. The architecture follows standard system design principles for URL shorteners, focusing on read-heavy optimizations, collision prevention, and zero-latency redirection.

**Live Frontend:** [https://trysnip.vercel.app](https://trysnip.vercel.app)  
**Live Backend:** [https://snip-backend.onrender.com](https://snip-backend.onrender.com)

## Tech Stack

- **Runtime:** Bun
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose) with compound indexing
- **Caching:** Redis (ioredis)
- **Validation:** Zod
- **Security:** Helmet, express-rate-limit, bcrypt

## System Architecture

Instead of basic CRUD, the system is designed to handle concurrency and read-heavy traffic efficiently:

- **Collision-Free URL Generation:** Uses a centralized MongoDB counter combined with Base62 encoding. This guarantees zero hash collisions and sequential uniqueness compared to random string generation (e.g., NanoID/MD5).
- **Cache-Aside Pattern:** Redis sits in front of MongoDB. URL mappings are cached in memory with a TTL. If Redis goes down, the system gracefully degrades and falls back to MongoDB.
- **Fire-and-Forget Analytics:** The server responds immediately with an HTTP 302 redirect. Analytics (Geo-IP lookup, User-Agent parsing) are executed asynchronously in the background so they never block the user's redirect latency.
- **SSRF Protection:** Strict Zod validation blocks internal network routing by preventing the shortening of `localhost`, `127.0.0.1`, and `.local` URLs (preventing Server-Side Request Forgery).

## Features

- Base62 auto-generated short IDs or custom aliases.
- Optional expiration dates (TTL checked at code-level to serve 410 Gone).
- Asynchronous click tracking (Device, Browser, Referrer, Country, 7-day timeline).
- JWT-based authentication and rate-limited endpoints.

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

Create a `.env` file in the root directory:

```env
PORT=10000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/snip
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_string
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://trysnip.vercel.app
```