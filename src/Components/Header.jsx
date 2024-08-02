import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useParams,
} from "react-router-dom";
import { useContext } from "react";
import BurgerMenu from "./BurgerMenu";
function openLogin() {
  let overlay = document.querySelector(".overlay");
  overlay.style.display = "block";
  let login = document.querySelector(".login");
  login.style.display = "block";
}
// function closeLogin() {
//   let overlay= document.querySelector('.overlay');
//   overlay.style.display = 'none';
//   let login= document.querySelector('.login');
//   login.style.display = 'none';
// }
export const Header = () => {
  let pathName = useParams();
  let imagePath;
  let shopIcon;
  let shopBg = document.querySelector(".shop-circle");

  if (pathName !== "/") {
    imagePath = "/images/search.svg";
    shopIcon = "/images/shop.svg";
  } else {
    imagePath = "/images/search-black.svg";
    shopIcon = "/images/shop-black.svg";
    shopBg.style.backgroundColor = " #F6F6F6";
  }

  return (
    <>
      <header>
        <ul>
          <NavLink path to="/">
            <img src="/images/logo.png" alt="" />
          </NavLink>

          <li>
            <NavLink path to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink path to="/shop">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink path to="/">
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink path to="/tracking">
              Order Tracking
            </NavLink>
          </li>
          <li>
            <NavLink path to="/blogs">
              Blogs
            </NavLink>
          </li>
        </ul>
        <ul className="links">
          <li className="border">
            <NavLink
              className={({ isActive }) => (isActive ? "activeWhite" : "white")}
              // to="/search"
            >
              <img src="/images/search.svg" alt="" className="search" />
              <img src="/images/search-black.svg" alt="" className="black" />
              <span > Search</span>
            </NavLink>
          </li>
          <li className="shop">
            <NavLink
              className={({ isActive }) => (isActive ? "activeWhite" : "white")}
              to="/"
              onClick={() => {
                openLogin();
              }}
            >
              <span>Login</span>
            </NavLink>
            <div className="shop-circle">
              <img src={"/images/shop.svg"} alt="" />
            </div>
            <div className="shop-circle-black">
              <img src={"/images/shop-black.svg"} alt="" />
            </div>
          </li>
          <BurgerMenu />
        </ul>
      </header>
    </>
  );
};
