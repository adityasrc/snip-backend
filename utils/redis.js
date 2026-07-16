import { Redis } from "ioredis";

const client = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  lazyConnect: true,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});

client.on("error", (err) => console.error("[Redis] Error:", err.message));
client.on("connect", () => console.log("[Redis] Connected"));

export function getRedisClient() {
  return client;
}