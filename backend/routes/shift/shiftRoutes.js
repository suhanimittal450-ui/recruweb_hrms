const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const shiftController = require("../../controllers/shift/shiftController");

router.post("/", authMiddleware, shiftController.createShift);

router.get("/", authMiddleware, shiftController.getAllShifts);

router.put("/:id", authMiddleware, shiftController.updateShift);

router.delete("/:id", authMiddleware, shiftController.deleteShift);

module.exports = router;
