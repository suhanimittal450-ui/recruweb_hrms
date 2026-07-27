const Task = require("../../models/task/Task");

class TaskRepository {
  async create(data) {
    return await Task.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      order = "desc",
    } = options;

    const skip = (page - 1) * limit;
    const query = { isArchived: false, ...filter };

    if (search) {
      query.$text = { $search: search };
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const tasks = await Task.find(query)
      .populate("assignedTo", "employeeId user")
      .populate("assignedBy", "firstName lastName email")
      .populate("department", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(query);

    return {
      tasks,
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id) {
    return await Task.findById(id)
      .populate("assignedTo", "employeeId user")
      .populate("assignedBy", "firstName lastName email")
      .populate("department", "name")
      .populate("comments.by", "firstName lastName email");
  }

  async update(id, data) {
    return await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    // Soft delete — keep task history for audit purposes.
    return await Task.findByIdAndUpdate(id, { isArchived: true }, { new: true });
  }

  async addComment(id, comment) {
    return await Task.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true, runValidators: true },
    );
  }

  async addAttachment(id, attachment) {
    return await Task.findByIdAndUpdate(
      id,
      { $push: { attachments: attachment } },
      { new: true, runValidators: true },
    );
  }

  async getStatsByEmployee(employeeId) {
    return await Task.aggregate([
      { $match: { assignedTo: employeeId, isArchived: false } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
  }
}

module.exports = new TaskRepository();
