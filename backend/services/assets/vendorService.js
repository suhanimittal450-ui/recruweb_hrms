const vendorRepository = require("../../repositories/assets/vendorRepository");

class VendorService {
  // ===================================
  // Create Vendor
  // ===================================
  async create(payload, userId) {
    const existingCode = await vendorRepository.findByVendorCode(
      payload.vendorCode,
    );

    if (existingCode) {
      throw new Error("Vendor code already exists.");
    }

    if (payload.email) {
      const existingEmail = await vendorRepository.findByEmail(payload.email);

      if (existingEmail) {
        throw new Error("Vendor email already exists.");
      }
    }

    payload.createdBy = userId;
    payload.updatedBy = userId;

    return await vendorRepository.create(payload);
  }

  // ===================================
  // Get All Vendors
  // ===================================
  async getAll(query) {
    return await vendorRepository.findAll(query);
  }

  // ===================================
  // Get Vendor By Id
  // ===================================
  async getById(id) {
    const vendor = await vendorRepository.findById(id);

    if (!vendor) {
      throw new Error("Vendor not found.");
    }

    return vendor;
  }

  // ===================================
  // Update Vendor
  // ===================================
  async update(id, payload, userId) {
    const vendor = await vendorRepository.findById(id);

    if (!vendor) {
      throw new Error("Vendor not found.");
    }

    if (
      payload.vendorCode &&
      payload.vendorCode.toUpperCase() !== vendor.vendorCode
    ) {
      const existingCode = await vendorRepository.findByVendorCode(
        payload.vendorCode,
      );

      if (existingCode) {
        throw new Error("Vendor code already exists.");
      }
    }

    if (payload.email && payload.email.toLowerCase() !== vendor.email) {
      const existingEmail = await vendorRepository.findByEmail(payload.email);

      if (existingEmail) {
        throw new Error("Vendor email already exists.");
      }
    }

    payload.updatedBy = userId;

    return await vendorRepository.update(id, payload);
  }

  // ===================================
  // Delete Vendor
  // ===================================
  async delete(id, userId) {
    const vendor = await vendorRepository.findById(id);

    if (!vendor) {
      throw new Error("Vendor not found.");
    }

    return await vendorRepository.softDelete(id, userId);
  }

  // ===================================
  // Restore Vendor
  // ===================================
  async restore(id) {
    const vendor = await vendorRepository.restore(id);

    if (!vendor) {
      throw new Error("Vendor not found.");
    }

    return vendor;
  }

  // ===================================
  // Vendor Count
  // ===================================
  async count() {
    return await vendorRepository.count();
  }
}

module.exports = new VendorService();
