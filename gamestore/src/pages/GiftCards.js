import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import "./GiftCards.css";

function GiftCards() {
  const navigate = useNavigate();

  const buyGift = (amount) => {
    const gift = {
      name: amount + " Gift Card",
      price: amount,
      image: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(gift);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Gift Card added to cart!");
    navigate("/cart");
  };

  return (
    <div className="gift-cards-page">
      <Navbar />

      <div className="gift-cards-container">
        <h1>{"// GIFT CARDS"}</h1>
        <p>Transfer digital credits to other operatives within the network.</p>

        <div className="gift-cards-grid">
          <div className="gift-card-modern">
            <span className="gift-card-icon">🎁</span>
            <h3>₹1000 CREDITS</h3>
            <button className="buy-gift-btn" onClick={() => buyGift("₹1000")}>
              ACQUIRE
            </button>
          </div>

          <div className="gift-card-modern">
            <span className="gift-card-icon">🎁</span>
            <h3>₹2000 CREDITS</h3>
            <button className="buy-gift-btn" onClick={() => buyGift("₹2000")}>
              ACQUIRE
            </button>
          </div>
          
          <div className="gift-card-modern">
            <span className="gift-card-icon">🎁</span>
            <h3>₹5000 CREDITS</h3>
            <button className="buy-gift-btn" onClick={() => buyGift("₹5000")}>
              ACQUIRE
            </button>
          </div>
        </div>

        <button className="back-to-store-btn" onClick={() => navigate("/store")}>
          ← BACK TO ARMORY
        </button>
      </div>
    </div>
  );
}

export default GiftCards;