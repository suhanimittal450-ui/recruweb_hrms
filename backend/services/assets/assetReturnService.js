const assetReturnRepository = require("../../repositories/assets/assetReturnRepository");
const assetAssignmentRepository = require("../../repositories/assets/assetAssignmentRepository");
const assetRepository = require("../../repositories/assets/assetRepository");

class AssetReturnService {
  // ===================================
  // Create Asset Return
  // ===================================
  async create(payload, userId) {
    const assignment = await assetAssignmentRepository.findById(
      payload.assignment,
    );

    if (!assignment) {
      throw new Error("Asset assignment not found.");
    }

    const existingReturn = await assetReturnRepository.findByAssignment(
      payload.assignment,
    );

    if (existingReturn) {
      throw new Error("Asset has already been returned.");
    }

    payload.asset = assignment.asset._id;
    payload.employee = assignment.employee._id;
    payload.returnedBy = userId;
    payload.receivedBy = payload.receivedBy || userId;
    payload.createdBy = userId;
    payload.updatedBy = userId;

    const assetReturn = await assetReturnRepository.create(payload);

    // Update Assignment
    await assetAssignmentRepository.update(assignment._id, {
      assignmentStatus: "RETURNED",
      actualReturnDate: payload.returnDate || new Date(),
      returnedCondition: payload.returnCondition,
      updatedBy: userId,
    });

    // Update Asset
    await assetRepository.update(assignment.asset._id, {
      status: "AVAILABLE",
      updatedBy: userId,
    });

    return assetReturn;
  }

  // ===================================
  // Get All Returns
  // ===================================
  async getAll(query) {
    return await assetReturnRepository.findAll(query);
  }

  // ===================================
  // Get Return By Id
  // ===================================
  async getById(id) {
    const assetReturn = await assetReturnRepository.findById(id);

    if (!assetReturn) {
      throw new Error("Asset return not found.");
    }

    return assetReturn;
  }

  // ===================================
  // Update Return
  // ===================================
  async update(id, payload, userId) {
    const assetReturn = await assetReturnRepository.findById(id);

    if (!assetReturn) {
      throw new Error("Asset return not found.");
    }

    payload.updatedBy = userId;

    return await assetReturnRepository.update(id, payload);
  }

  // ===================================
  // Delete Return
  // ===================================
  async delete(id, userId) {
    const assetReturn = await assetReturnRepository.findById(id);

    if (!assetReturn) {
      throw new Error("Asset return not found.");
    }

    return await assetReturnRepository.softDelete(id, userId);
  }

  // ===================================
  // Restore Return
  // ===================================
  async restore(id) {
    const assetReturn = await assetReturnRepository.restore(id);

    if (!assetReturn) {
      throw new Error("Asset return not found.");
    }

    return assetReturn;
  }

  // ===================================
  // Count
  // ===================================
  async count() {
    return await assetReturnRepository.count();
  }

  // ===================================
  // Damaged Returns
  // ===================================
  async damagedReturns() {
    return await assetReturnRepository.findDamagedReturns();
  }
}

module.exports = new AssetReturnService();
