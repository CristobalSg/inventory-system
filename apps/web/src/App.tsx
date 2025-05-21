import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Usuarios from "./pages/Usuarios";
import Products from "./pages/Products";
import PurchasePage from "./pages/PurchasePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/users" element={<Usuarios />} /> */}
        <Route path="/" element={<PurchasePage />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
