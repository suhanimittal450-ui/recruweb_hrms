const Notification = require("../../models/notifications/notificationModel");

class NotificationRepository {
  // ==========================================
  // Create Notification
  // ==========================================
  async create(payload) {
    return Notification.create(payload);
  }

  // ==========================================
  // Bulk Create Notifications
  // ==========================================
  async bulkCreate(payload) {
    return Notification.insertMany(payload);
  }

  // ==========================================
  // Get Notification By ID
  // ==========================================
  async findById(id) {
    return Notification.findById(id)
      .populate("recipient", "firstName lastName email")
      .populate("sender", "firstName lastName email");
  }

  // ==========================================
  // Get All Notifications
  // ==========================================
  async findAll(filters = {}) {
    return Notification.find(filters)
      .populate("recipient", "firstName lastName email")
      .populate("sender", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  // ==========================================
  // Get User Notifications
  // ==========================================
  async findByRecipient(recipientId, filters = {}) {
    return Notification.find({
      recipient: recipientId,
      isDeleted: false,
      ...filters,
    }).sort({
      createdAt: -1,
    });
  }

  // ==========================================
  // Update Notification
  // ==========================================
  async update(id, payload) {
    return Notification.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  // ==========================================
  // Mark As Read
  // ==========================================
  async markAsRead(id) {
    return Notification.findByIdAndUpdate(
      id,
      {
        isRead: true,
        readAt: new Date(),
      },
      {
        returnDocument: "after",
      },
    );
  }

  // ==========================================
  // Mark All As Read
  // ==========================================
  async markAllAsRead(recipientId) {
    return Notification.updateMany(
      {
        recipient: recipientId,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
    );
  }

  // ==========================================
  // Archive Notification
  // ==========================================
  async archive(id) {
    return Notification.findByIdAndUpdate(
      id,
      {
        isArchived: true,
        archivedAt: new Date(),
      },
      {
        returnDocument: "after",
      },
    );
  }

  // ==========================================
  // Restore Archived Notification
  // ==========================================
  async restore(id) {
    return Notification.findByIdAndUpdate(
      id,
      {
        isArchived: false,
        archivedAt: null,
      },
      {
        returnDocument: "after",
      },
    );
  }

  // ==========================================
  // Soft Delete
  // ==========================================
  async softDelete(id) {
    return Notification.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        returnDocument: "after",
      },
    );
  }
  create(data) {
    return Notification.create(data);
  }

  findByUser(userId) {
    return Notification.find({ user: userId }).sort("-createdAt");
  }

  unread(userId) {
    return Notification.countDocuments({
      user: userId,
      isRead: false,
    });
  }

  async markRead(id) {
    return Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { returnDocument: "after" },
    );
  }

  async markAll(userId) {
    return Notification.updateMany({ user: userId }, { isRead: true });
  }
  // ==========================================
  // Unread Count
  // ==========================================
  async unreadCount(recipientId) {
    return Notification.countDocuments({
      recipient: recipientId,
      isRead: false,
      isDeleted: false,
    });
  }

  // ==========================================
  // Latest Notifications
  // ==========================================
  async latest(recipientId, limit = 10) {
    return Notification.find({
      recipient: recipientId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit));
  }

  // ==========================================
  // Notification Analytics
  // ==========================================
  async analytics() {
    return Notification.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: 1 },
          unread: {
            $sum: {
              $cond: [{ $eq: ["$isRead", false] }, 1, 0],
            },
          },
        },
      },
    ]);
  }

  // ==========================================
  // Count
  // ==========================================
  async count(filters = {}) {
    return Notification.countDocuments(filters);
  }
}

module.exports = new NotificationRepository();
