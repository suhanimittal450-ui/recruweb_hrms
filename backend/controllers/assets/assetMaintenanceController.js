const assetMaintenanceService = require("../../services/assets/assetMaintenanceService");

class AssetMaintenanceController {
  // =====================================
  // Create Maintenance
  // =====================================
  async create(req, res, next) {
    try {
      const maintenance = await assetMaintenanceService.create(
        req.body,
        req.user.id,
      );

      return res.status(201).json({
        success: true,
        message: "Asset maintenance created successfully.",
        data: maintenance,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All Maintenance
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await assetMaintenanceService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Maintenance records fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get By Id
  // =====================================
  async getById(req, res, next) {
    try {
      const maintenance = await assetMaintenanceService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Maintenance record fetched successfully.",
        data: maintenance,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Update
  // =====================================
  async update(req, res, next) {
    try {
      const maintenance = await assetMaintenanceService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Maintenance updated successfully.",
        data: maintenance,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Complete Maintenance
  // =====================================
  async complete(req, res, next) {
    try {
      const maintenance = await assetMaintenanceService.complete(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Maintenance completed successfully.",
        data: maintenance,
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
      await assetMaintenanceService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Maintenance deleted successfully.",
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
      const maintenance = await assetMaintenanceService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Maintenance restored successfully.",
        data: maintenance,
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
      const total = await assetMaintenanceService.count();

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
  // Upcoming Maintenance
  // =====================================
  async upcoming(req, res, next) {
    try {
      const days = req.query.days || 30;

      const maintenance = await assetMaintenanceService.upcoming(days);

      return res.status(200).json({
        success: true,
        message: "Upcoming maintenance fetched successfully.",
        data: maintenance,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Overdue Maintenance
  // =====================================
  async overdue(req, res, next) {
    try {
      const maintenance = await assetMaintenanceService.overdue();

      return res.status(200).json({
        success: true,
        message: "Overdue maintenance fetched successfully.",
        data: maintenance,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssetMaintenanceController();
