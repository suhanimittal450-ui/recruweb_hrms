const taskRepository = require("../../repositories/task/taskRepository");
const Employee = require("../../models/employee/Employee");

class TaskService {
  // Resolve the Employee record for the logged-in user (User !== Employee).
  async resolveEmployeeId(userId) {
    const employee = await Employee.findOne({ user: userId }).select("_id");
    if (!employee) {
      const error = new Error("No employee record found for this user");
      error.statusCode = 404;
      throw error;
    }
    return employee._id;
  }

  async createTask(data, assignedBy) {
    const payload = { ...data, assignedBy };
    return await taskRepository.create(payload);
  }

  async getAllTasks(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const filter = {};
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    if (query.assignedTo) filter.assignedTo = query.assignedTo;
    if (query.department) filter.department = query.department;

    return await taskRepository.findAll(filter, {
      page,
      limit,
      search: query.search,
      sortBy: query.sortBy,
      order: query.order,
    });
  }

  async getMyTasks(employeeId, query) {
    return await this.getAllTasks({ ...query, assignedTo: employeeId });
  }

  async getTaskById(id) {
    const task = await taskRepository.findById(id);
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    return task;
  }

  async updateTask(id, data) {
    if (data.status === "Done" && !data.completedAt) {
      data.completedAt = new Date();
    }
    const task = await taskRepository.update(id, data);
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    return task;
  }

  async updateStatus(id, status) {
    return await this.updateTask(id, { status });
  }

  async deleteTask(id) {
    const task = await taskRepository.delete(id);
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    return task;
  }

  async addComment(id, text, userId) {
    const task = await taskRepository.addComment(id, { text, by: userId });
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    return task;
  }

  async addAttachment(id, fileUrl, originalName) {
    const task = await taskRepository.addAttachment(id, { fileUrl, originalName });
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    return task;
  }

  async getTaskStats(employeeId) {
    const stats = await taskRepository.getStatsByEmployee(employeeId);
    const summary = { ToDo: 0, InProgress: 0, Review: 0, Done: 0, Cancelled: 0 };
    stats.forEach((s) => {
      summary[s._id] = s.count;
    });
    return summary;
  }
}

module.exports = new TaskService();
