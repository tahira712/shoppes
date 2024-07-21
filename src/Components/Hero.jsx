import React, { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { Header } from "./Header";
import { NavLink } from "react-router-dom";
const Hero = () => {
  const [quantityDropdownOpen, setQuantityDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const [selectedImage, setSelectedImage] = useState("../images/hero.png");
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const toggleQuantityDropdown = () => {
    setQuantityDropdownOpen(!quantityDropdownOpen);
  };

  const toggleSizeDropdown = () => {
    setSizeDropdownOpen(!sizeDropdownOpen);
  };

  const handleQuantitySelect = (value) => {
    setQuantity(value);
    setQuantityDropdownOpen(false);
  };

  const calculateTotalPrice = () => {
    return 173 * quantity;
  };

  return (
    <div>
      <div className="overlay"></div>
      <div className="hero">
        <span className="overlay-text">Nike ZoomX Streakfly</span>
        <div className="cont">
          <div className="left">
            <Header />
            <div className="text-img">
              <div className="text">
                <span className="title">Road Racing Shoes</span>
                <h1>
                  Nike ZoomX <br />
                  Streakfly
                </h1>
              </div>
              <div className="img">
                <img src={selectedImage} alt="Selected Image" />
              </div>
            </div>
        
          <div className="bottom-section">
              <div className="flex-column">
                <p className="description">
                  Our lightest racing shoe, the Nike ZoomX Streakfly is all
                  about the speed you need to take on the competition in a mile,
                  5K or 10K race.
                </p>
                <div className="cart-div">
                  <div className="selects">
                    <div
                      className="select select-quantity"
                      onClick={toggleQuantityDropdown}
                    >
                      <span>QNT</span>
                      <img src="../images/down.svg" alt="" />
                    </div>
                    {quantityDropdownOpen && (
                      <div className="qty-dropdown">
                        <span onClick={() => handleQuantitySelect(1)}>1</span>
                        <span onClick={() => handleQuantitySelect(2)}>2</span>
                        <span onClick={() => handleQuantitySelect(3)}>3</span>
                        <span onClick={() => handleQuantitySelect(4)}>4</span>
                      </div>
                    )}

                    <div
                      className="select select-size"
                      onClick={toggleSizeDropdown}
                    >
                      <span>SIZE</span>
                      <img src="../images/down.svg" alt="" />
                    </div>
                    {sizeDropdownOpen && (
                      <div className="size-dropdown">
                        <span>S</span>
                        <span>M</span>
                        <span>L</span>
                        <span>XL</span>
                      </div>
                    )}

                    <span className="price">${calculateTotalPrice()}</span>
                  </div>

                  <div className="buttons">
                    <button>Add To Bag</button>
                    <NavLink path to="/details/:4">                    <span className="see-details">See Details</span>
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="images">
                <div
                  className="image"
                  onClick={() => handleImageClick("../images/hero.png")}
                >
                  <img src="../images/hero.png" alt="" />
                </div>
                <div
                  className="image"
                  onClick={() => handleImageClick("../images/im-1-rem.png")}
                >
                  <img src="../images/im-1-rem.png" alt="" />
                </div>
                <div
                  className="image"
                  onClick={() => handleImageClick("../images/im-2-rem.png")}
                >
                  <img src="../images/im-2-rem.png" alt="" />
                </div>
                <div
                  className="image"
                  onClick={() => handleImageClick("../images/im-3-rem.png")}
                >
                  <img src="../images/im-3-rem.png" alt="" />
                </div>
              </div>
            </div>
         
          </div>
        </div>
        <div className="right">
          <img
            className="nike-overlay"
            src="../images/nike.png"
            alt="Nike Logo"
          />

          {/* <BurgerMenu /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
