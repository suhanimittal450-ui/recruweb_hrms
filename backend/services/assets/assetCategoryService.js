const assetCategoryRepository = require("../../repositories/assets/assetCategoryRepository");

class AssetCategoryService {
  // ===================================
  // Create Asset Category
  // ===================================
  async create(payload, userId) {
    const existingName = await assetCategoryRepository.findByName(payload.name);

    if (existingName) {
      throw new Error("Asset category name already exists.");
    }

    const existingCode = await assetCategoryRepository.findByCode(payload.code);

    if (existingCode) {
      throw new Error("Asset category code already exists.");
    }

    payload.createdBy = userId;
    payload.updatedBy = userId;

    return await assetCategoryRepository.create(payload);
  }

  // ===================================
  // Get All Asset Categories
  // ===================================
  async getAll(query) {
    return await assetCategoryRepository.findAll(query);
  }

  // ===================================
  // Get Category By Id
  // ===================================
  async getById(id) {
    const category = await assetCategoryRepository.findById(id);

    if (!category) {
      throw new Error("Asset category not found.");
    }

    return category;
  }

  // ===================================
  // Update Category
  // ===================================
  async update(id, payload, userId) {
    const category = await assetCategoryRepository.findById(id);

    if (!category) {
      throw new Error("Asset category not found.");
    }

    if (
      payload.name &&
      payload.name.toLowerCase() !== category.name.toLowerCase()
    ) {
      const existingName = await assetCategoryRepository.findByName(
        payload.name,
      );

      if (existingName) {
        throw new Error("Asset category name already exists.");
      }
    }

    if (payload.code && payload.code.toUpperCase() !== category.code) {
      const existingCode = await assetCategoryRepository.findByCode(
        payload.code,
      );

      if (existingCode) {
        throw new Error("Asset category code already exists.");
      }
    }

    payload.updatedBy = userId;

    return await assetCategoryRepository.update(id, payload);
  }

  // ===================================
  // Delete Category (Soft Delete)
  // ===================================
  async delete(id, userId) {
    const category = await assetCategoryRepository.findById(id);

    if (!category) {
      throw new Error("Asset category not found.");
    }

    return await assetCategoryRepository.softDelete(id, userId);
  }

  // ===================================
  // Restore Category
  // ===================================
  async restore(id) {
    return await assetCategoryRepository.restore(id);
  }

  // ===================================
  // Count Categories
  // ===================================
  async count() {
    return await assetCategoryRepository.count();
  }
}

module.exports = new AssetCategoryService();
