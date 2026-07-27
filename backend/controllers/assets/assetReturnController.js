const assetReturnService = require("../../services/assets/assetReturnService");

class AssetReturnController {
  // =====================================
  // Create Asset Return
  // =====================================
  async create(req, res, next) {
    try {
      const assetReturn = await assetReturnService.create(
        req.body,
        req.user.id,
      );

      return res.status(201).json({
        success: true,
        message: "Asset returned successfully.",
        data: assetReturn,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All Returns
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await assetReturnService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Asset returns fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get Return By Id
  // =====================================
  async getById(req, res, next) {
    try {
      const assetReturn = await assetReturnService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Asset return fetched successfully.",
        data: assetReturn,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Update Return
  // =====================================
  async update(req, res, next) {
    try {
      const assetReturn = await assetReturnService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Asset return updated successfully.",
        data: assetReturn,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Delete Return
  // =====================================
  async delete(req, res, next) {
    try {
      await assetReturnService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Asset return deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Restore Return
  // =====================================
  async restore(req, res, next) {
    try {
      const assetReturn = await assetReturnService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Asset return restored successfully.",
        data: assetReturn,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Count Returns
  // =====================================
  async count(req, res, next) {
    try {
      const total = await assetReturnService.count();

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
  // Damaged Returns
  // =====================================
  async damagedReturns(req, res, next) {
    try {
      const returns = await assetReturnService.damagedReturns();

      return res.status(200).json({
        success: true,
        message: "Damaged asset returns fetched successfully.",
        data: returns,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssetReturnController();
