module.exports = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const role = req.user.role?.name || req.user.role || "";

    req.searchPermission = {
      employees: false,
      candidates: false,
      assets: false,
      vendors: false,
      leaves: false,
      attendance: false,
      payroll: false,
      invoices: false,
      purchases: false,
      notifications: false,
    };

    switch (role) {
      case "SUPER_ADMIN":
      case "ADMIN":
        Object.keys(req.searchPermission).forEach((key) => {
          req.searchPermission[key] = true;
        });
        break;

      case "HR":
        req.searchPermission.employees = true;
        req.searchPermission.candidates = true;
        req.searchPermission.assets = true;
        req.searchPermission.vendors = true;
        req.searchPermission.leaves = true;
        req.searchPermission.attendance = true;
        req.searchPermission.notifications = true;
        break;

      case "ACCOUNTANT":
        req.searchPermission.employees = true;
        req.searchPermission.assets = true;
        req.searchPermission.vendors = true;
        req.searchPermission.payroll = true;
        req.searchPermission.invoices = true;
        req.searchPermission.purchases = true;
        break;

      case "MANAGER":
        req.searchPermission.employees = true;
        req.searchPermission.assets = true;
        req.searchPermission.leaves = true;
        req.searchPermission.attendance = true;
        break;

      case "EMPLOYEE":
        req.searchPermission.employees = true;
        req.searchPermission.leaves = true;
        req.searchPermission.attendance = true;
        req.searchPermission.notifications = true;
        break;

      default:
        break;
    }

    next();
  } catch (error) {
    next(error);
  }
};
