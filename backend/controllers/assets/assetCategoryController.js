const assetCategoryService = require("../../services/assets/assetCategoryService");

class AssetCategoryController {
  // =====================================
  // Create Asset Category
  // =====================================
  async create(req, res, next) {
    try {
      const category = await assetCategoryService.create(req.body, req.user.id);

      return res.status(201).json({
        success: true,
        message: "Asset category created successfully.",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All Asset Categories
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await assetCategoryService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Asset categories fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get Asset Category By Id
  // =====================================
  async getById(req, res, next) {
    try {
      const category = await assetCategoryService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Asset category fetched successfully.",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Update Asset Category
  // =====================================
  async update(req, res, next) {
    try {
      const category = await assetCategoryService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Asset category updated successfully.",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Soft Delete Asset Category
  // =====================================
  async delete(req, res, next) {
    try {
      await assetCategoryService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Asset category deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Restore Asset Category
  // =====================================
  async restore(req, res, next) {
    try {
      const category = await assetCategoryService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Asset category restored successfully.",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Asset Category Count
  // =====================================
  async count(req, res, next) {
    try {
      const total = await assetCategoryService.count();

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

module.exports = new AssetCategoryController();
