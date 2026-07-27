const invoiceService = require("../../services/assets/invoiceService");

class InvoiceController {
  // =====================================
  // Upload Invoice
  // =====================================
  async upload(req, res, next) {
    try {
      const invoice = await invoiceService.upload(
        req.file,
        req.body,
        req.user.id,
      );

      return res.status(201).json({
        success: true,
        message: "Invoice uploaded successfully.",
        data: invoice,
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
      const result = await invoiceService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Invoices fetched successfully.",
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
      const invoice = await invoiceService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Invoice fetched successfully.",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Get By Purchase Detail
  // =====================================
  async getByPurchaseDetail(req, res, next) {
    try {
      const result = await invoiceService.getByPurchaseDetail(
        req.params.purchaseDetailId,
        req.query,
      );

      return res.status(200).json({
        success: true,
        message: "Purchase invoices fetched successfully.",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Replace Invoice
  // =====================================
  async replace(req, res, next) {
    try {
      const invoice = await invoiceService.replace(
        req.params.id,
        req.file,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        message: "Invoice replaced successfully.",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Latest Uploads
  // =====================================
  async latest(req, res, next) {
    try {
      const limit = req.query.limit || 10;

      const data = await invoiceService.latest(limit);

      return res.status(200).json({
        success: true,
        message: "Latest invoices fetched successfully.",
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
      const total = await invoiceService.count();

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
      await invoiceService.delete(req.params.id, req.user.id);

      return res.status(200).json({
        success: true,
        message: "Invoice deleted successfully.",
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
      const invoice = await invoiceService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Invoice restored successfully.",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InvoiceController();
