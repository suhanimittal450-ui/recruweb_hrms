const depreciationService = require("../../services/assets/depreciationService");

class DepreciationController {
  // =====================================
  // Create Depreciation
  // =====================================
  async create(req, res, next) {
    try {
      const depreciation = await depreciationService.create(
        req.body,
        req.user.id,
      );

      return res.status(201).json({
        success: true,
        message: "Depreciation created successfully.",
        data: depreciation,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await depreciationService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Depreciation records fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get By ID
  // =====================================
  async getById(req, res, next) {
    try {
      const depreciation = await depreciationService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Depreciation record fetched successfully.",
        data: depreciation,
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
      const depreciation = await depreciationService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Depreciation updated successfully.",
        data: depreciation,
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
      await depreciationService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Depreciation deleted successfully.",
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
      const depreciation = await depreciationService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Depreciation restored successfully.",
        data: depreciation,
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
      const total = await depreciationService.count();

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
  // Monthly Report
  // =====================================
  async monthlyReport(req, res, next) {
    try {
      const report = await depreciationService.monthlyReport();

      return res.status(200).json({
        success: true,
        message: "Monthly depreciation report fetched successfully.",
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Annual Report
  // =====================================
  async annualReport(req, res, next) {
    try {
      const report = await depreciationService.annualReport();

      return res.status(200).json({
        success: true,
        message: "Annual depreciation report fetched successfully.",
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Book Value Report
  // =====================================
  async bookValueReport(req, res, next) {
    try {
      const report = await depreciationService.bookValueReport();

      return res.status(200).json({
        success: true,
        message: "Asset book value report fetched successfully.",
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepreciationController();
