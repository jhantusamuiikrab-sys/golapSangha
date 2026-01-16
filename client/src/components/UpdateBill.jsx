import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UpdateBill({ baseUrl }) {
  const [searchBillNo, setSearchBillNo] = useState("");
  const [billId, setBillId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    billed_amount: "",
    paid_amount: "",
    date1: "",
    date2: "",
    paid_or_not: "",
    billNo: "",
  });

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50";
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1 mt-3";
  const Required = () => <span className="text-red-500 ml-1">*</span>;

  /* ================= SEARCH BILL BY BILL NO ================= */
  const handleSearch = async () => {
    if (!searchBillNo) {
      alert("Please enter Bill No");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${baseUrl}/getBillByBillno`,
        { billNo: searchBillNo } // ✅ FIXED
      );
      const bill = res.data;

      setBillId(bill._id); // store Mongo ID

      setFormData({
        name: bill.name,
        billed_amount: bill.billed_amount,
        paid_amount: bill.paid_amount || "",
        date1: bill.date1?.slice(0, 10),
        date2: bill.date2?.slice(0, 10),
        paid_or_not: bill.paid_or_not,
        billNo: bill.billNo,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Bill not found");
    }
  };

  /* ================= UPDATE BILL ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!billId) {
      alert("Search a bill first");
      return;
    }

    const { name, billed_amount, date1, paid_or_not, billNo } = formData;
    if (!name || !billed_amount || !date1 || !paid_or_not || !billNo) {
      alert("Please fill all mandatory fields");
      return;
    }

    try {
      await axios.put(`${baseUrl}/updateBill/${billId}`, formData);

      alert("Bill updated successfully ✨");
    } catch (error) {
      error.response?.status === 409
        ? alert("Bill No already exists")
        : alert("Failed to update bill");
    }
  };
  /* ================= DELETE BILL ================= */
  const handleDelete = async () => {
    if (!billId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseUrl}/deleteBill/${billId}`);

      alert("Bill deleted successfully 🗑️");

      // Reset everything
      setBillId(null);
      setSearchBillNo("");
      setFormData({
        name: "",
        billed_amount: "",
        paid_amount: "",
        date1: "",
        date2: "",
        paid_or_not: "",
        billNo: "",
      });
    } catch (error) {
      alert("Failed to delete bill");
    }
  };
  const billNo = new URLSearchParams(location.search).get("billNo");

  useEffect(() => {
    if (billNo) {
      setSearchBillNo(billNo);
    }
  }, [billNo]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mt-10 font-sans">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8">
        {/* 🔍 SEARCH SECTION */}
        <h2 className="text-2xl font-extrabold text-center mb-6">
          Search Bill
        </h2>

        <div className="flex gap-3 mb-6">
          <input
            className={inputClass}
            placeholder="Enter Bill No"
            value={searchBillNo}
            onChange={(e) => setSearchBillNo(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-emerald-600/95 text-white px-6 rounded-lg"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading bill...</p>
        )}

        {/* ✏️ UPDATE FORM */}
        {billId && (
          <>
            <h3 className="text-xl font-bold text-center mb-4">Update Bill</h3>

            <form onSubmit={handleSubmit} className="space-y-1">
              <label className={labelClass}>
                Name 
              </label>
              <input
                name="name"
                className={inputClass}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label className={labelClass}>
                Billed Amount 
              </label>
              <input
                type="number"
                name="billed_amount"
                className={inputClass}
                value={formData.billed_amount}
                onChange={(e) =>
                  setFormData({ ...formData, billed_amount: e.target.value })
                }
              />

              <label className={labelClass}>Paid Amount<Required /></label>
              <input
                type="number"
                name="paid_amount"
                className={inputClass}
                value={formData.paid_amount}
                onChange={(e) =>
                  setFormData({ ...formData, paid_amount: e.target.value })
                }
              />

              <label className={labelClass}>
                Bill Date 
              </label>
              <input
                type="date"
                name="date1"
                className={inputClass}
                value={formData.date1}
                onChange={(e) =>
                  setFormData({ ...formData, date1: e.target.value })
                }
              />

              <label className={labelClass}>Due Date<Required /></label>
              <input
                type="date"
                name="date2"
                className={inputClass}
                value={formData.date2}
                onChange={(e) =>
                  setFormData({ ...formData, date2: e.target.value })
                }
              />

              <label className={labelClass}>
                Paid Status <Required />
              </label>
              <select
                name="paid_or_not"
                className={inputClass}
                value={formData.paid_or_not}
                onChange={(e) =>
                  setFormData({ ...formData, paid_or_not: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <button
                type="submit"
                className="w-full mt-6 bg-emerald-600/95 text-white py-3 rounded-xl font-bold"
              >
                Update Bill
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-bold"
              >
                Delete Bill
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default UpdateBill;
