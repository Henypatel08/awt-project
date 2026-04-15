import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar-modern">
      {/* LOGO */}
      <div className="nav-logo-modern" onClick={() => navigate("/")}>
        GAME<span>STORE</span>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links-modern">
        <Link to="/">HOME</Link>
        <Link to="/store">STORE</Link>
        <Link to="/cart">CART</Link>
        <Link to="/Contact">CONTACT</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTER</Link>
      </div>

      {/* SEARCH BAR */}
      <div className="nav-search-modern">
        <input 
          type="text" 
          placeholder="SEARCH ASSETS..." 
          onChange={(e) => {
            if (e.target.value) {
              navigate(`/store?search=${e.target.value}`);
            }
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;