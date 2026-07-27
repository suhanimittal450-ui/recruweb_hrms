const express = require("express");
const router = express.Router();

const offerController = require("../../controllers/recruitment/offerController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", authMiddleware, offerController.createOffer);
router.get("/", authMiddleware, offerController.getOffers);
router.get("/:id", authMiddleware, offerController.getOfferById);
router.patch("/:id/status", authMiddleware, offerController.updateOfferStatus);
router.delete("/:id", authMiddleware, offerController.deleteOffer);

module.exports = router;
