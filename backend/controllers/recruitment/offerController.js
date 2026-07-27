const asyncHandler = require("../../middlewares/asyncHandler");
const offerService = require("../../services/recruitment/offerService");

exports.createOffer = asyncHandler(async (req, res) => {
  const offer = await offerService.createOffer(req.body);

  res.status(201).json({
    success: true,
    data: offer,
  });
});

exports.getOffers = asyncHandler(async (req, res) => {
  const offers = await offerService.getOffers();

  res.json({
    success: true,
    data: offers,
  });
});

exports.getOfferById = asyncHandler(async (req, res) => {
  const offer = await offerService.getOffer(req.params.id);
  if (!offer) {
    return res.status(404).json({ success: false, message: "Offer not found" });
  }
  res.json({ success: true, data: offer });
});

exports.updateOfferStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["Pending", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }
  const offer = await offerService.updateOfferStatus(req.params.id, status);
  res.json({ success: true, message: `Offer ${status.toLowerCase()}`, data: offer });
});

exports.deleteOffer = asyncHandler(async (req, res) => {
  await offerService.deleteOffer(req.params.id);
  res.json({ success: true, message: "Offer deleted" });
});
