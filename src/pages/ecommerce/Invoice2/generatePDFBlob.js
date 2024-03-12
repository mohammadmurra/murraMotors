import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDFBlob = (elementId) => {
  return new Promise((resolve, reject) => {
    const input = document.getElementById(elementId);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });
    html2canvas(input, {
      allowTaint: true,
      useCORS: true,
      scale: 4, // adjust as needed
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgWidth = 595.28;
        const pageHeight = 841.89;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const blob = pdf.output('blob');

        resolve(blob);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
