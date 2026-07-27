const assetAssignmentService = require("../../services/assets/assetAssignmentService");

class AssetAssignmentController {
  // =====================================
  // Assign Asset
  // =====================================
  async create(req, res, next) {
    try {
      const assignment = await assetAssignmentService.create(
        req.body,
        req.user.id,
      );

      return res.status(201).json({
        success: true,
        message: "Asset assigned successfully.",
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All Assignments
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await assetAssignmentService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Assignments fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get Assignment By Id
  // =====================================
  async getById(req, res, next) {
    try {
      const assignment = await assetAssignmentService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Assignment fetched successfully.",
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Update Assignment
  // =====================================
  async update(req, res, next) {
    try {
      const assignment = await assetAssignmentService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Assignment updated successfully.",
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Return Asset
  // =====================================
  async returnAsset(req, res, next) {
    try {
      const assignment = await assetAssignmentService.returnAsset(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Asset returned successfully.",
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Delete Assignment
  // =====================================
  async delete(req, res, next) {
    try {
      await assetAssignmentService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Assignment deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Restore Assignment
  // =====================================
  async restore(req, res, next) {
    try {
      const assignment = await assetAssignmentService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Assignment restored successfully.",
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Assignment Count
  // =====================================
  async count(req, res, next) {
    try {
      const total = await assetAssignmentService.count();

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
  // Overdue Assignments
  // =====================================
  async overdue(req, res, next) {
    try {
      const assignments = await assetAssignmentService.overdue();

      return res.status(200).json({
        success: true,
        message: "Overdue assignments fetched successfully.",
        data: assignments,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssetAssignmentController();
