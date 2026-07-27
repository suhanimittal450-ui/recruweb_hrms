const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const holidayController = require("../../controllers/holiday/holidayController");

router.post("/", authMiddleware, holidayController.createHoliday);

router.get("/", authMiddleware, holidayController.getAllHolidays);

router.put("/:id", authMiddleware, holidayController.updateHoliday);

router.delete("/:id", authMiddleware, holidayController.deleteHoliday);

module.exports = router;
