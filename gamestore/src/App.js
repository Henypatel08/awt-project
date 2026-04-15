import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import GameDetails from "./pages/GameDetails";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Checkout from "./pages/Checkout";
import GiftCards from "./pages/GiftCards";
import WeeklyDeals from "./pages/WeeklyDeals";
import TopRated from "./pages/TopRated";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gamedetails" element={<GameDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/giftcards" element={<GiftCards />} />
        <Route path="/weeklydeals" element={<WeeklyDeals />} />
        <Route path="/toprated" element={<TopRated />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;