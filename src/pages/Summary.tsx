import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Summary() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  /*const __Calc = (delivery: string) => {
  const list = orders.filter(o => o.delivery === delivery);
  const total = list.reduce((sum, o) => sum + o.amount, 0);

  return { 
    count: list.length,
    total
  };
};*/

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Delivery Summary Report", 14, 15);

    const tableData = orders.map((o, i) => [
      i + 1,
      o.customer,
      o.delivery,
      o.amount + " LBP",
      o.time
    ]);

    autoTable(doc, {
      startY: 25,
      head: [["#", "Customer", "Delivery", "Amount", "Time"]],
      body: tableData,
    });

    doc.save("orders_summary.pdf");
  };

const deliveryNames = Array.from(new Set(orders.map(o => o.delivery)));

const summary = deliveryNames.map(name => {
  const total = orders
    .filter(o => o.delivery === name)
    .reduce((sum, o) => sum + o.amount, 0);

  const count = orders.filter(o => o.delivery === name).length;

  return { name, total, count };
});

const totalAll = summary.reduce((sum, d) => sum + d.total, 0);

  return (
    <div className="max-w-md mx-auto p-6 mt-8 shadow rounded border">

      <h2 className="text-2xl font-bold mb-4 text-center">Daily Summary</h2>

      {/* PDF Button */}
      <button 
        onClick={exportPDF}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-4 w-full"
      >
        📄 Export PDF
      </button>

      <table className="w-full border-collapse border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Delivery</th>
            <th className="border p-2">Orders Count</th>
            <th className="border p-2">Total LBP</th>
          </tr>
        </thead>

       <tbody>
  {summary.map((d,i)=>(
    <tr key={i}>
      <td className="border p-2">{d.name}</td>
      <td className="border p-2">{d.count}</td>
      <td className="border p-2">{d.total}</td>
    </tr>
  ))}

  <tr className="bg-green-200 font-bold">
    <td className="border p-2">TOTAL</td>
    <td className="border p-2"></td>
    <td className="border p-2">{totalAll}</td>
  </tr>
</tbody>

      </table>

    </div>
  );
}
