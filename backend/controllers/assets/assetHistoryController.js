const assetHistoryService = require("../../services/assets/assetHistoryService");

class AssetHistoryController {
  // =====================================
  // Create History
  // =====================================
  async create(req, res, next) {
    try {
      const history = await assetHistoryService.create(req.body, req.user.id);

      return res.status(201).json({
        success: true,
        message: "Asset history created successfully.",
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All History
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await assetHistoryService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Asset history fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get History By ID
  // =====================================
  async getById(req, res, next) {
    try {
      const history = await assetHistoryService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Asset history fetched successfully.",
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get History By Asset
  // =====================================
  async getByAsset(req, res, next) {
    try {
      const result = await assetHistoryService.getByAsset(
        req.params.assetId,
        req.query,
      );

      return res.status(200).json({
        success: true,
        message: "Asset history fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Latest Activities
  // =====================================
  async latest(req, res, next) {
    try {
      const limit = req.query.limit || 10;

      const data = await assetHistoryService.latest(limit);

      return res.status(200).json({
        success: true,
        message: "Latest asset activities fetched successfully.",
        data,
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
      const total = await assetHistoryService.count();

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
  // Delete
  // =====================================
  async delete(req, res, next) {
    try {
      await assetHistoryService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Asset history deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Restore
  // =====================================
  async restore(req, res, next) {
    try {
      const history = await assetHistoryService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Asset history restored successfully.",
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssetHistoryController();
