const bwipjs = require("bwip-js");

const barcodeRepository = require("../../repositories/assets/barcodeRepository");
const assetRepository = require("../../repositories/assets/assetRepository");

// Use your existing Cloudinary helper
const cloudinary = require("../../helpers/cloudinary");

class BarcodeService {
  // =====================================
  // Generate Barcode
  // =====================================
  async create(payload, userId) {
    const asset = await assetRepository.findById(payload.asset);

    if (!asset) {
      throw new Error("Asset not found.");
    }

    const existing = await barcodeRepository.findByAsset(payload.asset);

    if (existing) {
      throw new Error("Barcode already exists for this asset.");
    }

    const barcodeNumber = payload.barcodeNumber || `AST-${Date.now()}`;

    // Generate Barcode Image
    const png = await bwipjs.toBuffer({
      bcid: payload.format?.toLowerCase() || "code128",
      text: barcodeNumber,
      scale: payload.width || 2,
      height: payload.height || 15,
      includetext: payload.displayValue !== false,
    });

    // Upload to Cloudinary
    const uploaded = await cloudinary.uploadBuffer(png, "hrms/assets/barcodes");

    return await barcodeRepository.create({
      asset: payload.asset,
      barcodeNumber,
      format: payload.format || "CODE128",

      imageUrl: uploaded.secure_url,

      publicId: uploaded.public_id,

      width: payload.width || 2,

      height: payload.height || 100,

      displayValue: payload.displayValue !== false,

      remarks: payload.remarks,

      createdBy: userId,
      updatedBy: userId,
    });
  }

  // =====================================
  // Get All
  // =====================================
  async getAll(query) {
    return await barcodeRepository.findAll(query);
  }

  // =====================================
  // Get By Id
  // =====================================
  async getById(id) {
    const barcode = await barcodeRepository.findById(id);

    if (!barcode) {
      throw new Error("Barcode not found.");
    }

    return barcode;
  }

  // =====================================
  // Get By Asset
  // =====================================
  async getByAsset(assetId) {
    const barcode = await barcodeRepository.findByAsset(assetId);

    if (!barcode) {
      throw new Error("Barcode not found.");
    }

    return barcode;
  }

  // =====================================
  // Regenerate Barcode
  // =====================================
  async regenerate(id, userId) {
    const barcode = await barcodeRepository.findById(id);

    if (!barcode) {
      throw new Error("Barcode not found.");
    }

    if (barcode.publicId) {
      await cloudinary.deleteFile(barcode.publicId);
    }

    const png = await bwipjs.toBuffer({
      bcid: barcode.format.toLowerCase(),
      text: barcode.barcodeNumber,
      scale: barcode.width,
      height: barcode.height / 10,
      includetext: barcode.displayValue,
    });

    const uploaded = await cloudinary.uploadBuffer(png, "hrms/assets/barcodes");

    return await barcodeRepository.update(id, {
      imageUrl: uploaded.secure_url,

      publicId: uploaded.public_id,

      generatedAt: new Date(),

      updatedBy: userId,
    });
  }

  // =====================================
  // Print
  // =====================================
  async print(id) {
    return await barcodeRepository.incrementPrint(id);
  }

  // =====================================
  // Download
  // =====================================
  async download(id) {
    return await barcodeRepository.incrementDownload(id);
  }

  // =====================================
  // Delete
  // =====================================
  async delete(id, userId) {
    const barcode = await barcodeRepository.findById(id);

    if (!barcode) {
      throw new Error("Barcode not found.");
    }

    if (barcode.publicId) {
      await cloudinary.deleteFile(barcode.publicId);
    }

    return await barcodeRepository.softDelete(id, userId);
  }

  // =====================================
  // Restore
  // =====================================
  async restore(id) {
    const barcode = await barcodeRepository.restore(id);

    if (!barcode) {
      throw new Error("Barcode not found.");
    }

    return barcode;
  }

  // =====================================
  // Latest
  // =====================================
  async latest(limit = 10) {
    return await barcodeRepository.latest(limit);
  }

  // =====================================
  // Count
  // =====================================
  async count() {
    return await barcodeRepository.count();
  }
}

module.exports = new BarcodeService();
