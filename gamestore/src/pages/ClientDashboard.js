import Navbar from "../Components/Navbar";
import "./ClientDashboard.css";

function ClientDashboard() {
  const myGames = [
    { name: "GTA V", price: "₹1200" },
    { name: "Cyberpunk 2077", price: "₹2800" }
  ];

  return (
    <div className="client-dashboard-page">
      <Navbar />

      <div className="client-container">
        <h1 className="client-title">{"// MY PURCHASES"}</h1>

        {myGames.length > 0 ? (
          <div className="purchases-grid">
            {myGames.map((game, index) => (
              <div key={index} className="purchase-card-modern">
                <h3>{game.name.toUpperCase()}</h3>
                <p>{game.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-purchases">
            <h2>NO ACQUISITIONS FOUND.</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientDashboard;