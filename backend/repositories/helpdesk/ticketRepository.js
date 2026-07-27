const Ticket = require("../../models/helpdesk/Ticket");

class TicketRepository {
  async create(data) {
    return await Ticket.create(data);
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
      query.$or = [
        { ticketNumber: { $regex: search, $options: "i" } },
        { $text: { $search: search } },
      ];
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const tickets = await Ticket.find(query)
      .populate("raisedBy", "employeeId user")
      .populate("assignedTo", "employeeId user")
      .populate("department", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Ticket.countDocuments(query);

    return {
      tickets,
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id) {
    return await Ticket.findById(id)
      .populate("raisedBy", "employeeId user")
      .populate("assignedTo", "employeeId user")
      .populate("department", "name")
      .populate("replies.by", "firstName lastName email");
  }

  async findLatestTicketNumber() {
    return await Ticket.findOne({}).sort({ createdAt: -1 }).select("ticketNumber");
  }

  async update(id, data) {
    return await Ticket.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Ticket.findByIdAndUpdate(id, { isArchived: true }, { new: true });
  }

  async addReply(id, reply) {
    return await Ticket.findByIdAndUpdate(
      id,
      { $push: { replies: reply } },
      { new: true, runValidators: true },
    );
  }

  async addAttachment(id, attachment) {
    return await Ticket.findByIdAndUpdate(
      id,
      { $push: { attachments: attachment } },
      { new: true, runValidators: true },
    );
  }

  async getStatsByStatus() {
    return await Ticket.aggregate([
      { $match: { isArchived: false } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
  }
}

module.exports = new TicketRepository();
