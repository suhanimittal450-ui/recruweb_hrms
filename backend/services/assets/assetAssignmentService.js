const assetAssignmentRepository = require("../../repositories/assets/assetAssignmentRepository");
const assetRepository = require("../../repositories/assets/assetRepository");
const employeeRepository = require("../../repositories/employee/employeeRepository");

class AssetAssignmentService {
  // ===================================
  // Assign Asset
  // ===================================
  async create(payload, userId) {
    const asset = await assetRepository.findById(payload.asset);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    const employee = await employeeRepository.findById(payload.employee);

    if (!employee) {
      throw new Error("Employee not found.");
    }

    if (asset.status !== "AVAILABLE") {
      throw new Error("Asset is not available for assignment.");
    }

    const activeAssignment = await assetAssignmentRepository.findActiveByAsset(
      payload.asset,
    );

    if (activeAssignment) {
      throw new Error("Asset is already assigned.");
    }

    payload.assignedBy = userId;
    payload.createdBy = userId;
    payload.updatedBy = userId;

    const assignment = await assetAssignmentRepository.create(payload);

    await assetRepository.update(payload.asset, {
      status: "ASSIGNED",
      updatedBy: userId,
    });

    return assignment;
  }

  // ===================================
  // Get All Assignments
  // ===================================
  async getAll(query) {
    return await assetAssignmentRepository.findAll(query);
  }

  // ===================================
  // Get Assignment By Id
  // ===================================
  async getById(id) {
    const assignment = await assetAssignmentRepository.findById(id);

    if (!assignment) {
      throw new Error("Assignment not found.");
    }

    return assignment;
  }

  // ===================================
  // Return Asset
  // ===================================
  async returnAsset(id, payload, userId) {
    const assignment = await assetAssignmentRepository.findById(id);

    if (!assignment) {
      throw new Error("Assignment not found.");
    }

    if (assignment.assignmentStatus === "RETURNED") {
      throw new Error("Asset has already been returned.");
    }

    const updated = await assetAssignmentRepository.update(id, {
      assignmentStatus: "RETURNED",
      actualReturnDate: payload.actualReturnDate || new Date(),
      returnedCondition: payload.returnedCondition,
      remarks: payload.remarks,
      updatedBy: userId,
    });

    await assetRepository.update(assignment.asset._id, {
      status: "AVAILABLE",
      updatedBy: userId,
    });

    return updated;
  }

  // ===================================
  // Update Assignment
  // ===================================
  async update(id, payload, userId) {
    const assignment = await assetAssignmentRepository.findById(id);

    if (!assignment) {
      throw new Error("Assignment not found.");
    }

    payload.updatedBy = userId;

    return await assetAssignmentRepository.update(id, payload);
  }

  // ===================================
  // Delete Assignment
  // ===================================
  async delete(id, userId) {
    const assignment = await assetAssignmentRepository.findById(id);

    if (!assignment) {
      throw new Error("Assignment not found.");
    }

    return await assetAssignmentRepository.softDelete(id, userId);
  }

  // ===================================
  // Restore Assignment
  // ===================================
  async restore(id) {
    const assignment = await assetAssignmentRepository.restore(id);

    if (!assignment) {
      throw new Error("Assignment not found.");
    }

    return assignment;
  }

  // ===================================
  // Assignment Count
  // ===================================
  async count() {
    return await assetAssignmentRepository.count();
  }

  // ===================================
  // Overdue Assignments
  // ===================================
  async overdue() {
    return await assetAssignmentRepository.findOverdue();
  }
}

module.exports = new AssetAssignmentService();
