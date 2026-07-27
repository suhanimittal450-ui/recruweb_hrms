const Offer = require("../../models/recruitment/Offer");

class OfferRepository {
  create(data) {
    return Offer.create(data);
  }

  findAll() {
    return Offer.find().populate("candidate");
  }

  findById(id) {
    return Offer.findById(id).populate("candidate");
  }

  update(id, data) {
    return Offer.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  delete(id) {
    return Offer.findByIdAndDelete(id);
  }
}

module.exports = new OfferRepository();
