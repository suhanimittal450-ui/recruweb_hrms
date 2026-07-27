const qrCodeService = require("../../services/assets/qrCodeService");

class QRCodeController {
  // =====================================
  // Generate QR Code
  // =====================================
  async update(req, res, next) {
    try {
      const qrCode = await qrCodeService.update(
        req.params.id,
        req.body,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "QR Code updated successfully.",
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const qrCode = await qrCodeService.create(req.body, req.user.id);

      return res.status(201).json({
        success: true,
        message: "QR Code generated successfully.",
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get All QR Codes
  // =====================================
  async getAll(req, res, next) {
    try {
      const result = await qrCodeService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "QR Codes fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get QR Code By ID
  // =====================================
  async getById(req, res, next) {
    try {
      const qrCode = await qrCodeService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "QR Code fetched successfully.",
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get QR Code By Asset
  // =====================================
  async getByAsset(req, res, next) {
    try {
      const qrCode = await qrCodeService.getByAsset(req.params.assetId);

      return res.status(200).json({
        success: true,
        message: "Asset QR Code fetched successfully.",
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Regenerate QR Code
  // =====================================
  async regenerate(req, res, next) {
    try {
      const qrCode = await qrCodeService.regenerate(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "QR Code regenerated successfully.",
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Scan QR Code
  // =====================================
  async scan(req, res, next) {
    try {
      const qrCode = await qrCodeService.scan(req.params.id);

      return res.status(200).json({
        success: true,
        message: "QR Code scanned successfully.",
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Print QR Code
  // =====================================
  async print(req, res, next) {
    try {
      const qrCode = await qrCodeService.print(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Print count updated successfully.",
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Download QR Code
  // =====================================
  async download(req, res, next) {
    try {
      const qrCode = await qrCodeService.download(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Download count updated successfully.",
        data: qrCode,
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

      const qrCodes = await qrCodeService.latest(limit);

      return res.status(200).json({
        success: true,
        message: "Latest QR Codes fetched successfully.",
        data: qrCodes,
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
      const total = await qrCodeService.count();

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
      await qrCodeService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "QR Code deleted successfully.",
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
      const qrCode = await qrCodeService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "QR Code restored successfully.",
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QRCodeController();
