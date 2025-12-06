import { useState, useEffect } from "react";

export default function AddOrder() {
  const [customer, setCustomer] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [amount, setAmount] = useState("");
const [delivery, setDelivery] = useState("");
const [deliveries, setDeliveries] = useState<string[]>([]);
const [newDelivery, setNewDelivery] = useState("");
 useEffect(() => {
    const stored = localStorage.getItem("deliveries");
    if(stored) setDeliveries(JSON.parse(stored));
  },[]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder = {
      id: Date.now(), // unique id
      customer,//hydi al mawjudi bl setcustomer yali mawjude bl state 
      orderNumber,
      amount: Number(amount),
      delivery,
time: new Date().toLocaleTimeString("en-US", {
  timeZone: "Asia/Beirut",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})

    };

    const stored = localStorage.getItem("orders");//hon am jib al data
    const orders = stored ? JSON.parse(stored) : [];//hydi if condition iza fi stored bihawla la arrray iza mfi am bihet fadye
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));//stringify laan lzm tkun string mch object

    alert("Order Saved! ✔");

    // reset fields
    setCustomer("");
    setOrderNumber("");
    setAmount("");
    setDelivery("ezzo");
  };

return (
  <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl border">

    <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
      Add New Order
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      <input 
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e)=>setCustomer(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        required
      />

      <input 
        type="number"
        placeholder="Amount (LBP)"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        required
      />
<div className="flex gap-2 mb-4">
  <input
    type="text"
    placeholder="Add New Delivery"
    className="border p-2 rounded flex-1"
    value={newDelivery}
    onChange={(e)=>setNewDelivery(e.target.value)}
  />
<button
  type="button"   // ✅ مهم
  onClick={()=>{

      if(newDelivery.trim()==="") return;
      const updated = [...deliveries, newDelivery];
      setDeliveries(updated);
      localStorage.setItem("deliveries", JSON.stringify(updated));
      setNewDelivery("");
    }}
    className="bg-green-600 text-white px-3 rounded"
  >
    ➕
  </button>
</div>

     <select
  value={delivery}
  onChange={(e)=>setDelivery(e.target.value)}
  className="border p-2 rounded w-full"
>
  {deliveries.map(d => <option key={d} value={d}>{d}</option>)}
</select>
<div className="mt-4">
  <h3 className="font-semibold mb-2">Your Deliveries:</h3>
  
  {deliveries.length === 0 && (
    <p className="text-gray-500 text-sm">No delivery added yet</p>
  )}

  <ul className="space-y-2">
    {deliveries.map((d,i)=>(
      <li key={i} className="flex justify-between bg-gray-100 p-2 rounded">
        <span>{d}</span>
        <button
          className="text-red-600 font-bold"
          onClick={()=>{
            const updated = deliveries.filter(item => item !== d);
            setDeliveries(updated);
            localStorage.setItem("deliveries", JSON.stringify(updated));

            // لو الاسم المحذوف هو المختار حاليًا نفضّيه
            if(delivery === d) setDelivery("");
          }}
        >
          ❌
        </button>
      </li>
    ))}
  </ul>
</div>


      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-lg font-semibold transition"
      >
        Save Order
      </button>

    </form>
  </div>
);

}
