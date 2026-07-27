const vendorService = require("../../services/assets/vendorService");

class VendorController {
  // =====================================
  // Create Vendor
  // =====================================
  async create(req, res, next) {
    try {
      const vendor = await vendorService.create(req.body, req.user.id);

      return res.status(201).json({
        success: true,
        message: "Vendor created successfully.",
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All Vendors
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await vendorService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Vendors fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get Vendor By Id
  // =====================================
  async getById(req, res, next) {
    try {
      const vendor = await vendorService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Vendor fetched successfully.",
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Update Vendor
  // =====================================
  async update(req, res, next) {
    try {
      const vendor = await vendorService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Vendor updated successfully.",
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Delete Vendor
  // =====================================
  async delete(req, res, next) {
    try {
      await vendorService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Vendor deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Restore Vendor
  // =====================================
  async restore(req, res, next) {
    try {
      const vendor = await vendorService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Vendor restored successfully.",
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Vendor Count
  // =====================================
  async count(req, res, next) {
    try {
      const total = await vendorService.count();

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

module.exports = new VendorController();
