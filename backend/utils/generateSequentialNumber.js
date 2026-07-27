/**
 * Generates a sequential, human-readable document number
 * e.g. generateDocNumber("PAYSLIP", 7, "PAYSLIP-000007")
 */
const generateSequentialNumber = (prefix, count) => {
  const next = (count || 0) + 1;
  return `${prefix}-${String(next).padStart(6, "0")}`;
};

module.exports = generateSequentialNumber;
