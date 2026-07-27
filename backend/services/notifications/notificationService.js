const notificationRepository = require("../../repositories/notifications/notificationRepository");

class NotificationService {
  // ==========================================
  // Create Notification
  // ==========================================
  async create(payload) {
    return notificationRepository.create(payload);
  }
  async notify(io, data) {
    const notification = await repo.create(data);

    const room = data.user.toString();

    io.to(room).emit("notification", notification);

    return notification;
  }

  getUserNotifications(userId) {
    return repo.findByUser(userId);
  }

  unread(userId) {
    return repo.unread(userId);
  }

  markRead(id) {
    return repo.markRead(id);
  }

  markAll(userId) {
    return repo.markAll(userId);
  }
  // ==========================================
  // Bulk Notification
  // ==========================================
  async bulkCreate(payload) {
    return notificationRepository.bulkCreate(payload);
  }

  // ==========================================
  // Get Notification By ID
  // ==========================================
  async getById(id) {
    const notification = await notificationRepository.findById(id);

    if (!notification) {
      throw new Error("Notification not found.");
    }

    return notification;
  }

  // ==========================================
  // Get All Notifications
  // ==========================================
  async getAll(filters) {
    return notificationRepository.findAll(filters);
  }

  // ==========================================
  // User Notifications
  // ==========================================
  async getMyNotifications(userId) {
    return notificationRepository.findByRecipient(userId);
  }

  // ==========================================
  // Mark As Read
  // ==========================================
  async markAsRead(id) {
    const notification = await this.getById(id);

    if (notification.isRead) {
      return notification;
    }

    return notificationRepository.markAsRead(id);
  }

  // ==========================================
  // Mark All As Read
  // ==========================================
  async markAllAsRead(userId) {
    return notificationRepository.markAllAsRead(userId);
  }

  // ==========================================
  // Archive
  // ==========================================
  async archive(id) {
    await this.getById(id);

    return notificationRepository.archive(id);
  }

  // ==========================================
  // Restore
  // ==========================================
  async restore(id) {
    await this.getById(id);

    return notificationRepository.restore(id);
  }

  // ==========================================
  // Delete
  // ==========================================
  async delete(id) {
    await this.getById(id);

    return notificationRepository.softDelete(id);
  }

  // ==========================================
  // Latest Notifications
  // ==========================================
  async latest(userId, limit = 10) {
    return notificationRepository.latest(userId, limit);
  }

  // ==========================================
  // Unread Count
  // ==========================================
  async unreadCount(userId) {
    const total = await notificationRepository.unreadCount(userId);

    return {
      unread: total,
    };
  }

  // ==========================================
  // Analytics
  // ==========================================
  async analytics() {
    return notificationRepository.analytics();
  }

  // ==========================================
  // Broadcast Notification
  // ==========================================
  async broadcast(users, payload) {
    const notifications = users.map((userId) => ({
      ...payload,
      recipient: userId,
    }));

    return notificationRepository.bulkCreate(notifications);
  }

  // ==========================================
  // Email Notification (Placeholder)
  // ==========================================
  async sendEmail(notification) {
    console.log(`Email Notification -> ${notification.title}`);

    return true;
  }

  // ==========================================
  // Push Notification (Placeholder)
  // ==========================================
  async sendPush(notification) {
    console.log(`Push Notification -> ${notification.title}`);

    return true;
  }

  // ==========================================
  // SMS Notification (Placeholder)
  // ==========================================
  async sendSMS(notification) {
    console.log(`SMS Notification -> ${notification.title}`);

    return true;
  }
}

module.exports = new NotificationService();
