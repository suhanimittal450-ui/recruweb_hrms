const employeeRepository = require("../../repositories/employee/employeeRepository");
const cacheInvalidator = require("../../helpers/cacheInvalidator");
const Employee = require("../../models/employee/Employee");

const DEFAULT_ONBOARDING_STEPS = [
  "Upload identity documents (Aadhaar, PAN)",
  "Upload resume",
  "Sign offer letter",
  "Complete bank details for payroll",
  "Complete IT / asset setup",
  "Meet reporting manager",
];

class EmployeeService {
  async createEmployee(data) {
    // Generate Employee ID
    const random = Math.floor(100000 + Math.random() * 900000);
    data.employeeId = `EMP-${random}`;

    // Timeline
    data.timeline = [
      {
        action: "Employee Created",
        by: data.createdBy || null,
        date: new Date(),
      },
    ];

    data.onboarding = DEFAULT_ONBOARDING_STEPS.map((task) => ({ task, completed: false }));

    const employee = await employeeRepository.create(data);
    await cacheInvalidator.dashboard();
    return employee;
  }

  async getAllEmployees(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const filter = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.department) {
      filter.department = query.department;
    }

    if (query.branch) {
      filter.branch = query.branch;
    }

    return await employeeRepository.findAll(filter, {
      page,
      limit,
      search: query.search || "",
      sortBy: query.sortBy || "createdAt",
      order: query.order || "desc",
    });
  }

  async getEmployeeById(id) {
    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  }

  // There was previously no way for a logged-in Employee to fetch their own
  // record — /employees/:id required knowing the Employee document's _id,
  // which the frontend only has for Admin/HR. This looks it up by the
  // authenticated User's _id instead.
  async getMyEmployeeRecord(userId) {
    const employee = await Employee.findOne({ user: userId })
      .populate("user")
      .populate("candidate")
      .populate("company")
      .populate("branch")
      .populate("department")
      .populate("designation")
      .populate("reportingManager");

    if (!employee) {
      throw new Error("No employee profile linked to this account yet");
    }

    return employee;
  }

  async updateEmployee(id, data) {
    const employee = await employeeRepository.update(id, data);

    if (!employee) {
      throw new Error("Employee not found");
    }

    await cacheInvalidator.employee(employee._id);
    return employee;
  }

  async deleteEmployee(id) {
    const employee = await employeeRepository.delete(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    await cacheInvalidator.employee(id);
    return true;
  }

  // ------------------------------------------------------------------
  // Documents (upload / list / verify)
  // ------------------------------------------------------------------
  async addDocument(employeeId, { type, fileUrl, originalName }) {
    const employee = await Employee.findById(employeeId);
    if (!employee) throw new Error("Employee not found");

    employee.documents.push({ type, fileUrl, originalName, status: "Pending" });
    employee.timeline.push({ action: `Uploaded document: ${type}`, date: new Date() });
    await employee.save();
    await cacheInvalidator.employee(employeeId);
    return employee;
  }

  async listDocuments(employeeId) {
    const employee = await Employee.findById(employeeId).select("documents");
    if (!employee) throw new Error("Employee not found");
    return employee.documents;
  }

  async verifyDocument(employeeId, documentId, { status, remarks, verifiedBy }) {
    const employee = await Employee.findById(employeeId);
    if (!employee) throw new Error("Employee not found");

    const doc = employee.documents.id(documentId);
    if (!doc) throw new Error("Document not found");

    doc.status = status;
    doc.remarks = remarks;
    doc.verifiedBy = verifiedBy;
    doc.verifiedAt = new Date();

    employee.timeline.push({ action: `Document ${doc.type} marked ${status}`, by: verifiedBy, date: new Date() });
    await employee.save();
    await cacheInvalidator.employee(employeeId);
    return employee;
  }

  // ------------------------------------------------------------------
  // Onboarding checklist
  // ------------------------------------------------------------------
  async listOnboarding(employeeId) {
    const employee = await Employee.findById(employeeId).select("onboarding");
    if (!employee) throw new Error("Employee not found");
    return employee.onboarding;
  }

  // Flat list of pending documents across all employees, for the HR
  // verification queue. There was no aggregate endpoint for this before —
  // without it, HR would have had to open each employee individually.
  async listPendingDocuments() {
    const employees = await Employee.find({ "documents.status": "Pending" })
      .populate("user", "firstName lastName email")
      .select("user employeeId documents");

    const pending = [];
    employees.forEach((emp) => {
      emp.documents
        .filter((doc) => doc.status === "Pending")
        .forEach((doc) => {
          pending.push({
            employeeId: emp._id,
            employeeName: `${emp.user?.firstName || ""} ${emp.user?.lastName || ""}`.trim(),
            employeeCode: emp.employeeId,
            documentId: doc._id,
            type: doc.type,
            fileUrl: doc.fileUrl,
            originalName: doc.originalName,
            uploadedAt: doc.uploadedAt,
          });
        });
    });
    return pending;
  }

  async toggleOnboardingStep(employeeId, stepId, completed) {
    const employee = await Employee.findById(employeeId);
    if (!employee) throw new Error("Employee not found");

    const step = employee.onboarding.id(stepId);
    if (!step) throw new Error("Onboarding step not found");

    step.completed = completed;
    step.completedAt = completed ? new Date() : null;

    await employee.save();
    await cacheInvalidator.employee(employeeId);
    return employee.onboarding;
  }
}

module.exports = new EmployeeService();
