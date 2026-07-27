/**
 * Minimal request-body/query/params sanitizer.
 *
 * The project previously depended on `xss-clean`, which has been
 * unmaintained for years and does not handle modern XSS vectors well.
 * Rather than pull in an unmaintained dependency, this middleware does
 * the same basic job: strip <script> tags and HTML-encode characters
 * that are commonly used to break out of HTML/JS contexts.
 *
 * This is a defense-in-depth layer, not a replacement for output
 * encoding on the frontend (React already escapes rendered text) or
 * for parameterized queries (Mongoose already does this for us).
 */

const SCRIPT_TAG_RE = /<script\b[^>]*>[\s\S]*?<\/script>/gi;

function encode(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function sanitizeValue(value) {
  if (typeof value === "string") {
    return encode(value.replace(SCRIPT_TAG_RE, ""));
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      value[key] = sanitizeValue(value[key]);
    }
    return value;
  }

  return value;
}

const sanitizeInput = () => (req, res, next) => {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.params) req.params = sanitizeValue(req.params);
  // req.query is a getter-only property on newer Express versions; mutate
  // its keys in place rather than reassigning the object itself.
  if (req.query) sanitizeValue(req.query);

  next();
};

module.exports = sanitizeInput;
