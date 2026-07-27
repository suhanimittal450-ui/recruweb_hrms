const assetService = require("../../services/assets/assetService");

class AssetController {
  // =====================================
  // Create Asset
  // =====================================
  async create(req, res, next) {
    try {
      const asset = await assetService.create(req.body, req.user.id);

      return res.status(201).json({
        success: true,
        message: "Asset created successfully.",
        data: asset,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All Assets
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await assetService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Assets fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get Asset By Id
  // =====================================
  async getById(req, res, next) {
    try {
      const asset = await assetService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Asset fetched successfully.",
        data: asset,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Update Asset
  // =====================================
  async update(req, res, next) {
    try {
      const asset = await assetService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Asset updated successfully.",
        data: asset,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Delete Asset (Soft Delete)
  // =====================================
  async delete(req, res, next) {
    try {
      await assetService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Asset deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Asset Count
  // =====================================
  async count(req, res, next) {
    try {
      const total = await assetService.count();

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
}

module.exports = new AssetController();
