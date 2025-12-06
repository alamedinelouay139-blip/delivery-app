import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [editingOrder, setEditingOrder] = useState<any|null>(null);
const [history, setHistory] = useState<any[][]>([]);
const [redoHistory, setRedoHistory] = useState<any[][]>([]);

const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);
  /*Delete Order Flow:
1) get all orders from localStorage
2) remove selected order
3) save orders again
4) update UI*/

const handleDelete = (id: number) => {
  setHistory([...history, orders]);      // حفظ نسخة قبل التعديل
  setRedoHistory([]);                    // إفراغ redo بعد عملية جديدة

  const updated = orders.filter(order => order.id !== id);
  setOrders(updated);
  localStorage.setItem("orders", JSON.stringify(updated));
};

const startEdit = (order: any) => {
  setEditingOrder(order);
};
const saveEdit = () => {
  setHistory([...history, orders]);      // حفظ نسخة قبل التعديل
  setRedoHistory([]);

  const updated = orders.map(o => 
    o.id === editingOrder.id ? editingOrder : o
  );

  setOrders(updated);
  localStorage.setItem("orders", JSON.stringify(updated));
  setEditingOrder(null);
};

const undo = () => {
  if (history.length === 0) return;

  const previous = history[history.length - 1];
  setRedoHistory([...redoHistory, orders]);
  setHistory(history.slice(0, history.length - 1));

  setOrders(previous);
  localStorage.setItem("orders", JSON.stringify(previous));
};

const redo = () => {
  if (redoHistory.length === 0) return;

  const next = redoHistory[redoHistory.length - 1];
  setHistory([...history, orders]);
  setRedoHistory(redoHistory.slice(0, redoHistory.length - 1));

  setOrders(next);
  localStorage.setItem("orders", JSON.stringify(next));
};
const exportJSON = () => {
  const data = JSON.stringify(orders, null, 2); // ترتيب JSON حلو
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "orders_backup.json";
  link.click();
};

 return (
  <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl border">

    <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
      Orders List
    </h2>
<input
      type="text"
      placeholder="Search by customer / delivery / amount..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
    />
    <div className="flex gap-3 mb-4">
  <button 
    onClick={undo}
    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-40"
    disabled={history.length === 0}
  >
    🔙 Undo
  </button>

  <button 
    onClick={redo}
    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-40"
    disabled={redoHistory.length === 0}
  >
    🔜 Redo
  </button>
</div>
<button 
  onClick={exportJSON}
  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mb-4 w-full"
>
  📁 Export JSON (Backup)
</button>

    {/* Edit Box */}
    {editingOrder && (
      <div className="p-4 border rounded-lg mb-6 bg-blue-50 shadow">
        <h3 className="font-semibold text-xl mb-3 text-blue-700">Edit Order</h3>

        <div className="space-y-3">

          <input 
            type="text"
            className="border p-2 rounded w-full"
            value={editingOrder.customer}
            onChange={(e)=>setEditingOrder({...editingOrder, customer:e.target.value})}
          />

          <input 
            type="number"
            className="border p-2 rounded w-full"
            value={editingOrder.amount}
            onChange={(e)=>setEditingOrder({...editingOrder, amount:Number(e.target.value)})}
          />

          <select 
            className="border p-2 rounded w-full"
            value={editingOrder.delivery}
            onChange={(e)=>setEditingOrder({...editingOrder, delivery:e.target.value})}
          >
            <option value="D1">Delivery 1</option>
            <option value="D2">Delivery 2</option>
            <option value="D3">Delivery 3</option>
          </select>

          <button 
            onClick={saveEdit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Save Edit
          </button>
        </div>
      </div>
    )}

    <table className="w-full border-collapse text-center">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="border p-2">#</th>
          <th className="border p-2">Customer</th>
          <th className="border p-2">Delivery</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Time</th>
          <th className="border p-2">Edit</th>
          <th className="border p-2">Delete</th>
        </tr>
      </thead>

      <tbody>
{orders
  .filter(order =>
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.delivery.toLowerCase().includes(search.toLowerCase()) ||
    String(order.amount).includes(search) ||
    String(order.orderNumber).includes(search)
  )
  .map((order, index) => (
          <tr key={order.id} className="hover:bg-gray-50">
            <td className="border p-2">{index + 1}</td>
            <td className="border p-2">{order.customer}</td>
            <td className="border p-2">{order.delivery}</td>
            <td className="border p-2 text-green-700 font-semibold">{order.amount} LBP</td>
            <td className="border p-2">{order.time}</td>

            <td className="border p-2">
              <button 
                onClick={()=>startEdit(order)}
                className="text-blue-600 font-semibold hover:underline"
              >
                ✏ Edit
              </button>
            </td>

            <td className="border p-2">
              <button 
                onClick={()=>handleDelete(order.id)}
                className="text-red-600 font-semibold hover:underline"
              >
                🗑 Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
);

}
