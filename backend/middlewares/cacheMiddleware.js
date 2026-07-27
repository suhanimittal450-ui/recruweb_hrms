const cacheService = require("../services/cache/cacheService");

module.exports = (prefix = "", ttl = 300) => {
  return async (req, res, next) => {
    try {
      const key = prefix + ":" + req.originalUrl;

      const cache = await cacheService.get(key);

      if (cache) {
        return res.status(200).json({
          success: true,
          cache: true,
          data: cache,
        });
      }

      const oldJson = res.json;

      res.json = async (body) => {
        if (body.success) {
          await cacheService.set(key, body.data, ttl);
        }

        oldJson.call(res, body);
      };

      next();
    } catch (err) {
      next();
    }
  };
};
