import { Redis } from "ioredis";

let client = null;

export function getRedisClient() {
  if (!client) {
    client = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
      lazyConnect: true,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 1,
    });
    client.on("error", (err) => console.error("[Redis] Error:", err.message));
    client.on("connect", () => console.log("[Redis] Connected"));
  }
  return client;
}
