const offerRepository = require("../../repositories/recruitment/offerRepository");
const candidateRepository = require("../../repositories/candidate/candidateRepository");
const { generateOfferLetterPdf } = require("../../helpers/generateOfferLetter");

class OfferService {
  async createOffer(data) {
    const offer = await offerRepository.create(data);

    // Best-effort PDF generation — an offer without a rendered letter is
    // still useful (candidate/salary/status are saved), so we don't fail
    // the whole request if PDF rendering has a problem.
    try {
      const candidate = await candidateRepository.findById(data.candidate);
      const offerLetterUrl = await generateOfferLetterPdf({
        offerId: offer._id,
        candidateName: candidate ? `${candidate.firstName} ${candidate.lastName || ""}`.trim() : undefined,
        designation: candidate?.designation?.designationName,
        salary: data.salary,
        joiningDate: data.joiningDate,
      });
      offer.offerLetter = offerLetterUrl;
      await offer.save();
    } catch (err) {
      // Swallow — offer creation already succeeded.
    }

    return offer;
  }

  getOffers() {
    return offerRepository.findAll();
  }

  getOffer(id) {
    return offerRepository.findById(id);
  }

  updateOffer(id, data) {
    return offerRepository.update(id, data);
  }

  updateOfferStatus(id, status) {
    return offerRepository.update(id, { status });
  }

  deleteOffer(id) {
    return offerRepository.delete(id);
  }
}

module.exports = new OfferService();
