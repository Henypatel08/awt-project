import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* LEFT */}
        <div className="footer-brand">
          <h2>🎮 GameStore</h2>
          <p>Your ultimate destination for gaming.</p>
        </div>

        {/* CENTER */}
        <div className="footer-links">
          <h3>Explore</h3>
          <a href="/store">Store</a>
          <a href="/deals">Deals</a>
          <a href="/toprated">Top Rated</a>
        </div>

        {/* RIGHT */}
        <div className="footer-social">
          <h3>Connect</h3>
          <div className="icons">
            <span>🌐</span>
            <span>🐦</span>
            <span>📸</span>
            <span>🎮</span>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © 2026 GameStore • Built for AWT Project
      </div>
    </footer>
  );
}

export default Footer;