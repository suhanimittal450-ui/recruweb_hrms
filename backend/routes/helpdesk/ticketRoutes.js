const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");
const activityLogger = require("../../middlewares/activityLogger");
const uploadDocument = require("../../middlewares/uploadDocument");

const ticketController = require("../../controllers/helpdesk/ticketController");
const {
  createTicketValidator,
  assignTicketValidator,
  replyValidator,
} = require("../../validators/ticketValidator");

// ------------------------------------------------------------------
// Create Ticket — any authenticated employee can raise one
// ------------------------------------------------------------------
router.post(
  "/",
  authMiddleware,
  createTicketValidator,
  validate,
  activityLogger({ entityType: "TICKET", action: "CREATE", title: "Ticket Raised" }),
  ticketController.createTicket,
);

// All tickets (Admin/HR/Support view with filters)
router.get(
  "/",
  authMiddleware,
  authorize("ADMIN", "HR", "MANAGER"),
  ticketController.getAllTickets,
);

// Logged-in user's own raised tickets (must come before /:id)
router.get("/my-tickets", authMiddleware, ticketController.getMyTickets);

// Tickets assigned to the logged-in support agent (must come before /:id)
router.get("/assigned-to-me", authMiddleware, ticketController.getAssignedTickets);

// Stats widget (must come before /:id)
router.get(
  "/stats",
  authMiddleware,
  authorize("ADMIN", "HR", "MANAGER"),
  ticketController.getTicketStats,
);

// Single Ticket
router.get("/:id", authMiddleware, ticketController.getTicketById);

// Update Ticket
router.put(
  "/:id",
  authMiddleware,
  activityLogger({ entityType: "TICKET", action: "UPDATE", title: "Ticket Updated" }),
  ticketController.updateTicket,
);

// Assign to a support agent
router.patch(
  "/:id/assign",
  authMiddleware,
  authorize("ADMIN", "HR", "MANAGER"),
  assignTicketValidator,
  validate,
  ticketController.assignTicket,
);

// Resolve
router.patch(
  "/:id/resolve",
  authMiddleware,
  authorize("ADMIN", "HR", "MANAGER"),
  ticketController.resolveTicket,
);

// Delete (archive)
router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "HR", "MANAGER"),
  ticketController.deleteTicket,
);

// Replies / internal notes
router.post(
  "/:id/replies",
  authMiddleware,
  replyValidator,
  validate,
  ticketController.addReply,
);

// Attachments
router.post(
  "/:id/attachments",
  authMiddleware,
  uploadDocument.single("file"),
  ticketController.uploadAttachment,
);

module.exports = router;
