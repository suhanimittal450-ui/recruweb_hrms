const logger = require("../config/logger");

module.exports = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    user: req.user?.id || "Guest",
  });

  next();
};
