import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendData = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>Fill out the form below to get in touch with our team.</p>

        <div className="contact-wrapper">
          <form onSubmit={sendData} className="my-form">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

            <label>Message:</label>
            <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} rows="4" required></textarea>

            <button type="submit">Submit Now</button>
          </form>

          <div className="contact-info">
            <h3>Our Info</h3>
            <p><b>Address:</b>wadi falia near daman talkies, Daman </p>
            <p><b>Email:</b>gamestore.com</p>
            <p><b>Phone:</b> +91 635617XXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;