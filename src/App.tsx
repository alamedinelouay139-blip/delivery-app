import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddOrder from "./pages/AddOrder";
import Orders from "./pages/Orders";
import Summary from "./pages/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
