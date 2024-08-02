import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="cont">
        <footer className="footer">
          <div className="grid-col">
            <img src="../images/logo.png" alt="" />
            <div className="info">
              <span className="title-text">Address:</span>
              <span className="sub-text">
                {" "}
                2118 Thornridge Cir. Syracuse, Connecticut 35624
              </span>
            </div>
            <div className="info">
              <span className="title-text">Email:</span>
              <span className="sub-text"> Shoppes@example.com</span>
            </div>
            <div className="info">
              <span className="title-text">Phone Number</span>
              <span className="sub-text"> +321 4356 2212</span>
            </div>
          </div>
          <div className="grid-col">
            <span className="title-text">Menu</span>
            <NavLink path to="/"><span className="title-text">Home</span></NavLink>
            <NavLink path to="/"><span className="sub-text">Shop</span></NavLink>
            <NavLink path to="/"><span className="sub-text">Wishlist</span></NavLink>
            <NavLink path to="/"><span className="sub-text">Order Tracking</span></NavLink>
            <NavLink path to="/"><span className="sub-text">Blogs</span></NavLink>
          
          </div>
          <div className="grid-col">
            <span className="title-text">Quick Links</span>

            <NavLink path to="/"><span className="title-text">Login</span></NavLink>
            <NavLink path to="/"><span className="sub-text">Register</span></NavLink>
            <NavLink path to="/"><span className="sub-text">My Cart</span></NavLink>
           
         
          </div>
          <div className="grid-col">
            <span className="title-text">Let’s Stay in Touch</span>

            <div className="input-button">
              <input type="email" placeholder="Enter Your Email Address"/>
              <button>Subscribe</button>
            </div>
            <span className="title-text">Follow our Social</span>
            <div className="social-media">
                <div className="social"><img src="/images/Social/facebook.svg" alt="" /></div>
                <div className="social"><img src="/images/Social/instagram.svg" alt="" /></div>
                <div className="social"><img src="/images/Social/whatsapp.svg" alt="" /></div>
               
            </div>
          </div>
        </footer>
          <div className="sub credits">Copyright Shoppes 2022 All Right Reserved</div>
      </div>
    </div>
  );
};

export default Footer;
