import Navbar from "../Components/Navbar";
import "./Store.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../apiConfig";

function Store() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlSearch = query.get("search") || "";

  const [search, setSearch] = useState(urlSearch);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/games`);
        const data = await response.json();
        const formattedGames = data.map(game => ({
          ...game,
          name: game.title,
          category: game.genre,
          image: game.imageUrl,
          rating: `⭐ ${game.rating}`,
          price: game.price,
        }));
        setGames(formattedGames);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    
    fetchGames();
  }, []);

  const buyGame = (game) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyAdded = cart.find(item => item.name === game.name);

    if (alreadyAdded) {
      alert("Game already in cart!");
      navigate("/cart");
      return;
    }

    cart.push(game);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Redirect the user immediately to the cart page so they see it worked!
    navigate("/cart");
  };

  const categories = [...new Set(games.map(game => game.category))];

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const GameRow = ({ title, gameList }) => {
    if (gameList.length === 0) return null;

    return (
      <div className="store-category-section">
        <h2 className="store-section-title">{title}</h2>
        <div className="store-game-grid">
          {gameList.map((game, index) => (
            <div className="store-modern-card" key={index}>
              <div className="store-card-image">
                <img 
                  src={game.image} 
                  alt={game.name} 
                  referrerPolicy="no-referrer" 
                  onError={(e) => e.target.src = "https://placehold.co/600x400/0a0a0c/00f2fe?text=ARMORY+ASSET"}
                />
                <div className="store-card-overlay">
                  <button className="store-buy-btn" onClick={() => buyGame(game)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="store-card-content" onClick={() => navigate("/game-details", { state: { game } })} style={{ cursor: "pointer" }}>
                <h3>{game.name}</h3>
                <div className="store-card-meta">
                  <span className="store-price">{game.price === 0 ? "FREE" : `₹${game.price}`}</span>
                  <span className="store-rating">{game.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="store-container-modern">
      <Navbar />

      <header className="store-header">
        <h1>THE ARMORY</h1>
        <p>Explore, purchase, and dominate.</p>
        <input 
          type="text" 
          placeholder="SEARCH GAMES..." 
          className="store-search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <div className="store-main-layout">
        {search ? (
          <GameRow title={`RESULTS FOR "${search.toUpperCase()}"`} gameList={filteredGames} />
        ) : (
          <>
            <GameRow title="🔥 TRENDING NOW" gameList={games.slice(0, 4)} />

            {categories.map(cat => (
              <GameRow
                key={cat}
                title={`// ${cat.toUpperCase()}`}
                gameList={games.filter(g => g.category === cat)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Store;