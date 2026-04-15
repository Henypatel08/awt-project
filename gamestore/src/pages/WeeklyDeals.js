import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import "./GiftCards.css"; // Reusing GiftCards styles for simplicity as they are identical layouts

function WeeklyDeals() {
  const navigate = useNavigate();

  const deals = [
    { name: "GTA V", price: "₹1999", dealPrice: "₹1499", image: "https://wallpapers.com/images/hd/gta-5-background-h6i6i6i6i6i6i6i6.jpg" },
    { name: "Cyberpunk 2077", price: "₹1899", dealPrice: "₹1599", image: "https://wallpapers.com/images/hd/cyberpunk-2077-keanu-reeves-ps5-4k-7zux9zq9zq9zq9zq.jpg" },
    { name: "RDR 2", price: "₹1799", dealPrice: "₹1399", image: "https://wallpapers.com/images/hd/red-dead-redemption-2-background-h6i6i6i6i6i6i6i6.jpg" }
  ];

  return (
    <div className="gift-cards-page">
      <Navbar />

      <div className="gift-cards-container">
        <h1>{"// WEEKLY DEALS"}</h1>
        <p>Limited-time price reductions on high-performance combat simulations.</p>

        <div className="gift-cards-grid">
          {deals.map((game, index) => (
            <div key={index} className="gift-card-modern" style={{ padding: "0", overflow: "hidden" }}>
               <img src={game.image} alt={game.name} style={{ width: "100%", height: "140px", objectFit: "cover" }} referrerPolicy="no-referrer" />
               <div style={{ padding: "20px" }}>
                 <h3>{game.name.toUpperCase()}</h3>
                 <p className="game-price-modern">
                   <span style={{ textDecoration: "line-through", color: "#666", marginRight: "10px", fontSize: "0.9rem" }}>
                     {game.price}
                   </span>
                   {game.dealPrice}
                 </p>
               </div>
              <button className="buy-gift-btn" onClick={() => navigate("/store")}>
                CLAIM DEAL
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

export default WeeklyDeals;