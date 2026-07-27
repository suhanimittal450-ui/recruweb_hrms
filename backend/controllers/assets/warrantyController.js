const warrantyService = require("../../services/assets/warrantyService");

class WarrantyController {
  // =====================================
  // Create Warranty
  // =====================================
  async create(req, res, next) {
    try {
      const warranty = await warrantyService.create(req.body, req.user.id);

      return res.status(201).json({
        success: true,
        message: "Warranty created successfully.",
        data: warranty,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All Warranties
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await warrantyService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Warranties fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get Warranty By Id
  // =====================================
  async getById(req, res, next) {
    try {
      const warranty = await warrantyService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Warranty fetched successfully.",
        data: warranty,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Update Warranty
  // =====================================
  async update(req, res, next) {
    try {
      const warranty = await warrantyService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Warranty updated successfully.",
        data: warranty,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Delete Warranty
  // =====================================
  async delete(req, res, next) {
    try {
      await warrantyService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Warranty deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Restore Warranty
  // =====================================
  async restore(req, res, next) {
    try {
      const warranty = await warrantyService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Warranty restored successfully.",
        data: warranty,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Warranty Count
  // =====================================
  async count(req, res, next) {
    try {
      const total = await warrantyService.count();

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
  // Expiring Warranties
  // =====================================
  async expiring(req, res, next) {
    try {
      const days = req.query.days || 30;

      const warranties = await warrantyService.expiring(days);

      return res.status(200).json({
        success: true,
        message: "Expiring warranties fetched successfully.",
        data: warranties,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WarrantyController();
