const assetHistoryRepository = require("../../repositories/assets/assetHistoryRepository");
const assetRepository = require("../../repositories/assets/assetRepository");

class AssetHistoryService {
  // =====================================
  // Create History Entry
  // =====================================
  async create(payload, userId) {
    const asset = await assetRepository.findById(payload.asset);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    payload.createdBy = userId;

    return await assetHistoryRepository.create(payload);
  }

  // =====================================
  // Log History (Reusable)
  // =====================================
  async log({
    asset,
    action,
    previousValue = null,
    newValue = null,
    referenceModel = null,
    referenceId = null,
    remarks = "",
    ipAddress = "",
    deviceInfo = "",
    userId,
  }) {
    return await assetHistoryRepository.create({
      asset,
      action,
      previousValue,
      newValue,
      referenceModel,
      referenceId,
      remarks,
      ipAddress,
      deviceInfo,
      createdBy: userId,
    });
  }

  // =====================================
  // Get History By Id
  // =====================================
  async getById(id) {
    const history = await assetHistoryRepository.findById(id);

    if (!history) {
      throw new Error("Asset history not found.");
    }

    return history;
  }

  // =====================================
  // Get History By Asset
  // =====================================
  async getByAsset(assetId, query) {
    const asset = await assetRepository.findById(assetId);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    return await assetHistoryRepository.findByAsset(assetId, query);
  }

  // =====================================
  // Get All History
  // =====================================
  async getAll(query) {
    return await assetHistoryRepository.findAll(query);
  }

  // =====================================
  // Delete
  // =====================================
  async delete(id, userId) {
    const history = await assetHistoryRepository.findById(id);

    if (!history) {
      throw new Error("Asset history not found.");
    }

    return await assetHistoryRepository.softDelete(id, userId);
  }

  // =====================================
  // Restore
  // =====================================
  async restore(id) {
    const history = await assetHistoryRepository.restore(id);

    if (!history) {
      throw new Error("Asset history not found.");
    }

    return history;
  }

  // =====================================
  // Latest Activities
  // =====================================
  async latest(limit = 10) {
    return await assetHistoryRepository.latest(limit);
  }

  // =====================================
  // Count
  // =====================================
  async count() {
    return await assetHistoryRepository.count();
  }
}

module.exports = new AssetHistoryService();
