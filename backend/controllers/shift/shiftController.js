const asyncHandler = require("../../middlewares/asyncHandler");

const shiftService = require("../../services/shift/shiftService");

exports.createShift = asyncHandler(async (req, res) => {
  const shift = await shiftService.createShift(req.body);

  res.status(201).json({
    success: true,
    message: "Shift Created Successfully",
    data: shift,
  });
});

exports.getAllShifts = asyncHandler(async (req, res) => {
  const data = await shiftService.getAllShifts();

  res.json({
    success: true,
    data,
  });
});

exports.updateShift = asyncHandler(async (req, res) => {
  const data = await shiftService.updateShift(req.params.id, req.body);

  res.json({
    success: true,
    data,
  });
});

exports.deleteShift = asyncHandler(async (req, res) => {
  await shiftService.deleteShift(req.params.id);

  res.json({
    success: true,
    message: "Shift Deleted",
  });
});
