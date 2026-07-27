const asyncHandler = require("../../middlewares/asyncHandler");
const ticketService = require("../../services/helpdesk/ticketService");

// Create Ticket
exports.createTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.createTicket(req.body, req.user._id || req.user.id);

  res.status(201).json({
    success: true,
    message: "Ticket raised successfully",
    data: ticket,
  });
});

// Get All Tickets (Admin/HR/Support view)
exports.getAllTickets = asyncHandler(async (req, res) => {
  const result = await ticketService.getAllTickets(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Logged-in employee's own raised tickets
exports.getMyTickets = asyncHandler(async (req, res) => {
  const result = await ticketService.getMyTickets(req.user._id || req.user.id, req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Tickets assigned to the logged-in support agent
exports.getAssignedTickets = asyncHandler(async (req, res) => {
  const result = await ticketService.getAssignedTickets(req.user._id || req.user.id, req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Single Ticket
exports.getTicketById = asyncHandler(async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.id);

  res.status(200).json({
    success: true,
    data: ticket,
  });
});

// Update Ticket
exports.updateTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.updateTicket(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Ticket updated successfully",
    data: ticket,
  });
});

// Assign Ticket to a support agent
exports.assignTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.assignTicket(req.params.id, req.body.assignedTo);

  res.status(200).json({
    success: true,
    message: "Ticket assigned",
    data: ticket,
  });
});

// Resolve Ticket
exports.resolveTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.resolveTicket(req.params.id, req.body.resolutionNotes);

  res.status(200).json({
    success: true,
    message: "Ticket marked resolved",
    data: ticket,
  });
});

// Delete (archive) Ticket
exports.deleteTicket = asyncHandler(async (req, res) => {
  await ticketService.deleteTicket(req.params.id);

  res.status(200).json({
    success: true,
    message: "Ticket deleted successfully",
  });
});

// Add Reply / Internal Note
exports.addReply = asyncHandler(async (req, res) => {
  const ticket = await ticketService.addReply(
    req.params.id,
    req.body.text,
    req.user._id || req.user.id,
    req.body.isInternalNote || false,
  );

  res.status(200).json({
    success: true,
    message: "Reply added",
    data: ticket,
  });
});

// Upload Attachment
exports.uploadAttachment = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const ticket = await ticketService.addAttachment(
    req.params.id,
    req.file.path || req.file.url,
    req.file.originalname,
  );

  res.status(200).json({
    success: true,
    message: "Attachment uploaded",
    data: ticket,
  });
});

// Ticket stats widget for dashboard
exports.getTicketStats = asyncHandler(async (req, res) => {
  const stats = await ticketService.getTicketStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});
