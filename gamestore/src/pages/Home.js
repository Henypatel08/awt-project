import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";

/* IMAGES */
import Mega_Man from "../Upcomingphoto/Mega Man Star Force Legacy Collection.jpg";
import FATAL_FRAME_2 from "../Upcomingphoto/FATAL FRAME 2.jpg";
import Marvels_Wolverine from "../Upcomingphoto/Marvel’s Wolverine.jpg";
import Subnautica_2 from "../Upcomingphoto/Subnautica 2.jpg";

function Home() {
  const navigate = useNavigate();

  const upcomingGames = [
    { name: "Mega Man Star Force", image: Mega_Man },
    { name: "FATAL FRAME 2", image: FATAL_FRAME_2 },
    { name: "Marvel's Wolverine", image: Marvels_Wolverine },
    { name: "Subnautica 2", image: Subnautica_2 },
  ];

  return (
    <div className="home-container">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">LEVEL UP YOUR REALITY</h1>
          <p>Immerse yourself in the next generation of gaming. Exclusive drops, legendary titles, and epic adventures await.</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/store")}>Enter Store</button>
            <button className="secondary-btn glow-effect" onClick={() => navigate("/register")}>Join Now</button>
          </div>
        </div>
      </section>

      {/* UPCOMING RELEASES */}
      <section className="upcoming-section glass-panel">
        <h2 className="section-title"><span>Upcoming</span> Hits</h2>
        <div className="game-grid">
          {upcomingGames.map((game, index) => (
            <div className="modern-card" key={index}>
              <div className="card-image-wrapper">
                <img 
                  src={game.image} 
                  alt={game.name} 
                  referrerPolicy="no-referrer" 
                  onError={(e) => e.target.src = "https://placehold.co/600x400/0a0a0c/00f2fe?text=UPCOMING+HIT"}
                />
                <div className="card-hover-action">
                  <button className="preorder-btn" onClick={() => navigate("/store")}>View Details</button>
                </div>
              </div>
              <div className="card-details">
                <h3>{game.name}</h3>
                <span className="badge">Coming Soon</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES / WHY US */}
      <section className="features">
        <div className="feature-card">
          <div className="icon-wrapper">🎮</div>
          <h3>Infinite Library</h3>
          <p>Access thousands of titles spanning every conceivable genre.</p>
        </div>
        <div className="feature-card center-feature">
          <div className="icon-wrapper">⚡</div>
          <h3>Lightning Updates</h3>
          <p>Get day-zero patches and instant access to new releases globally.</p>
        </div>
        <div className="feature-card">
          <div className="icon-wrapper">💎</div>
          <h3>Premium Perks</h3>
          <p>Unlock subscriber-only discounts and exclusive gaming tiers.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;