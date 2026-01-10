import { useState } from "react";
import axios from "axios";

function NewBill() {
  const [formData, setFormData] = useState({
    name: "",
    billed_amount: "",
    paid_amount: "",
    date1: "",
    date2: "",
    paid_or_not: "",
    billNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Extra safety check: ensuring mandatory fields are not just empty strings
    const { name, billed_amount, date1, paid_or_not, billNo } = formData;
    if (!name || !billed_amount || !date1 || !paid_or_not || !billNo) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/create", formData);
      alert("Bill created successfully ✨");
      setFormData({ name: "", billed_amount: "", paid_amount: "", date1: "", date2: "", paid_or_not: "", billNo: "" });
    } catch (error) {
      error.response?.status === 409 ? alert("Bill No already exists") : alert("Failed to create bill");
    }
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white";
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1 mt-3";
  // Red asterisk component
  const Required = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 border border-gray-100">
        
        <header className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Create New Bill</h2>
          <p className="text-gray-500 text-sm mt-2">Fields marked with <span className="text-red-500">*</span> are mandatory</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-1">
          
          <div>
            <label className={labelClass}> Name <Required /></label>
            <input required name="name" placeholder="Enter name" className={inputClass} value={formData.name} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Billed Amount <Required /></label>
              <input required type="number" name="billed_amount" placeholder="0" className={inputClass} value={formData.billed_amount} onChange={handleChange} />
            </div>
            <div>
              <label className={labelClass}>Paid Amount</label>
              <input type="number" name="paid_amount" placeholder="0 (Optional)" className={inputClass} value={formData.paid_amount} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Bill Date <Required /></label>
              <input required type="date" name="date1" className={inputClass} value={formData.date1} onChange={handleChange} />
            </div>
            <div>
              <label className={labelClass}>Due Date</label>
              <input type="date" name="date2" className={inputClass} value={formData.date2} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Paid Status <Required /></label>
              <select required name="paid_or_not" className={inputClass} value={formData.paid_or_not} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Bill Number <Required /></label>
              <input required name="billNo" placeholder="BILL-000" className={inputClass} value={formData.billNo} onChange={handleChange} />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            Generate Bill
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewBill;