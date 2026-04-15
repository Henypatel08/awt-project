import Navbar from "../Components/Navbar";
import "./GameDetails.css";

import { useLocation } from "react-router-dom";

function GameDetails() {
  const location = useLocation();
  const game = location.state?.game || {
    name: "Game Not Found",
    price: "N/A",
    image: "",
    description: "Please select a game from the store."
  };

  return (
    <div className="game-details-page">
      <Navbar />

      <div className="game-details-container-modern">
        <img src={game.image} alt={game.name} className="game-image-modern" referrerPolicy="no-referrer" />

        <div className="game-info-modern">
          <h1>{game.name}</h1>
          <h3 className="game-price-modern">{game.price}</h3>

          <p className="game-description-modern">{game.description}</p>

          <button className="buy-btn-modern">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;