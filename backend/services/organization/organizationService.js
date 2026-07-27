const Employee = require("../../models/employee/Employee");

const companyRepository = require("../../repositories/company/companyrepository");
const branchRepository = require("../../repositories/branch/branchrepository");
const departmentRepository = require("../../repositories/department/departmentrepository");
const designationRepository = require("../../repositories/designation/designationrepository");

class OrganizationService {
  // =====================================
  // COMPANY
  // =====================================
  async createCompany(data) {
    const exists = await companyRepository.findByCode(data.companyCode);

    if (exists) {
      throw new Error("Company code already exists.");
    }

    return companyRepository.create(data);
  }

  async getAllCompanies() {
    return companyRepository.findAll();
  }

  async getCompanyById(id) {
    const company = await companyRepository.findById(id);

    if (!company) {
      throw new Error("Company not found.");
    }

    return company;
  }

  async updateCompany(id, data) {
    await this.getCompanyById(id);

    if (data.companyCode) {
      const exists = await companyRepository.findByCode(data.companyCode);

      if (exists && exists._id.toString() !== id) {
        throw new Error("Company code already exists.");
      }
    }

    return companyRepository.update(id, data);
  }

  async deleteCompany(id) {
    await this.getCompanyById(id);

    const branchCount = await branchRepository.findByCompany(id);

    if (branchCount.length > 0) {
      throw new Error(
        "Cannot delete company that has branches. Remove branches first.",
      );
    }

    const employeeCount = await Employee.countDocuments({ company: id });

    if (employeeCount > 0) {
      throw new Error(
        "Cannot delete company that has employees assigned to it.",
      );
    }

    return companyRepository.delete(id);
  }

  // =====================================
  // BRANCH
  // =====================================
  async createBranch(data) {
    await this.getCompanyById(data.company);

    const exists = await branchRepository.findByCode(data.branchCode);

    if (exists) {
      throw new Error("Branch code already exists.");
    }

    return branchRepository.create(data);
  }

  async getAllBranches(filter = {}) {
    return branchRepository.findAll(filter);
  }

  async getBranchById(id) {
    const branch = await branchRepository.findById(id);

    if (!branch) {
      throw new Error("Branch not found.");
    }

    return branch;
  }

  async updateBranch(id, data) {
    await this.getBranchById(id);

    if (data.company) {
      await this.getCompanyById(data.company);
    }

    if (data.branchCode) {
      const exists = await branchRepository.findByCode(data.branchCode);

      if (exists && exists._id.toString() !== id) {
        throw new Error("Branch code already exists.");
      }
    }

    return branchRepository.update(id, data);
  }

  async deleteBranch(id) {
    await this.getBranchById(id);

    const employeeCount = await Employee.countDocuments({ branch: id });

    if (employeeCount > 0) {
      throw new Error(
        "Cannot delete branch that has employees assigned to it.",
      );
    }

    return branchRepository.delete(id);
  }

  // =====================================
  // DEPARTMENT
  // =====================================
  async createDepartment(data) {
    const exists = await departmentRepository.findByCode(data.departmentCode);

    if (exists) {
      throw new Error("Department code already exists.");
    }

    return departmentRepository.create(data);
  }

  async getAllDepartments() {
    return departmentRepository.findAll();
  }

  async getDepartmentById(id) {
    const department = await departmentRepository.findById(id);

    if (!department) {
      throw new Error("Department not found.");
    }

    return department;
  }

  async updateDepartment(id, data) {
    await this.getDepartmentById(id);

    if (data.departmentCode) {
      const exists = await departmentRepository.findByCode(data.departmentCode);

      if (exists && exists._id.toString() !== id) {
        throw new Error("Department code already exists.");
      }
    }

    return departmentRepository.update(id, data);
  }

  async deleteDepartment(id) {
    await this.getDepartmentById(id);

    const designationCount = await designationRepository.findByDepartment(id);

    if (designationCount.length > 0) {
      throw new Error(
        "Cannot delete department that has designations. Remove designations first.",
      );
    }

    const employeeCount = await Employee.countDocuments({ department: id });

    if (employeeCount > 0) {
      throw new Error(
        "Cannot delete department that has employees assigned to it.",
      );
    }

    return departmentRepository.delete(id);
  }

  // =====================================
  // DESIGNATION
  // =====================================
  async createDesignation(data) {
    await this.getDepartmentById(data.department);

    const exists = await designationRepository.findByCode(data.designationCode);

    if (exists) {
      throw new Error("Designation code already exists.");
    }

    return designationRepository.create(data);
  }

  async getAllDesignations(filter = {}) {
    return designationRepository.findAll(filter);
  }

  async getDesignationById(id) {
    const designation = await designationRepository.findById(id);

    if (!designation) {
      throw new Error("Designation not found.");
    }

    return designation;
  }

  async updateDesignation(id, data) {
    await this.getDesignationById(id);

    if (data.department) {
      await this.getDepartmentById(data.department);
    }

    if (data.designationCode) {
      const exists = await designationRepository.findByCode(
        data.designationCode,
      );

      if (exists && exists._id.toString() !== id) {
        throw new Error("Designation code already exists.");
      }
    }

    return designationRepository.update(id, data);
  }

  async deleteDesignation(id) {
    await this.getDesignationById(id);

    const employeeCount = await Employee.countDocuments({ designation: id });

    if (employeeCount > 0) {
      throw new Error(
        "Cannot delete designation that has employees assigned to it.",
      );
    }

    return designationRepository.delete(id);
  }

  // =====================================
  // REPORTING HIERARCHY
  // =====================================

  // -----------------------------
  // Get Reporting Chain (employee -> manager -> ... -> top)
  // -----------------------------
  async getReportingChain(employeeId) {
    const chain = [];

    let current = await Employee.findById(employeeId).populate(
      "reportingManager",
      "employeeId user reportingManager",
    );

    if (!current) {
      throw new Error("Employee not found.");
    }

    // Guard against accidental cycles in existing data
    const visited = new Set([employeeId.toString()]);

    let manager = current.reportingManager;

    while (manager) {
      if (visited.has(manager._id.toString())) {
        break;
      }

      visited.add(manager._id.toString());

      const managerDoc = await Employee.findById(manager._id)
        .populate("user", "firstName lastName email")
        .populate("designation", "designationName")
        .populate("department", "departmentName");

      chain.push(managerDoc);

      const next = await Employee.findById(manager._id).select(
        "reportingManager",
      );

      manager = next?.reportingManager
        ? await Employee.findById(next.reportingManager)
        : null;
    }

    return chain;
  }

  // -----------------------------
  // Get Direct Reports (subordinates)
  // -----------------------------
  async getDirectReports(employeeId) {
    await this.getEmployeeOrThrow(employeeId);

    return Employee.find({ reportingManager: employeeId })
      .populate("user", "firstName lastName email")
      .populate("designation", "designationName")
      .populate("department", "departmentName");
  }

  // -----------------------------
  // Assign / Change Reporting Manager (with cycle prevention)
  // -----------------------------
  async assignReportingManager(employeeId, managerId) {
    if (employeeId.toString() === managerId?.toString()) {
      throw new Error("An employee cannot report to themselves.");
    }

    await this.getEmployeeOrThrow(employeeId);

    if (managerId) {
      await this.getEmployeeOrThrow(managerId);

      const isCyclic = await this.isDescendant(employeeId, managerId);

      if (isCyclic) {
        throw new Error(
          "Invalid assignment: this would create a circular reporting structure.",
        );
      }
    }

    return Employee.findByIdAndUpdate(
      employeeId,
      { reportingManager: managerId || null },
      { returnDocument: "after", runValidators: true },
    ).populate("reportingManager", "employeeId user");
  }

  // -----------------------------
  // Helper: is `candidateManagerId` a descendant (subordinate,
  // direct or indirect) of `employeeId`? Used to prevent cycles.
  // -----------------------------
  async isDescendant(employeeId, candidateManagerId) {
    const directReports = await Employee.find({
      reportingManager: employeeId,
    }).select("_id");

    for (const report of directReports) {
      if (report._id.toString() === candidateManagerId.toString()) {
        return true;
      }

      const deeper = await this.isDescendant(report._id, candidateManagerId);

      if (deeper) {
        return true;
      }
    }

    return false;
  }

  async getEmployeeOrThrow(employeeId) {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found.");
    }

    return employee;
  }

  // =====================================
  // ORGANIZATION TREE
  // =====================================

  // -----------------------------
  // Build the full company org tree, or the subtree rooted
  // at a given employee if rootEmployeeId is provided.
  // -----------------------------
  async getOrganizationTree(rootEmployeeId = null) {
    const employees = await Employee.find({ status: "Active" })
      .populate("user", "firstName lastName email")
      .populate("designation", "designationName")
      .populate("department", "departmentName")
      .lean();

    const nodeMap = new Map();

    employees.forEach((emp) => {
      nodeMap.set(emp._id.toString(), {
        employeeId: emp._id,
        code: emp.employeeId,
        name: emp.user
          ? `${emp.user.firstName || ""} ${emp.user.lastName || ""}`.trim()
          : null,
        email: emp.user?.email || null,
        designation: emp.designation?.designationName || null,
        department: emp.department?.departmentName || null,
        children: [],
      });
    });

    const roots = [];

    employees.forEach((emp) => {
      const node = nodeMap.get(emp._id.toString());

      const managerId = emp.reportingManager
        ? emp.reportingManager.toString()
        : null;

      if (managerId && nodeMap.has(managerId)) {
        nodeMap.get(managerId).children.push(node);
      } else {
        roots.push(node);
      }
    });

    if (rootEmployeeId) {
      const subtreeRoot = nodeMap.get(rootEmployeeId.toString());

      if (!subtreeRoot) {
        throw new Error("Employee not found or inactive.");
      }

      return subtreeRoot;
    }

    return roots;
  }
}

module.exports = new OrganizationService();
