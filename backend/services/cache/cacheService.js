const redis = require("../../config/redis");

class CacheService {
  // ===============================
  // Get
  // ===============================
  async get(key) {
    try {
      if (!redis) return null;

      const value = await redis.get(key);

      if (!value) return null;

      return JSON.parse(value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // ===============================
  // Set
  // ===============================
  async set(key, value, ttl = 300) {
    try {
      if (!redis) return;

      await redis.set(key, JSON.stringify(value), "EX", ttl);
    } catch (error) {
      console.error(error);
    }
  }

  // ===============================
  // Delete
  // ===============================
  async del(key) {
    try {
      if (!redis) return;

      await redis.del(key);
    } catch (error) {
      console.error(error);
    }
  }

  // ===============================
  // Exists
  // ===============================
  async exists(key) {
    try {
      if (!redis) return false;

      return await redis.exists(key);
    } catch {
      return false;
    }
  }

  // ===============================
  // Flush
  // ===============================
  async flush() {
    try {
      if (!redis) return;

      await redis.flushdb();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new CacheService();
