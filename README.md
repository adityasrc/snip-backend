# Snip — URL Shortener & Analytics

A lightweight, full-stack URL shortener with real-time analytics. Built as a portfolio project to demonstrate full-stack engineering with a clean, maintainable architecture.

**Live:** https://getsnip.vercel.app · **Backend:** https://snip-backend.onrender.com

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun |
| Framework | Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (jsonwebtoken) |
| Validation | Zod |
| Analytics parsing | geoip-lite, ua-parser-js |
| QR Codes | qrcode |
| Rate Limiting | express-rate-limit |

---

## Architecture

### Zero-Latency Redirect
The redirect handler sends the HTTP 302 **before** writing to the database. Analytics are parsed and saved asynchronously without blocking the user:

```js
res.redirect(302, link.originalUrl); // user is sent immediately

// runs after response, doesn't affect redirect speed
setImmediate(async () => {
  await ClickModel.create({ linkId, browser, device, country, city });
  await LinkModel.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } });
});
```

### Analytics Enrichment
Every click is enriched using local databases — no external API calls, no added latency:
- **geoip-lite**: maps IP → country + city using a local MaxMind DB
- **ua-parser-js**: parses the `User-Agent` header → browser + device type

### Auth
JWT-based stateless auth. Token is stored in `localStorage` on the client and sent via `Authorization: Bearer <token>` header on every request using an Axios interceptor.

---

## Data Models

### Link
```
shortId      (String, unique, indexed) — used for redirect lookup
originalUrl  (String, required)
customAlias  (String, sparse unique) — optional custom slug
userId       (ObjectId ref users, indexed)
clicks       (Number, default 0)
expiresAt    (Date, nullable) — null means no expiry
```

### Click
```
linkId    (ObjectId ref links, indexed)
timestamp (Date)
browser   (String)
device    (String)
country   (String)
city      (String)
referrer  (String)
```

---

## API Routes

### Auth — `/api/auth`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/signin` | Login, returns JWT |

### Links — `/api/links` (all protected by JWT middleware)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Get all links for authenticated user |
| POST | `/shorten` | Create a new short link |
| PATCH | `/:id` | Update title or destination URL |
| DELETE | `/:id` | Delete link and all its click data |
| GET | `/analytics/:linkId` | Get link + all click records |
| GET | `/qr/:shortId` | Generate QR code for a link |

### Redirect — `/`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/:shortId` | Redirect to original URL (zero-latency, async analytics) |

---

## Environment Variables

Create a `.env` file in the root:

```env
MD_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/snip
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
PORT=10000
```

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/adityasrc/snip-backend.git
cd snip-backend

# Install dependencies
bun install

# Start dev server
bun run index.js
```

Server runs on `http://localhost:10000`.

---

## Key Design Decisions

**Why Bun instead of Node?** Bun's native speed and built-in test runner made local development faster. The production deployment on Render is compatible with both.

**Why JWT + localStorage?** Simpler to implement and explain than sessions/cookies for a portfolio project. In production, `httpOnly` cookies would be preferred.

**Why geoip-lite vs an API?** Local DB lookup is instantaneous and free. The tradeoff is the DB needs manual updates for accuracy, but for this use case it's sufficient.

**Why sparse unique index on `customAlias`?** Allows multiple links to have `null` alias while still enforcing uniqueness on non-null values.
