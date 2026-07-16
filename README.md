# Snip: URL Shortener & Analytics

A fast, lightweight, and secure URL shortener built to handle real traffic. I built this full-stack project to demonstrate clean backend architecture, focusing heavily on performance, data validation, and security.

**Live Frontend:** [https://sniphq.vercel.app](https://sniphq.vercel.app)

**Live Backend:** [https://snip-backend.onrender.com](https://snip-backend.onrender.com)

## The Tech Stack

* **Runtime:** Bun
* **Framework:** Node.js with Express
* **Database:** MongoDB (Mongoose)
* **Caching:** Redis (ioredis)
* **Security:** Helmet, native bcrypt, express-rate-limit
* **Validation:** Zod
* **Authentication:** JWT

## How It Works Under the Hood

### Lightning Fast Redirects

When someone clicks a short link, speed is the priority. The server checks the Redis cache first. If the link is found, the user is redirected instantly.

### Background Analytics

Nobody wants to wait for a page to load while the server saves tracking data. The redirect happens immediately, and the server processes the analytics (like parsing the user's location, browser, and device) entirely in the background.

### Bulletproof Inputs

Every single request that hits the server is strictly validated using Zod. This ensures bad data or malicious payloads never even make it to the database logic.

## Key Features

* **Custom Aliases:** Users can let the app generate a random Base62 short ID or pick their own custom URL slug.
* **QR Codes:** Every shortened link automatically gets a scannable QR code.
* **Link Expiration:** Links can be set to expire automatically at a specific date and time.
* **Detailed Analytics:** The dashboard tracks total clicks, referring websites, geographic locations, and device types.

## Running Locally

To test this out on your own machine, you will need Bun and Redis installed.

```bash
# Clone the repository
git clone https://github.com/adityasrc/snip-backend.git
cd snip-backend

# Install the dependencies
bun install

# Start the development server
bun run dev

```

The server will start on `http://localhost:10000`.

## Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
PORT=10000
MD_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/snip
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_string
FRONTEND_URL=http://localhost:5173

```