/**
 * Converts an array of flat objects into a CSV string.
 * @param {Array<Object>} rows
 * @param {Array<{key:string,label:string}>} columns
 * @returns {string}
 */
const toCSV = (rows, columns) => {
  const escapeCell = (value) => {
    if (value === undefined || value === null) return "";
    const str = String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = columns.map((c) => escapeCell(c.label)).join(",");

  const lines = rows.map((row) =>
    columns.map((c) => escapeCell(row[c.key])).join(","),
  );

  return [header, ...lines].join("\n");
};

module.exports = toCSV;
