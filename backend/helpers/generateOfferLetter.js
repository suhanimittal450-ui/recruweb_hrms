const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "..", "uploads", "offers");
fs.mkdirSync(outputDir, { recursive: true });

/**
 * Renders a simple offer letter PDF to disk and returns its public URL path
 * (served via the /uploads static route in app.js).
 */
const generateOfferLetterPdf = ({ offerId, candidateName, designation, salary, joiningDate }) =>
  new Promise((resolve, reject) => {
    const filename = `offer-${offerId}.pdf`;
    const filePath = path.join(outputDir, filename);
    const doc = new PDFDocument({ margin: 60 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text("Offer of Employment", { align: "center" });
    doc.moveDown(2);
    doc.fontSize(11).text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Dear ${candidateName || "Candidate"},`);
    doc.moveDown();
    doc.text(
      `We are pleased to offer you the position of ${designation || "the role you applied for"} ` +
        `with our organization. This letter outlines the key terms of your offer.`,
      { align: "justify" },
    );
    doc.moveDown();
    doc.text(`Annual / Monthly Compensation: ${salary ? `₹${Number(salary).toLocaleString("en-IN")}` : "To be confirmed"}`);
    doc.text(`Proposed Joining Date: ${joiningDate ? new Date(joiningDate).toDateString() : "To be confirmed"}`);
    doc.moveDown(2);
    doc.text(
      "This offer is contingent upon successful completion of your background verification and " +
        "submission of the required onboarding documents. Please sign and return a copy of this " +
        "letter to confirm your acceptance.",
      { align: "justify" },
    );
    doc.moveDown(3);
    doc.text("Sincerely,");
    doc.text("HR Team");

    doc.end();

    stream.on("finish", () => resolve(`/uploads/offers/${filename}`));
    stream.on("error", reject);
  });

module.exports = { generateOfferLetterPdf };
