module.exports = {
  User: require("./auth/User"),
  Role: require("./auth/Role"),
  Permission: require("./auth/Permission"),
  RefreshToken: require("./auth/RefreshToken"),

  Company: require("./master/Company"),
  Branch: require("./master/Branch"),
  Department: require("./organization/Department"),
  Designation: require("./master/Designation"),

  Candidate: require("./candidate/Candidate"),
  Employee: require("./employee/Employee"),

  Shift: require("./shift/Shift"),
  Holiday: require("./holiday/Holiday"),

  Attendance: require("./attendance/Attendance"),

  LeaveType: require("./leave/LeaveType"),
  Leave: require("./leave/Leave"),
  LeaveBalance: require("./leave/LeaveBalance"),

  SalaryStructure: require("./payroll/SalaryStructure"),
  Payroll: require("./payroll/Payroll"),
  Payslip: require("./payroll/Payslip"),
  Loan: require("./payroll/Loan"),
  AdvanceSalary: require("./payroll/AdvanceSalary"),

  Job: require("./recruitment/Job"),
  Interview: require("./recruitment/Interview"),
  Offer: require("./recruitment/Offer"),

  Goal: require("./performance/Goal"),
  KPI: require("./performance/KPI"),
  PerformanceReview: require("./performance/PerformanceReview"),

  ShiftAssignment: require("./shift/ShiftAssignment"),

  Task: require("./task/Task"),

  Ticket: require("./helpdesk/Ticket"),
};
