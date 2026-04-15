import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import API_BASE_URL from "../apiConfig";
import "./LoginRegister.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    // Trim inputs
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // Validation
    if (cleanEmail === "" || cleanPassword === "") {
      setError("Please fill all fields");
      return;
    }

    try {
      console.log(`[CLIENT] Attempting login for: ${cleanEmail}`);
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`[CLIENT] Login success for: ${cleanEmail}`);
        // Store user info and token
        localStorage.setItem("userInfo", JSON.stringify(data));
        
        // ADMIN LOGIN
        if (data.role === "admin") {
          alert("Admin Login Successful!");
          navigate("/admin");
        } else {
          // CLIENT LOGIN
          alert("Login Successful!");
          navigate("/client");
        }
      } else {
        // WRONG LOGIN
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="form-container">
        <h2>Login</h2>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="admin@gamestore.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="button" className="login-submit-btn" onClick={handleLogin}>
          LOGIN
        </button>

        <p className="auth-switch">
          Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;