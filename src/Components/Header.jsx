import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
  } from "react-router-dom";
  import
{
    useContext
} from 'react'
import BurgerMenu from './BurgerMenu';
function openLogin() {
  let overlay= document.querySelector('.overlay');
  overlay.style.display = 'block';
  let login= document.querySelector('.login');
  login.style.display = 'block';
}
// function closeLogin() {
//   let overlay= document.querySelector('.overlay');
//   overlay.style.display = 'none';
//   let login= document.querySelector('.login');
//   login.style.display = 'none';
// }
export const Header = () => {
  return (
    <div >
         <header >
              <ul>
                
                  <NavLink path to="/">
                    <img src="./images/logo.png" alt="" />
                  </NavLink>
                
                <li>
                  <NavLink path to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink path to="/">
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink path to="/">
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink path to="/">
                    Order Tracking
                  </NavLink>
                </li>
                <li>
                  <NavLink path to="/">
                    Blogs
                  </NavLink>
                </li>
              </ul>
              <ul className="links">
            <li className="border">
              <NavLink
                className={({ isActive }) => (isActive ? "activeWhite" : "white")}
                to="/" 
              >
                <img src="../images/search.svg" alt="Search Icon" />
               <span> Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "activeWhite" : "white")}
                to="/"  onClick={() => {openLogin()}} 
              >
                Log in
              </NavLink>
            </li>
              <BurgerMenu />
          </ul>
            </header>
    </div>
  )
}
