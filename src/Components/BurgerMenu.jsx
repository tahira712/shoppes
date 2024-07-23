import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../Pages/Login';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    toggleOverlay();
  };

  const toggleOverlay = () => {
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
    toggleOverlay();
  };

  // const openLogin = () => {
  //   setIsLoginOpen(true);
  //   setIsOpen(false); // Close the menu when opening login
  //   toggleOverlay();
  // };

  // const closeLogin = () => {
  //   setIsLoginOpen(false);
  //   toggleOverlay(); // Close overlay
  // };

  function openLogin() {
    setIsOpen(false);
    let overlay= document.querySelector('.overlay');
    overlay.style.display = 'block';
    let login= document.querySelector('.login');
    login.style.display = 'block';
  }
  function closeLogin() {
    let overlay= document.querySelector('.overlay');
    overlay.style.display = 'none';
    let login= document.querySelector('.login');
    login.style.display = 'none';
  }


  const dropdownClass = isOpen ? 'dropdown-burger active-dropdown' : 'dropdown-burger';
  const loginClass = isLoginOpen ? 'login active-login' : 'login';

  return (
    <div className='burger-menu'>
      <img
        className='burger'
        src="/images/burger-menu.svg"
        alt="Burger Menu"
        onClick={toggleMenu}
      />
      <div className={dropdownClass}>
        <NavLink onClick={handleNavLinkClick} to="/">
          Home
        </NavLink>
        <NavLink onClick={handleNavLinkClick} to="/shop">
          Shop
        </NavLink>
        <NavLink onClick={handleNavLinkClick} to="/wishlist">
          Wishlist
        </NavLink>
        <NavLink onClick={handleNavLinkClick} to="/order-tracking">
          Order Tracking
        </NavLink>
        <NavLink onClick={handleNavLinkClick} to="/blogs">
          Blogs
        </NavLink>
        <NavLink to="/" onClick={openLogin}  > 
          Login
        </NavLink>
      </div>
      {isOpen && (
        <div className="overlay" onClick={toggleMenu}></div>
      )}
      {isOpen && (
        <div className="overlay" onClick={closeLogin}></div>
      )}
      {isLoginOpen && (
        <Login />
      )}
    </div>
  );
}

export default BurgerMenu;
