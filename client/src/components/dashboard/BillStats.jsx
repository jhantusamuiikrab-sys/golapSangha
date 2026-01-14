import React from "react";

function BillStats({ bills }) {
  // Safety check
  const safeBills = Array.isArray(bills) ? bills : [];

  const totalUsers = safeBills.length;

  const paidUsers = safeBills.filter(
    (b) => b.paid_or_not === "Yes"
  ).length;

  const unpaidUsers = safeBills.filter(
    (b) => b.paid_or_not === "No"
  ).length;

  const totalBilledAmount = safeBills.reduce(
    (sum, b) => sum + Number(b.billed_amount || 0),
    0
  );

  const totalPaidAmount = safeBills.reduce(
    (sum, b) => sum + Number(b.paid_amount || 0),
    0
  );

  const totalUnpaidAmount = totalBilledAmount - totalPaidAmount;

  const Card = ({ title, value, color }) => (
    <div
      className={`bg-white border-l-4 ${color} shadow-md rounded-xl p-5 m-2 mt-4 flex flex-col gap-2`}
    >
      <p className="text-sm text-gray-500 font-semibold">{title}</p>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <Card
        title="Total Users"
        value={totalUsers}
        color="border-blue-500"
      />
      <Card
        title="Paid Users"
        value={paidUsers}
        color="border-green-500"
      />
      <Card
        title="Unpaid Users"
        value={unpaidUsers}
        color="border-red-500"
      />
      <Card
        title="Total Billed Amount"
        value={`₹ ${totalBilledAmount.toLocaleString()}`}
        color="border-purple-500"
      />
      <Card
        title="Total Paid Amount"
        value={`₹ ${totalPaidAmount.toLocaleString()}`}
        color="border-green-600"
      />
      <Card
        title="Total Unpaid Amount"
        value={`₹ ${totalUnpaidAmount.toLocaleString()}`}
        color="border-red-600"
      />
    </div>
  );
}

export default BillStats;
