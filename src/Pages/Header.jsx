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

export const Header = () => {
  return (
    <div>
         <header>
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
            </header>
    </div>
  )
}
