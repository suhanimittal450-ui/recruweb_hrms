const assetMaintenanceRepository = require("../../repositories/assets/assetMaintenanceRepository");
const assetRepository = require("../../repositories/assets/assetRepository");
const vendorRepository = require("../../repositories/assets/vendorRepository");

class AssetMaintenanceService {
  // =====================================
  // Generate Maintenance Number
  // =====================================
  generateMaintenanceNumber() {
    return "AM-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }

  // =====================================
  // Create Maintenance
  // =====================================
  async create(payload, userId) {
    const asset = await assetRepository.findById(payload.asset);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    if (payload.vendor) {
      const vendor = await vendorRepository.findById(payload.vendor);

      if (!vendor) {
        throw new Error("Vendor not found.");
      }
    }

    if (!payload.maintenanceNumber) {
      payload.maintenanceNumber = this.generateMaintenanceNumber();
    }

    payload.createdBy = userId;
    payload.updatedBy = userId;

    return await assetMaintenanceRepository.create(payload);
  }

  // =====================================
  // Get All
  // =====================================
  async getAll(query) {
    return await assetMaintenanceRepository.findAll(query);
  }

  // =====================================
  // Get By Id
  // =====================================
  async getById(id) {
    const maintenance = await assetMaintenanceRepository.findById(id);

    if (!maintenance) {
      throw new Error("Maintenance record not found.");
    }

    return maintenance;
  }

  // =====================================
  // Update
  // =====================================
  async update(id, payload, userId) {
    const maintenance = await assetMaintenanceRepository.findById(id);

    if (!maintenance) {
      throw new Error("Maintenance record not found.");
    }

    if (payload.vendor) {
      const vendor = await vendorRepository.findById(payload.vendor);

      if (!vendor) {
        throw new Error("Vendor not found.");
      }
    }

    payload.updatedBy = userId;

    return await assetMaintenanceRepository.update(id, payload);
  }

  // =====================================
  // Complete Maintenance
  // =====================================
  async complete(id, payload, userId) {
    const maintenance = await assetMaintenanceRepository.findById(id);

    if (!maintenance) {
      throw new Error("Maintenance record not found.");
    }

    return await assetMaintenanceRepository.update(id, {
      status: "COMPLETED",
      completedDate: payload.completedDate || new Date(),
      nextMaintenanceDate: payload.nextMaintenanceDate,
      serviceReport: payload.serviceReport,
      remarks: payload.remarks,
      updatedBy: userId,
    });
  }

  // =====================================
  // Delete
  // =====================================
  async delete(id, userId) {
    const maintenance = await assetMaintenanceRepository.findById(id);

    if (!maintenance) {
      throw new Error("Maintenance record not found.");
    }

    return await assetMaintenanceRepository.softDelete(id, userId);
  }

  // =====================================
  // Restore
  // =====================================
  async restore(id) {
    const maintenance = await assetMaintenanceRepository.restore(id);

    if (!maintenance) {
      throw new Error("Maintenance record not found.");
    }

    return maintenance;
  }

  // =====================================
  // Count
  // =====================================
  async count() {
    return await assetMaintenanceRepository.count();
  }

  // =====================================
  // Upcoming Maintenance
  // =====================================
  async upcoming(days) {
    return await assetMaintenanceRepository.findUpcoming(days);
  }

  // =====================================
  // Overdue Maintenance
  // =====================================
  async overdue() {
    return await assetMaintenanceRepository.findOverdue();
  }
}

module.exports = new AssetMaintenanceService();
