const ticketRepository = require("../../repositories/helpdesk/ticketRepository");
const Employee = require("../../models/employee/Employee");

// SLA resolution windows, in hours, by priority.
const SLA_HOURS = {
  Urgent: 4,
  High: 24,
  Medium: 72,
  Low: 120,
};

class TicketService {
  async resolveEmployeeId(userId) {
    const employee = await Employee.findOne({ user: userId }).select("_id");
    if (!employee) {
      const error = new Error("No employee record found for this user");
      error.statusCode = 404;
      throw error;
    }
    return employee._id;
  }

  async generateTicketNumber() {
    const latest = await ticketRepository.findLatestTicketNumber();
    const year = new Date().getFullYear();

    if (!latest || !latest.ticketNumber) {
      return `TKT-${year}-00001`;
    }

    const match = latest.ticketNumber.match(/(\d+)$/);
    const nextSeq = match ? Number(match[1]) + 1 : 1;
    return `TKT-${year}-${String(nextSeq).padStart(5, "0")}`;
  }

  async createTicket(data, raisedByUserId) {
    const raisedBy = data.raisedBy || (await this.resolveEmployeeId(raisedByUserId));
    const ticketNumber = await this.generateTicketNumber();

    const priority = data.priority || "Medium";
    const slaHours = SLA_HOURS[priority] || SLA_HOURS.Medium;
    const slaDueAt = new Date(Date.now() + slaHours * 60 * 60 * 1000);

    return await ticketRepository.create({
      ...data,
      raisedBy,
      ticketNumber,
      priority,
      slaDueAt,
    });
  }

  async getAllTickets(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const filter = {};
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    if (query.category) filter.category = query.category;
    if (query.assignedTo) filter.assignedTo = query.assignedTo;
    if (query.department) filter.department = query.department;

    return await ticketRepository.findAll(filter, {
      page,
      limit,
      search: query.search,
      sortBy: query.sortBy,
      order: query.order,
    });
  }

  async getMyTickets(userId, query) {
    const employeeId = await this.resolveEmployeeId(userId);
    return await this.getAllTickets({ ...query, raisedBy: employeeId });
  }

  async getAssignedTickets(userId, query) {
    const employeeId = await this.resolveEmployeeId(userId);
    return await this.getAllTickets({ ...query, assignedTo: employeeId });
  }

  async getTicketById(id) {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      throw error;
    }
    return ticket;
  }

  async updateTicket(id, data) {
    if (data.status === "Resolved" && !data.resolvedAt) {
      data.resolvedAt = new Date();
    }
    if (data.status === "Closed" && !data.closedAt) {
      data.closedAt = new Date();
    }

    const ticket = await ticketRepository.update(id, data);
    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      throw error;
    }
    return ticket;
  }

  async assignTicket(id, assignedTo) {
    return await this.updateTicket(id, { assignedTo, status: "InProgress" });
  }

  async resolveTicket(id, resolutionNotes) {
    return await this.updateTicket(id, {
      status: "Resolved",
      resolutionNotes,
      resolvedAt: new Date(),
    });
  }

  async deleteTicket(id) {
    const ticket = await ticketRepository.delete(id);
    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      throw error;
    }
    return ticket;
  }

  async addReply(id, text, userId, isInternalNote = false) {
    const ticket = await ticketRepository.addReply(id, { text, by: userId, isInternalNote });
    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      throw error;
    }
    return ticket;
  }

  async addAttachment(id, fileUrl, originalName) {
    const ticket = await ticketRepository.addAttachment(id, { fileUrl, originalName });
    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      throw error;
    }
    return ticket;
  }

  async getTicketStats() {
    const stats = await ticketRepository.getStatsByStatus();
    const summary = { Open: 0, InProgress: 0, OnHold: 0, Resolved: 0, Closed: 0 };
    stats.forEach((s) => {
      summary[s._id] = s.count;
    });
    return summary;
  }
}

module.exports = new TicketService();
