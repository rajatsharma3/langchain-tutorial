import { PdfReader } from "pdfreader";

const parsePdf = async (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfText = [];

    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(pdfText.join(" "));
      } else if (item.text) {
        pdfText.push(item.text);
      }
    });
  });
};

export default parsePdf;
