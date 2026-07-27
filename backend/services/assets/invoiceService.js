const invoiceRepository = require("../../repositories/assets/invoiceRepository");
const purchaseDetailRepository = require("../../repositories/assets/purchaseDetailRepository");

// Use your existing Cloudinary helper.
// Example:
// const cloudinaryService = require("../../helpers/cloudinary");
// OR
// const { uploadFile, deleteFile } = require("../../utils/cloudinary");
// Replace the below import with your existing helper.
const cloudinary = require("../../helpers/cloudinary");

class InvoiceService {
  // =====================================
  // Upload Invoice
  // =====================================
  async upload(file, payload, userId) {
    const purchase = await purchaseDetailRepository.findById(
      payload.purchaseDetail,
    );

    if (!purchase) {
      throw new Error("Purchase detail not found.");
    }

    const existing = await invoiceRepository.findByInvoiceNumber(
      payload.invoiceNumber,
    );

    const version = existing ? existing.version + 1 : 1;

    const uploaded = await cloudinary.uploadFile(
      file.path,
      "hrms/assets/invoices",
    );

    const invoice = await invoiceRepository.create({
      purchaseDetail: payload.purchaseDetail,
      invoiceNumber: payload.invoiceNumber,
      invoiceType: payload.invoiceType || "PURCHASE",
      version,
      fileName: uploaded.original_filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      extension: file.originalname.split(".").pop(),
      size: file.size,

      cloudinary: {
        publicId: uploaded.public_id,
        url: uploaded.url,
        secureUrl: uploaded.secure_url,
        folder: uploaded.folder,
      },

      remarks: payload.remarks,
      createdBy: userId,
      updatedBy: userId,
    });

    return invoice;
  }

  // =====================================
  // Get All
  // =====================================
  async getAll(query) {
    return await invoiceRepository.findAll(query);
  }

  // =====================================
  // Get By Id
  // =====================================
  async getById(id) {
    const invoice = await invoiceRepository.findById(id);

    if (!invoice) {
      throw new Error("Invoice not found.");
    }

    return invoice;
  }

  // =====================================
  // Get By Purchase Detail
  // =====================================
  async getByPurchaseDetail(purchaseDetailId, query) {
    return await invoiceRepository.findByPurchaseDetail(
      purchaseDetailId,
      query,
    );
  }

  // =====================================
  // Replace Invoice
  // =====================================
  async replace(id, file, userId) {
    const invoice = await invoiceRepository.findById(id);

    if (!invoice) {
      throw new Error("Invoice not found.");
    }

    // Delete previous file
    if (invoice.cloudinary && invoice.cloudinary.publicId) {
      await cloudinary.deleteFile(invoice.cloudinary.publicId);
    }

    const uploaded = await cloudinary.uploadFile(
      file.path,
      "hrms/assets/invoices",
    );

    return await invoiceRepository.update(id, {
      version: invoice.version + 1,

      fileName: uploaded.original_filename,

      originalName: file.originalname,

      mimeType: file.mimetype,

      extension: file.originalname.split(".").pop(),

      size: file.size,

      uploadStatus: "REPLACED",

      cloudinary: {
        publicId: uploaded.public_id,

        url: uploaded.url,

        secureUrl: uploaded.secure_url,

        folder: uploaded.folder,
      },

      updatedBy: userId,
    });
  }

  // =====================================
  // Delete Invoice
  // =====================================
  async delete(id, userId) {
    const invoice = await invoiceRepository.findById(id);

    if (!invoice) {
      throw new Error("Invoice not found.");
    }

    if (invoice.cloudinary && invoice.cloudinary.publicId) {
      await cloudinary.deleteFile(invoice.cloudinary.publicId);
    }

    return await invoiceRepository.softDelete(id, userId);
  }

  // =====================================
  // Restore
  // =====================================
  async restore(id) {
    const invoice = await invoiceRepository.restore(id);

    if (!invoice) {
      throw new Error("Invoice not found.");
    }

    return invoice;
  }

  // =====================================
  // Latest Uploads
  // =====================================
  async latest(limit = 10) {
    return await invoiceRepository.latest(limit);
  }

  // =====================================
  // Count
  // =====================================
  async count() {
    return await invoiceRepository.count();
  }
}

module.exports = new InvoiceService();
