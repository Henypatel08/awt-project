import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((item,index)=>index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart",JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      if(item.price === "Free" || item.price === 0) return;
      const price = item.price.toString();
      total += parseInt(price.replace("₹","")) || 0;
    });
    return total;
  };

  return (
    <div className="cart-page">
      <Navbar/>
      <div className="cart-container-modern">
        <h1 className="cart-title">{"// LOADOUT"}</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart-modern">
            <h2>NO ITEMS FOUND.</h2>
            <p>Access the armory to equip your library.</p>
            <button className="primary-btn" onClick={()=>navigate("/store")}>BROWSE STORE</button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-list">
              {cartItems.map((item,index)=>(
                <div className="cart-item-modern" key={index}>
                  <img src={item.image} alt={item.name}/>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">{item.price === 0 || item.price === "Free" ? "FREE" : `₹${item.price}`}</p>
                  </div>
                  <button className="remove-btn-modern" onClick={()=>removeItem(index)}>
                    X
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>TOTAL VALUE: <span className="highlight-price">₹{getTotal()}</span></h2>
              <button className="primary-btn checkout-btn" onClick={()=>navigate("/checkout")}>PROCESS CHECKOUT</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;