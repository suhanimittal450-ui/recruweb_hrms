const Redis = require("ioredis");

let redis = null;

if (process.env.REDIS_URL && process.env.REDIS_URL.trim() !== "") {
  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 1,
    lazyConnect: true,
    enableOfflineQueue: false,
    retryStrategy() {
      return null;
    },
  });

  redis.on("connect", () => {
    console.log("✅ Redis Connected");
  });

  redis.on("error", (err) => {
    console.log("⚠ Redis Disabled :", err.message);
  });
} else {
  console.log("⚠ Redis Not Configured");
}

module.exports = redis;
