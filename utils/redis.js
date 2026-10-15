import { Redis } from "ioredis";

const client = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  lazyConnect: true,
  // prevents memory leaks by failing fast if redis goes down, allowing fallback to mongodb
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,
  retryStrategy(times) {
    if (times > 5) {
      return null;
    }
    return Math.min(times * 100, 2000);
  },
});

client.on("error", (err) => console.error("[Redis] Error:", err.message));
client.on("connect", () => console.log("[Redis] Connected"));

export function getRedisClient() {
  return client;
}