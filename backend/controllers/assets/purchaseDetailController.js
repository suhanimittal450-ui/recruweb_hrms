const purchaseDetailService = require("../../services/assets/purchaseDetailService");

class PurchaseDetailController {
  // =====================================
  // Create Purchase
  // =====================================
  async create(req, res, next) {
    try {
      const purchase = await purchaseDetailService.create(
        req.body,
        req.user.id,
      );

      return res.status(201).json({
        success: true,
        message: "Purchase detail created successfully.",
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All Purchases
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await purchaseDetailService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Purchase details fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get Purchase By ID
  // =====================================
  async getById(req, res, next) {
    try {
      const purchase = await purchaseDetailService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Purchase detail fetched successfully.",
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Update Purchase
  // =====================================
  async update(req, res, next) {
    try {
      const purchase = await purchaseDetailService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Purchase detail updated successfully.",
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Delete Purchase
  // =====================================
  async delete(req, res, next) {
    try {
      await purchaseDetailService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Purchase detail deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Restore Purchase
  // =====================================
  async restore(req, res, next) {
    try {
      const purchase = await purchaseDetailService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Purchase detail restored successfully.",
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Count
  // =====================================
  async count(req, res, next) {
    try {
      const total = await purchaseDetailService.count();

      return res.status(200).json({
        success: true,
        data: {
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Payment Summary
  // =====================================
  async paymentSummary(req, res, next) {
    try {
      const summary = await purchaseDetailService.paymentSummary();

      return res.status(200).json({
        success: true,
        message: "Payment summary fetched successfully.",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Total Purchase Cost
  // =====================================
  async totalPurchaseCost(req, res, next) {
    try {
      const total = await purchaseDetailService.totalPurchaseCost();

      return res.status(200).json({
        success: true,
        data: {
          totalPurchaseCost: total,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PurchaseDetailController();
