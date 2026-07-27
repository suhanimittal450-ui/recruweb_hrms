const depreciationRepository = require("../../repositories/assets/depreciationRepository");
const assetRepository = require("../../repositories/assets/assetRepository");
const purchaseDetailRepository = require("../../repositories/assets/purchaseDetailRepository");

class DepreciationService {
  // =====================================
  // Create
  // =====================================
  async create(payload, userId) {
    const asset = await assetRepository.findById(payload.asset);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    const purchase = await purchaseDetailRepository.findById(
      payload.purchaseDetail,
    );

    if (!purchase) {
      throw new Error("Purchase detail not found.");
    }

    const existing = await depreciationRepository.findByAsset(payload.asset);

    if (existing) {
      throw new Error("Depreciation already exists for this asset.");
    }

    payload.createdBy = userId;
    payload.updatedBy = userId;

    payload.purchaseCost = purchase.totalCost;

    switch (payload.method) {
      case "SLM":
        this.calculateSLM(payload);
        break;

      case "WDV":
        this.calculateWDV(payload);
        break;

      case "DECLINING_BALANCE":
        this.calculateDeclining(payload);
        break;

      default:
        this.calculateSLM(payload);
    }

    return await depreciationRepository.create(payload);
  }

  // =====================================
  // Straight Line Method
  // =====================================
  calculateSLM(data) {
    data.annualDepreciation =
      (data.purchaseCost - data.salvageValue) / data.usefulLifeYears;

    data.monthlyDepreciation = data.annualDepreciation / 12;

    data.accumulatedDepreciation = 0;

    data.currentBookValue = data.purchaseCost;
  }

  // =====================================
  // Written Down Value
  // =====================================
  calculateWDV(data) {
    data.annualDepreciation = (data.purchaseCost * data.depreciationRate) / 100;

    data.monthlyDepreciation = data.annualDepreciation / 12;

    data.accumulatedDepreciation = 0;

    data.currentBookValue = data.purchaseCost;
  }

  // =====================================
  // Declining Balance
  // =====================================
  calculateDeclining(data) {
    data.annualDepreciation = (data.purchaseCost * data.depreciationRate) / 100;

    data.monthlyDepreciation = data.annualDepreciation / 12;

    data.accumulatedDepreciation = 0;

    data.currentBookValue = data.purchaseCost;
  }

  // =====================================
  // Get All
  // =====================================
  async getAll(query) {
    return await depreciationRepository.findAll(query);
  }

  // =====================================
  // Get By Id
  // =====================================
  async getById(id) {
    const depreciation = await depreciationRepository.findById(id);

    if (!depreciation) {
      throw new Error("Depreciation record not found.");
    }

    return depreciation;
  }

  // =====================================
  // Update
  // =====================================
  async update(id, payload, userId) {
    const depreciation = await depreciationRepository.findById(id);

    if (!depreciation) {
      throw new Error("Depreciation record not found.");
    }

    payload.updatedBy = userId;

    const merged = {
      ...depreciation.toObject(),
      ...payload,
    };

    switch (merged.method) {
      case "SLM":
        this.calculateSLM(merged);
        break;

      case "WDV":
        this.calculateWDV(merged);
        break;

      case "DECLINING_BALANCE":
        this.calculateDeclining(merged);
        break;
    }

    return await depreciationRepository.update(id, merged);
  }

  // =====================================
  // Delete
  // =====================================
  async delete(id, userId) {
    const depreciation = await depreciationRepository.findById(id);

    if (!depreciation) {
      throw new Error("Depreciation record not found.");
    }

    return await depreciationRepository.softDelete(id, userId);
  }

  // =====================================
  // Restore
  // =====================================
  async restore(id) {
    const depreciation = await depreciationRepository.restore(id);

    if (!depreciation) {
      throw new Error("Depreciation record not found.");
    }

    return depreciation;
  }

  // =====================================
  // Count
  // =====================================
  async count() {
    return await depreciationRepository.count();
  }

  // =====================================
  // Monthly Report
  // =====================================
  async monthlyReport() {
    return await depreciationRepository.monthlyReport();
  }

  // =====================================
  // Annual Report
  // =====================================
  async annualReport() {
    return await depreciationRepository.annualReport();
  }

  // =====================================
  // Book Value Report
  // =====================================
  async bookValueReport() {
    return await depreciationRepository.bookValueReport();
  }
}

module.exports = new DepreciationService();
