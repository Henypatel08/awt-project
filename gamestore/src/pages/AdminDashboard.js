import { useNavigate } from "react-router-dom"; // Essential for navigation
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import API_BASE_URL from "../apiConfig";
import "./Admin.css";

function AdminDashboard() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: "",
    price: "",
    genre: "",
    imageUrl: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // FETCH ALL GAMES
  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/games`);
      const data = await response.json();
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // ADD NEW GAME
  const handleAddGame = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame),
      });

      if (response.ok) {
        alert("Game added successfully!");
        setNewGame({ title: "", price: "", genre: "", imageUrl: "", description: "" });
        fetchGames(); // Refresh list
      }
    } catch (error) {
      alert("Error adding game");
    }
  };

  // DELETE GAME
  const handleDeleteGame = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/games/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Game deleted!");
        fetchGames(); // Refresh list
      }
    } catch (error) {
      alert("Error deleting game");
    }
  };

  return (
    <div className="admin-page-modern">
      <Navbar />

      <div className="admin-container-modern">
        <header className="admin-header-modern">
          <div>
            <h1 className="admin-title-modern">{"// COMMAND CENTER"}</h1>
            <p className="admin-subtitle-modern">SYSTEM STATUS: <span className="status-online">ONLINE</span></p>
          </div>
          <button className="logout-btn-modern" onClick={handleLogout}>SECURE LOGOUT</button>
        </header>

        {/* ANALYTICS GRID */}
        <div className="admin-cards-modern">
          <div className="glass-card">
            <span className="card-label">SYS.INVENTORY</span>
            <p className="card-value">{games.length}</p>
            <span className="card-trend">ACTIVE ASSETS</span>
          </div>

          <div className="glass-card">
            <span className="card-label">SYS.REVENUE</span>
            <p className="card-value">₹14,500</p>
            <span className="card-trend up">↑ +12% CYCLE</span>
          </div>

          <div className="glass-card">
            <span className="card-label">SYS.ACCOUNTS</span>
            <p className="card-value">254</p>
            <span className="card-trend">VERIFIED</span>
          </div>
        </div>

        {/* ADD GAME FORM */}
        <div className="management-section glass-card">
          <h2 className="section-title">{"// UPLOAD NEW ASSET"}</h2>
          <div className="admin-form-container" style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <form onSubmit={handleAddGame} className="add-game-form" style={{ flex: "2" }}>
              <div className="form-grid-modern">
                <input
                  type="text"
                  placeholder="Game Title"
                  value={newGame.title}
                  onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={newGame.price}
                  onChange={(e) => setNewGame({ ...newGame, price: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Genre"
                  value={newGame.genre}
                  onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="IMAGE URL (Required for Store Display)"
                  value={newGame.imageUrl}
                  onChange={(e) => setNewGame({ ...newGame, imageUrl: e.target.value })}
                  className="heavy-input"
                  required
                />
              </div>
              <textarea
                placeholder="Game Description"
                value={newGame.description}
                onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                required
              ></textarea>
              <button type="submit" className="submit-btn-modern">INITIATE UPLOAD</button>
            </form>

            {/* LIVE PREVIEW WINDOW */}
            <div className="asset-preview-pane glass-panel" style={{ flex: "1", minWidth: "250px", border: "1px solid var(--store-accent)", padding: "15px", textAlign: "center", background: "rgba(0,0,0,0.4)" }}>
              <span className="card-label" style={{ display: "block", marginBottom: "10px" }}>LIVE.ASSET_PREVIEW</span>
              {newGame.imageUrl ? (
                <img 
                  src={newGame.imageUrl} 
                  alt="Preview" 
                  style={{ width: "100%", height: "150px", objectFit: "cover", border: "1px solid #333" }}
                  onError={(e) => e.target.src = "https://placehold.co/600x400/0a0a0c/00f2fe?text=INVALID+URL"}
                />
              ) : (
                <div style={{ height: "150px", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}>
                  WAITING FOR URL...
                </div>
              )}
              <p className="dim-text" style={{ fontSize: "0.8rem", marginTop: "10px" }}>Testing Art: {newGame.title || "Untitled"}</p>
            </div>
          </div>
        </div>

        {/* INVENTORY TABLE */}
        <div className="orders-section-modern glass-card">
          <div className="section-header-modern">
            <h2>{"// INVENTORY MANAGEMENT"}</h2>
          </div>

          <div className="table-wrapper-modern">
            <table>
              <thead>
                <tr>
                  <th>ASSET TITLE</th>
                  <th>GENRE</th>
                  <th>CREDITS</th>
                  <th>PROGRAM STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game._id}>
                    <td><strong className="bright-text">{game.title.toUpperCase()}</strong></td>
                    <td className="dim-text">{game.genre.toUpperCase()}</td>
                    <td className="price-cell-modern">₹{game.price}</td>
                    <td><span className="status-pill-modern success">ACTIVE</span></td>
                    <td>
                      <button 
                        className="delete-action-btn"
                        onClick={() => handleDeleteGame(game._id)}
                      >
                        SCRUB
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {games.length === 0 && !loading && (
              <p className="empty-msg-modern">NO ASSETS DETECTED IN SECTOR.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;