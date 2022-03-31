import React from 'react';
import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';

import { generateExportTitle } from '../utils';

export default function PDFButton({ data }) {
  const columns = ['Name', 'Title', 'Company', 'Link'];
  const jsonColumns = ['name', 'title', 'company', 'url'];

  // Manually apply autotable shim
  applyPlugin(jsPDF);

  const makePDF = () => {
    let pdfRows = [];

    // For each found recruit, add a row to the PDF table
    data.forEach((recruit) => {
      let row = [];

      jsonColumns.forEach((heading) => {
        row.push(recruit[heading]);
      });

      pdfRows.push(row);
    });

    const doc = new jsPDF('p', 'pt');

    const tableOptions = {
      styles: {
        cellPadding: 7,
        columnWidth: 'wrap',
        overflow: 'linebreak',
      },
      theme: 'grid',
      columnStyles: {
        0: {
          fontStyle: 'bold',
          columnWidth: 100,
        },
        1: {
          columnWidth: 100,
        },
        2: {
          columnWidth: 100,
        },
        3: {
          columnWidth: 225,
        },
      },
      headerStyles: {
        fillColor: [241, 81, 30],
      },
      margin: { top: 60 },
      tableWidth: 'wrap',
      addPageContent: (data) => {
        // Place header in the center of the PDF
        let headerText = generateExportTitle();
        let textWidth =
          (doc.getStringUnitWidth(headerText) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;
        let textOffset = (doc.internal.pageSize.width - textWidth) / 2;

        doc.text(headerText, textOffset, 30);
      },
    };

    doc.autoTable(columns, pdfRows, tableOptions);
    doc.save(`${generateExportTitle()}.pdf`);
  };

  return (
    <button class="button mediabutton" onClick={makePDF}>
      Export PDF
    </button>
  );
}
