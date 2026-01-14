import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BillStats from "./BillStats";
import BillPdfDownloader from "./BillPdfDownloader";

function BillsDashboard({ baseUrl }) {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ALL BILLS ================= */
  const fetchBills = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/getAllBills`);
      // ✅ FIX: extract array safely
      const billsArray = Array.isArray(res.data) ? res.data : res.data.bills;
      setBills(billsArray);
      setFilteredBills(billsArray);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed to fetch bills");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const filtered = bills.filter(
      (bill) =>
        bill.billNo.toLowerCase().includes(search.toLowerCase()) ||
        bill.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBills(filtered);
  }, [search, bills]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading bills...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 font-sans">
      <BillStats bills={filteredBills} />
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Bills Dashboard
          </h2>
          {/*Bill Cards */}

          <input
            type="text"
            placeholder="Search by Bill No or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-80 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-emerald-600/95 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Bill No</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Billed</th>
                <th className="px-4 py-2 text-left">Paid</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Bill Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No bills found
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{bill.billNo}</td>
                    <td className="px-4 py-2">{bill.name}</td>
                    <td className="px-4 py-2">₹ {bill.billed_amount}</td>
                    <td className="px-4 py-2">₹ {bill.paid_amount || 0}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          bill.paid_or_not === "Yes"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {bill.paid_or_not}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(bill.date1).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <Link
                        to={`/update-bill?billNo=${bill.billNo}`}
                        className="text-green-600 font-semibold hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <BillPdfDownloader bills={filteredBills} />

    </div>
  );
}

export default BillsDashboard;
