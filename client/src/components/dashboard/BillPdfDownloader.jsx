import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BillPdfDownloader({ bills }) {
  const tableRef = useRef();
  const [printData, setPrintData] = useState([]); // State for the hidden table
  const safeBills = Array.isArray(bills) ? bills : [];

  const generatePDF = async (type) => {
    // 1. Determine which data to show
    const filtered = type === "ALL" 
      ? safeBills 
      : safeBills.filter(b => b.paid_or_not === (type === "PAID" ? "Yes" : "No"));

    if (!filtered.length) {
      alert("No data available for this category");
      return;
    }

    // 2. Update the state so the hidden HTML table updates
    setPrintData(filtered);

    // 3. Small delay to allow React to finish rendering the new rows
    setTimeout(async () => {
      const element = tableRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const totalImgHeightInMm = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = totalImgHeightInMm;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, totalImgHeightInMm);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - totalImgHeightInMm;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, totalImgHeightInMm);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${type}_Report.pdf`);
    }, 500); // 500ms delay ensures the table is updated before the "photo" is taken
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 mt-8">
      <h3 className="text-2xl font-extrabold mb-4">Download Reports (PDF)</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => generatePDF("ALL")} className="bg-blue-600 text-white py-3 rounded-xl">All Users</button>
        <button onClick={() => generatePDF("PAID")} className="bg-green-600 text-white py-3 rounded-xl">Paid Users</button>
        <button onClick={() => generatePDF("UNPAID")} className="bg-red-600 text-white py-3 rounded-xl">Unpaid Users</button>
      </div>

      {/* HIDDEN TABLE: Now maps over 'printData' instead of 'safeBills' */}
      <div style={{ overflow: "hidden", height: 0, width: 0 }}>
        <div ref={tableRef} style={{ padding: "40px", width: "800px", background: "white", color: "black", fontFamily: "'Noto Sans Bengali', sans-serif" }}>
          <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
             Bill Report
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#16a34a", color: "white" }}>
                <th style={{ border: "1px solid #000", padding: "12px" }}>#</th>
                <th style={{ border: "1px solid #000", padding: "12px" }}>Name</th>
                <th style={{ border: "1px solid #000", padding: "12px" }}>Bill No</th>
                <th style={{ border: "1px solid #000", padding: "12px" }}>Amount</th>
                <th style={{ border: "1px solid #000", padding: "12px" }}>Paid or not</th>
              </tr>
            </thead>
            <tbody>
              {printData.map((bill, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #000", padding: "10px", textAlign: "center" }}>{i + 1}</td>
                  <td style={{ border: "1px solid #000", padding: "10px" }}>{bill.name}</td>
                  <td style={{ border: "1px solid #000", padding: "10px", textAlign: "center" }}>{bill.billNo}</td>
                  <td style={{ border: "1px solid #000", padding: "10px", textAlign: "center" }}>{bill.billed_amount}</td>
                  <td style={{ border: "1px solid #000", padding: "10px", textAlign: "center" }}>
                    {bill.paid_or_not}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillPdfDownloader;