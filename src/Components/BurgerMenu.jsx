import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    let overlay= document.querySelector('.overlay');
    overlay.style.display = isOpen ? 'none' : 'block';
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  const dropdownClass = isOpen ? 'dropdown active-dropdown' : 'dropdown';

  return (
    <div className='burger-menu'>
      <img
        className='burger'
        src="./images/burger-menu.svg"
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
      </div>
      {isOpen && (
        <div className="overlay" onClick={toggleMenu}></div>
      )}
    </div>
  );
}

export default BurgerMenu;
