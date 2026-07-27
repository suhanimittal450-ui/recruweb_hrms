const purchaseDetailRepository = require("../../repositories/assets/purchaseDetailRepository");
const assetRepository = require("../../repositories/assets/assetRepository");
const vendorRepository = require("../../repositories/assets/vendorRepository");

class PurchaseDetailService {
  // =====================================
  // Generate Purchase Number
  // =====================================
  generatePurchaseNumber() {
    return "PUR-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }

  // =====================================
  // Create Purchase
  // =====================================
  async create(payload, userId) {
    const asset = await assetRepository.findById(payload.asset);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    const vendor = await vendorRepository.findById(payload.vendor);

    if (!vendor) {
      throw new Error("Vendor not found.");
    }

    if (!payload.purchaseNumber) {
      payload.purchaseNumber = this.generatePurchaseNumber();
    }

    payload.totalCost =
      Number(payload.purchaseCost || 0) +
      Number(payload.taxAmount || 0) +
      Number(payload.shippingCost || 0) +
      Number(payload.installationCost || 0) -
      Number(payload.discountAmount || 0);

    payload.createdBy = userId;
    payload.updatedBy = userId;

    return await purchaseDetailRepository.create(payload);
  }

  // =====================================
  // Get All
  // =====================================
  async getAll(query) {
    return await purchaseDetailRepository.findAll(query);
  }

  // =====================================
  // Get By Id
  // =====================================
  async getById(id) {
    const purchase = await purchaseDetailRepository.findById(id);

    if (!purchase) {
      throw new Error("Purchase detail not found.");
    }

    return purchase;
  }

  // =====================================
  // Update
  // =====================================
  async update(id, payload, userId) {
    const purchase = await purchaseDetailRepository.findById(id);

    if (!purchase) {
      throw new Error("Purchase detail not found.");
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

    payload.totalCost =
      Number(payload.purchaseCost ?? purchase.purchaseCost) +
      Number(payload.taxAmount ?? purchase.taxAmount) +
      Number(payload.shippingCost ?? purchase.shippingCost) +
      Number(payload.installationCost ?? purchase.installationCost) -
      Number(payload.discountAmount ?? purchase.discountAmount);

    payload.updatedBy = userId;

    return await purchaseDetailRepository.update(id, payload);
  }

  // =====================================
  // Delete
  // =====================================
  async delete(id, userId) {
    const purchase = await purchaseDetailRepository.findById(id);

    if (!purchase) {
      throw new Error("Purchase detail not found.");
    }

    return await purchaseDetailRepository.softDelete(id, userId);
  }

  // =====================================
  // Restore
  // =====================================
  async restore(id) {
    const purchase = await purchaseDetailRepository.restore(id);

    if (!purchase) {
      throw new Error("Purchase detail not found.");
    }

    return purchase;
  }

  // =====================================
  // Count
  // =====================================
  async count() {
    return await purchaseDetailRepository.count();
  }

  // =====================================
  // Payment Summary
  // =====================================
  async paymentSummary() {
    return await purchaseDetailRepository.paymentSummary();
  }

  // =====================================
  // Total Purchase Cost
  // =====================================
  async totalPurchaseCost() {
    return await purchaseDetailRepository.totalPurchaseCost();
  }
}

module.exports = new PurchaseDetailService();
