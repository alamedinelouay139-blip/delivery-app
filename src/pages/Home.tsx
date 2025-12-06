import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-4">

      <h1 className="text-3xl font-bold mb-6">Delivery Manager</h1>

      <Link 
        to="/add" 
        className="w-60 text-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        ➕ Add Order
      </Link>

      <Link 
        to="/orders" 
        className="w-60 text-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        📋 View Orders
      </Link>

      <Link 
        to="/summary" 
        className="w-60 text-center p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        📊 Summary
      </Link>
      
    </div>
  );
}
