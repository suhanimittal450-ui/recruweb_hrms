const warrantyRepository = require("../../repositories/assets/warrantyRepository");
const assetRepository = require("../../repositories/assets/assetRepository");
const vendorRepository = require("../../repositories/assets/vendorRepository");

class WarrantyService {
  // ===================================
  // Create Warranty
  // ===================================
  async create(payload, userId) {
    const existingWarranty = await warrantyRepository.findByWarrantyNumber(
      payload.warrantyNumber,
    );

    if (existingWarranty) {
      throw new Error("Warranty number already exists.");
    }

    const asset = await assetRepository.findById(payload.asset);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    const vendor = await vendorRepository.findById(payload.vendor);

    if (!vendor) {
      throw new Error("Vendor not found.");
    }

    if (new Date(payload.startDate) >= new Date(payload.endDate)) {
      throw new Error("Warranty end date must be greater than start date.");
    }

    payload.createdBy = userId;
    payload.updatedBy = userId;

    return await warrantyRepository.create(payload);
  }

  // ===================================
  // Get All Warranties
  // ===================================
  async getAll(query) {
    return await warrantyRepository.findAll(query);
  }

  // ===================================
  // Get Warranty By Id
  // ===================================
  async getById(id) {
    const warranty = await warrantyRepository.findById(id);

    if (!warranty) {
      throw new Error("Warranty not found.");
    }

    return warranty;
  }

  // ===================================
  // Update Warranty
  // ===================================
  async update(id, payload, userId) {
    const warranty = await warrantyRepository.findById(id);

    if (!warranty) {
      throw new Error("Warranty not found.");
    }

    if (
      payload.warrantyNumber &&
      payload.warrantyNumber.toUpperCase() !== warranty.warrantyNumber
    ) {
      const existing = await warrantyRepository.findByWarrantyNumber(
        payload.warrantyNumber,
      );

      if (existing) {
        throw new Error("Warranty number already exists.");
      }
    }

    if (payload.asset) {
      const asset = await assetRepository.findById(payload.asset);

      if (!asset) {
        throw new Error("Asset not found.");
      }
    }

    if (payload.vendor) {
      const vendor = await vendorRepository.findById(payload.vendor);

      if (!vendor) {
        throw new Error("Vendor not found.");
      }
    }

    if (payload.startDate && payload.endDate) {
      if (new Date(payload.startDate) >= new Date(payload.endDate)) {
        throw new Error("Warranty end date must be greater than start date.");
      }
    }

    payload.updatedBy = userId;

    return await warrantyRepository.update(id, payload);
  }

  // ===================================
  // Delete Warranty
  // ===================================
  async delete(id, userId) {
    const warranty = await warrantyRepository.findById(id);

    if (!warranty) {
      throw new Error("Warranty not found.");
    }

    return await warrantyRepository.softDelete(id, userId);
  }

  // ===================================
  // Restore Warranty
  // ===================================
  async restore(id) {
    const warranty = await warrantyRepository.restore(id);

    if (!warranty) {
      throw new Error("Warranty not found.");
    }

    return warranty;
  }

  // ===================================
  // Warranty Count
  // ===================================
  async count() {
    return await warrantyRepository.count();
  }

  // ===================================
  // Expiring Warranties
  // ===================================
  async expiring(days = 30) {
    return await warrantyRepository.expiringWithin(days);
  }
}

module.exports = new WarrantyService();
