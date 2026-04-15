import { useState } from "react";
import Navbar from "../Components/Navbar";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [method, setMethod] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <Navbar />
        <div className="checkout-container-modern">
          <h1>{"// LOADOUT EMPTY"}</h1>
          <p>Please acquire gear before proceeding to extraction.</p>
          <button className="checkout-btn-modern" onClick={() => navigate("/store")}>
            GO TO STORE
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    setError("");
    setMessage("");

    if (method === "") {
      setError("Please select a payment method");
      return;
    }

    if (method === "upi" && upi === "") {
      setError("Enter UPI ID");
      return;
    }

    if (method === "netbanking" && (bank === "" || account === "" || ifsc === "")) {
      setError("Fill bank details");
      return;
    }

    if (method === "card" && (cardNumber === "" || cardName === "" || expiry === "" || cvc === "")) {
      setError("Fill card details");
      return;
    }

    alert("🎮 Transaction Verified!\n\nAccess granted. Your game library has been updated.");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <Navbar />

      <div className="checkout-container-modern">
        <h1>{"// SELECT PAYMENT"}</h1>

        <div className="payment-option-grid">
          <label className="payment-label-modern">
            <input
              type="radio"
              name="payment"
              value="upi"
              onChange={(e) => setMethod(e.target.value)}
            />
            UPI TRANSFER
          </label>

          <label className="payment-label-modern">
            <input
              type="radio"
              name="payment"
              value="netbanking"
              onChange={(e) => setMethod(e.target.value)}
            />
            NET BANKING
          </label>

          <label className="payment-label-modern">
            <input
              type="radio"
              name="payment"
              value="card"
              onChange={(e) => setMethod(e.target.value)}
            />
            CREDIT / DEBIT CARD
          </label>
        </div>

        {/* UPI FORM */}
        {method === "upi" && (
          <div className="payment-form-modern">
            <input
              type="text"
              placeholder="Enter UPI ID (example@upi)"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
          </div>
        )}

        {/* NET BANKING FORM */}
        {method === "netbanking" && (
          <div className="payment-form-modern">
            <input
              type="text"
              placeholder="Bank Name"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />

            <input
              type="text"
              placeholder="Account Number"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />

            <input
              type="text"
              placeholder="IFSC Code"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
            />
          </div>
        )}

        {/* CARD FORM */}
        {method === "card" && (
          <div className="payment-form-modern">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />

            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>
        )}

        {error && <p className="error-message-modern">{error}</p>}
        {message && <p className="payment-message-modern">{message}</p>}

        <button className="checkout-btn-modern" onClick={handlePayment}>
          EXECUTE TRANSACTION
        </button>
      </div>
    </div>
  );
}

export default Checkout;