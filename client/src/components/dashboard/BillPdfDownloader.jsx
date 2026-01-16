import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ROWS_PER_PAGE = 25;

function BillPdfDownloader({ bills }) {
  const pagesRef = useRef([]);
  const [pdfBills, setPdfBills] = useState([]);

  const safeBills = Array.isArray(bills) ? bills : [];

  /* ========= SPLIT DATA INTO 25-ROW PAGES ========= */
  const chunkBills = (data) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += ROWS_PER_PAGE) {
      chunks.push(data.slice(i, i + ROWS_PER_PAGE));
    }
    return chunks;
  };

  /* ========= GENERATE PDF ========= */
  const generatePDF = async (type) => {
    const filtered =
      type === "ALL"
        ? safeBills
        : safeBills.filter(
            (b) => b.paid_or_not === (type === "PAID" ? "Yes" : "No")
          );

    if (!filtered.length) {
      alert("No data available");
      return;
    }

    // set filtered data for hidden render
    setPdfBills(filtered);

    // wait for DOM to render
    setTimeout(async () => {
      const pages = chunkBills(filtered);
      const pdf = new jsPDF("p", "mm", "a4");

      for (let i = 0; i < pages.length; i++) {
        const element = pagesRef.current[i];
        if (!element) continue;

        const canvas = await html2canvas(element, {
          scale: 1.5,
          backgroundColor: "#ffffff",
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.85);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`${type}_Bill_Report.pdf`);
    }, 300);
  };

  const pages = chunkBills(pdfBills);

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 mt-8">
      <h3 className="text-2xl font-extrabold mb-4">
        Download Reports (PDF)
      </h3>

      {/* ===== BUTTONS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => generatePDF("ALL")}
          className="bg-blue-600 text-white py-3 rounded-xl font-bold"
        >
          All Users
        </button>

        <button
          onClick={() => generatePDF("PAID")}
          className="bg-green-600 text-white py-3 rounded-xl font-bold"
        >
          Paid Users
        </button>

        <button
          onClick={() => generatePDF("UNPAID")}
          className="bg-red-600 text-white py-3 rounded-xl font-bold"
        >
          Unpaid Users
        </button>
      </div>

      {/* ===== HIDDEN PAGES FOR PDF ===== */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        {pages.map((pageBills, pageIndex) => (
          <div
            key={pageIndex}
            ref={(el) => (pagesRef.current[pageIndex] = el)}
            style={{
              width: "794px",
              padding: "30px",
              background: "#fff",
              fontFamily: "'Noto Sans Bengali', sans-serif",
              color: "#000",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              বিল রিপোর্ট (Page {pageIndex + 1})
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr style={{ background: "#16a34a", color: "#fff" }}>
                  <th style={th}>#</th>
                  <th style={th}>Name</th>
                  <th style={th}>Bill No</th>
                  <th style={th}>Amount</th>
                  <th style={th}>Paid</th>
                </tr>
              </thead>
              <tbody>
                {pageBills.map((bill, i) => (
                  <tr key={i}>
                    <td style={tdCenter}>{pageIndex * ROWS_PER_PAGE + i + 1}</td>
                    <td style={td}>{bill.name}</td>
                    <td style={tdCenter}>{bill.billNo}</td>
                    <td style={tdCenter}>{bill.billed_amount}</td>
                    <td style={tdCenter}>{bill.paid_or_not}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========= TABLE STYLES ========= */
const th = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center",
};

const td = {
  border: "1px solid #000",
  padding: "6px",
};

const tdCenter = {
  border: "1px solid #000",
  padding: "6px",
  textAlign: "center",
};

export default BillPdfDownloader;
