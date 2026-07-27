const QRCode = require("qrcode");

const qrCodeRepository = require("../../repositories/assets/qrCodeRepository");
const assetRepository = require("../../repositories/assets/assetRepository");

// Use your existing Cloudinary helper
const cloudinary = require("../../helpers/cloudinary");

class QRCodeService {
  // =====================================
  // Generate QR Code
  // =====================================

  async create(payload, userId) {
    const asset = await assetRepository.findById(payload.asset);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    const existing = await qrCodeRepository.findByAsset(payload.asset);

    if (existing) {
      throw new Error("QR Code already exists for this asset.");
    }

    const qrCode = payload.qrCode || `QR-${Date.now()}`;

    const verificationUrl =
      payload.verificationUrl ||
      `${process.env.APP_URL}/api/assets/verify/${asset.assetCode}`;

    const qrContent =
      payload.qrContent ||
      JSON.stringify({
        assetId: asset._id,
        assetCode: asset.assetCode,
        assetName: asset.assetName,
        serialNumber: asset.serialNumber,
        verificationUrl,
      });

    // Generate PNG Buffer
    const buffer = await QRCode.toBuffer(qrContent, {
      width: payload.size || 300,
      errorCorrectionLevel: payload.errorCorrectionLevel || "H",
      color: {
        dark: payload.foregroundColor || "#000000",
        light: payload.backgroundColor || "#FFFFFF",
      },
    });

    // Upload to Cloudinary
    const uploaded = await cloudinary.uploadBuffer(
      buffer,
      "hrms/assets/qrcodes",
    );

    return await qrCodeRepository.create({
      asset: payload.asset,

      qrCode,

      verificationUrl,

      qrContent,

      imageUrl: uploaded.secure_url,

      publicId: uploaded.public_id,

      size: payload.size || 300,

      foregroundColor: payload.foregroundColor || "#000000",

      backgroundColor: payload.backgroundColor || "#FFFFFF",

      errorCorrectionLevel: payload.errorCorrectionLevel || "H",

      remarks: payload.remarks,

      createdBy: userId,

      updatedBy: userId,
    });
  }

  // =====================================
  // Get All
  // =====================================

  async getAll(query) {
    return await qrCodeRepository.findAll(query);
  }

  // =====================================
  // Get By ID
  // =====================================

  async getById(id) {
    const qr = await qrCodeRepository.findById(id);

    if (!qr) {
      throw new Error("QR Code not found.");
    }

    return qr;
  }

  // =====================================
  // Get By Asset
  // =====================================

  async getByAsset(assetId) {
    const qr = await qrCodeRepository.findByAsset(assetId);

    if (!qr) {
      throw new Error("QR Code not found.");
    }

    return qr;
  }

  // =====================================
  // Regenerate
  // =====================================

  async regenerate(id, userId) {
    const qr = await qrCodeRepository.findById(id);

    if (!qr) {
      throw new Error("QR Code not found.");
    }

    if (qr.publicId) {
      await cloudinary.deleteFile(qr.publicId);
    }

    const buffer = await QRCode.toBuffer(qr.qrContent, {
      width: qr.size,
      errorCorrectionLevel: qr.errorCorrectionLevel,
      color: {
        dark: qr.foregroundColor,
        light: qr.backgroundColor,
      },
    });

    const uploaded = await cloudinary.uploadBuffer(
      buffer,
      "hrms/assets/qrcodes",
    );

    return await qrCodeRepository.update(id, {
      imageUrl: uploaded.secure_url,

      publicId: uploaded.public_id,

      generatedAt: new Date(),

      updatedBy: userId,
    });
  }

  // =====================================
  // Scan
  // =====================================

  async scan(id) {
    return await qrCodeRepository.incrementScan(id);
  }

  // =====================================
  // Download
  // =====================================

  async download(id) {
    return await qrCodeRepository.incrementDownload(id);
  }

  // =====================================
  // Print
  // =====================================

  async print(id) {
    return await qrCodeRepository.incrementPrint(id);
  }

  // =====================================
  // Delete
  // =====================================

  async delete(id, userId) {
    const qr = await qrCodeRepository.findById(id);

    if (!qr) {
      throw new Error("QR Code not found.");
    }

    if (qr.publicId) {
      await cloudinary.deleteFile(qr.publicId);
    }

    return await qrCodeRepository.softDelete(id, userId);
  }

  // =====================================
  // Restore
  // =====================================

  async restore(id) {
    const qr = await qrCodeRepository.restore(id);

    if (!qr) {
      throw new Error("QR Code not found.");
    }

    return qr;
  }

  // =====================================
  // Latest
  // =====================================

  async latest(limit = 10) {
    return await qrCodeRepository.latest(limit);
  }

  // =====================================
  // Count
  // =====================================

  async count() {
    return await qrCodeRepository.count();
  }
}

module.exports = new QRCodeService();
