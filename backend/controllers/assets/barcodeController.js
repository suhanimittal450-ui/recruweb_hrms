const barcodeService = require("../../services/assets/barcodeService");

class BarcodeController {
  // =====================================
  // Generate Barcode
  // =====================================
  async create(req, res, next) {
    try {
      const barcode = await barcodeService.create(req.body, req.user.id);

      return res.status(201).json({
        success: true,
        message: "Barcode generated successfully.",
        data: barcode,
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
      const result = await barcodeService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Barcodes fetched successfully.",
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
      const barcode = await barcodeService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Barcode fetched successfully.",
        data: barcode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get By Asset
  // =====================================
  async getByAsset(req, res, next) {
    try {
      const barcode = await barcodeService.getByAsset(req.params.assetId);

      return res.status(200).json({
        success: true,
        message: "Asset barcode fetched successfully.",
        data: barcode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Regenerate Barcode
  // =====================================
  async regenerate(req, res, next) {
    try {
      const barcode = await barcodeService.regenerate(
        req.params.id,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Barcode regenerated successfully.",
        data: barcode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Print Barcode
  // =====================================
  async print(req, res, next) {
    try {
      const barcode = await barcodeService.print(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Print count updated successfully.",
        data: barcode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Download Barcode
  // =====================================
  async download(req, res, next) {
    try {
      const barcode = await barcodeService.download(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Download count updated successfully.",
        data: barcode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Latest Generated
  // =====================================
  async latest(req, res, next) {
    try {
      const limit = req.query.limit || 10;

      const data = await barcodeService.latest(limit);

      return res.status(200).json({
        success: true,
        message: "Latest barcodes fetched successfully.",
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
      const total = await barcodeService.count();

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
      await barcodeService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Barcode deleted successfully.",
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
      const barcode = await barcodeService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Barcode restored successfully.",
        data: barcode,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BarcodeController();
