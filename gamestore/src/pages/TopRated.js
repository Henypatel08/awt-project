import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import "./GiftCards.css"; // Reusing GiftCards styles for simplicity as they are identical layouts

function TopRated() {
  const navigate = useNavigate();

  const games = [
    { name: "Elden Ring", rating: "⭐ 9.8", price: "₹3500" },
    { name: "God of War", rating: "⭐ 9.7", price: "₹3000" },
    { name: "The Witcher 3", rating: "⭐ 9.6", price: "₹1500" }
  ];

  return (
    <div className="gift-cards-page">
      <Navbar />

      <div className="gift-cards-container">
        <h1>{"// TOP RATED"}</h1>
        <p>Highest rated combat programs and simulations currently verified.</p>

        <div className="gift-cards-grid">
          {games.map((game, index) => (
            <div key={index} className="gift-card-modern">
               <span className="gift-card-icon">{game.rating}</span>
              <h3>{game.name.toUpperCase()}</h3>
              <p className="game-price-modern">{game.price}</p>
              <button className="buy-gift-btn" onClick={() => navigate("/store")}>
                VIEW IN STORE
              </button>
            </div>
          ))}
        </div>

        <button className="back-to-store-btn" onClick={() => navigate("/store")}>
          ← BACK TO ARMORY
        </button>
      </div>
    </div>
  );
}

export default TopRated;