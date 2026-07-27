const notificationService = require("../../services/notifications/notificationService");

class NotificationController {
  // ==========================================
  // Create Notification
  // ==========================================
  async create(req, res, next) {
    try {
      const notification = await notificationService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Notification created successfully.",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Broadcast Notification
  // ==========================================
  async broadcast(req, res, next) {
    try {
      const { users, ...payload } = req.body;

      const notifications = await notificationService.broadcast(users, payload);

      return res.status(201).json({
        success: true,
        message: "Notification broadcast successfully.",
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Get All Notifications
  // ==========================================
  async getAll(req, res, next) {
    try {
      const notifications = await notificationService.getAll(req.query);

      return res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Get Logged-in User Notifications
  // ==========================================
  async getMyNotifications(req, res, next) {
    try {
      const notifications = await notificationService.getMyNotifications(
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Get Notification By ID
  // ==========================================
  async getById(req, res, next) {
    try {
      const notification = await notificationService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Mark As Read
  // ==========================================
  async markRead(req, res, next) {
    try {
      const notification = await notificationService.markAsRead(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Notification marked as read.",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Mark All As Read
  // ==========================================
  async markAllRead(req, res, next) {
    try {
      await notificationService.markAllAsRead(req.user.id);

      return res.status(200).json({
        success: true,
        message: "All notifications marked as read.",
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Archive Notification
  // ==========================================
  async archive(req, res, next) {
    try {
      const notification = await notificationService.archive(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Notification archived successfully.",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Restore Notification
  // ==========================================
  async restore(req, res, next) {
    try {
      const notification = await notificationService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Notification restored successfully.",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Delete Notification
  // ==========================================
  async delete(req, res, next) {
    try {
      await notificationService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Latest Notifications
  // ==========================================
  async latest(req, res, next) {
    try {
      const limit = req.query.limit || 10;

      const notifications = await notificationService.latest(
        req.user.id,
        limit,
      );

      return res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Unread Count
  // ==========================================
  async unreadCount(req, res, next) {
    try {
      const count = await notificationService.unreadCount(req.user.id);

      return res.status(200).json({
        success: true,
        data: count,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Analytics
  // ==========================================
  async analytics(req, res, next) {
    try {
      const analytics = await notificationService.analytics();

      return res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
