const asyncHandler = require("../../middlewares/asyncHandler");

const holidayService = require("../../services/holiday/holidayService");

exports.createHoliday = asyncHandler(async (req, res) => {
  const holiday = await holidayService.createHoliday(req.body);

  res.status(201).json({
    success: true,
    message: "Holiday Created Successfully",
    data: holiday,
  });
});

exports.getAllHolidays = asyncHandler(async (req, res) => {
  const data = await holidayService.getAllHolidays();

  res.json({
    success: true,
    data,
  });
});

exports.updateHoliday = asyncHandler(async (req, res) => {
  const data = await holidayService.updateHoliday(req.params.id, req.body);

  res.json({
    success: true,
    data,
  });
});

exports.deleteHoliday = asyncHandler(async (req, res) => {
  await holidayService.deleteHoliday(req.params.id);

  res.json({
    success: true,
    message: "Holiday Deleted Successfully",
  });
});
