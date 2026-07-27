const assetRepository = require("../../repositories/assets/assetRepository");

class AssetService {
  // ===================================
  // Create Asset
  // ===================================
  async create(payload, userId) {
    const existingCode = await assetRepository.findByCode(payload.assetCode);

    if (existingCode) {
      throw new Error("Asset code already exists.");
    }

    if (payload.serialNumber) {
      const existingSerial = await assetRepository.findBySerialNumber(
        payload.serialNumber,
      );

      if (existingSerial) {
        throw new Error("Serial number already exists.");
      }
    }

    payload.createdBy = userId;
    payload.updatedBy = userId;

    if (!payload.currentValue) {
      payload.currentValue = payload.purchaseCost || 0;
    }

    return await assetRepository.create(payload);
  }

  // ===================================
  // Get All Assets
  // ===================================
  async getAll(query) {
    return await assetRepository.findAll(query);
  }

  // ===================================
  // Get Asset By Id
  // ===================================
  async getById(id) {
    const asset = await assetRepository.findById(id);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    return asset;
  }

  // ===================================
  // Update Asset
  // ===================================
  async update(id, payload, userId) {
    const asset = await assetRepository.findById(id);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    if (
      payload.assetCode &&
      payload.assetCode.toUpperCase() !== asset.assetCode
    ) {
      const existing = await assetRepository.findByCode(payload.assetCode);

      if (existing) {
        throw new Error("Asset code already exists.");
      }
    }

    if (payload.serialNumber && payload.serialNumber !== asset.serialNumber) {
      const existing = await assetRepository.findBySerialNumber(
        payload.serialNumber,
      );

      if (existing) {
        throw new Error("Serial number already exists.");
      }
    }

    payload.updatedBy = userId;

    return await assetRepository.update(id, payload);
  }

  // ===================================
  // Delete Asset
  // ===================================
  async delete(id, userId) {
    const asset = await assetRepository.findById(id);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    return await assetRepository.softDelete(id, userId);
  }

  // ===================================
  // Asset Count
  // ===================================
  async count() {
    return await assetRepository.count();
  }
}

module.exports = new AssetService();
