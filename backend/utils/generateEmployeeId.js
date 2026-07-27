const employeeRepository = require("../repositories/employee/employeeRepository");

const generateEmployeeId = async () => {
  const latestEmployee = await employeeRepository.findLatestEmployee();

  if (!latestEmployee) {
    return "EMP-000001";
  }

  const lastNumber = parseInt(latestEmployee.employeeId.split("-")[1], 10);

  const nextNumber = lastNumber + 1;

  return `EMP-${String(nextNumber).padStart(6, "0")}`;
};

module.exports = generateEmployeeId;
