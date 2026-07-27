const Permission = require("../models/auth/Permission");

const permissions = [
  {
    name: "Create Asset Category",
    slug: "asset_category.create",
    module: "Asset Management",
  },
  {
    name: "View Asset Category",
    slug: "asset_category.view",
    module: "Asset Management",
  },
  {
    name: "Update Asset Category",
    slug: "asset_category.update",
    module: "Asset Management",
  },
  {
    name: "Delete Asset Category",
    slug: "asset_category.delete",
    module: "Asset Management",
  },
  {
    name: "Restore Asset Category",
    slug: "asset_category.restore",
    module: "Asset Management",
  },
];

async function seedPermissions() {
  try {
    for (const permission of permissions) {
      await Permission.updateOne(
        { slug: permission.slug },
        { $set: permission },
        { upsert: true },
      );
    }

    console.log("✅ Asset Category permissions seeded successfully.");
  } catch (error) {
    console.error("❌ Permission seeding failed:", error);
  }
}

module.exports = seedPermissions;
