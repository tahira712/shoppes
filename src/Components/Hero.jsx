import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { addItem as addToCartItem } from '../redux/cartSlice'; 
import { Header } from "./Header";
import { Toaster, toast } from 'react-hot-toast';
const Hero = () => {
  const [quantityDropdownOpen, setQuantityDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState("../images/hero.png");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); 
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const handleImageClick = (imageSrc, index, event) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index); 
    
    const allImages = document.querySelectorAll(".image");
    allImages.forEach(img => img.classList.remove("activeBorder"));

    const clickedImage = event.currentTarget;
    clickedImage.classList.add("activeBorder");
  };

  const addToCart = () => {
    if (product) {
      dispatch(addToCartItem({ ...product, quantity, size: selectedSize }));
      toast.success(`${product.name} added to cart !`);
    }
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

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSizeDropdownOpen(false);
  };

  const calculateTotalPrice = () => {
    return 173 * quantity;
  };

  async function fetchData() {
    try {
      let id = 1;
      const response = await fetch('/products.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const product = data.products.find(product => product.id === id);
      setProduct(product);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div><Toaster/></div>
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
                      <span>{quantity === 1 ? 'QTY' : quantity }</span>
                      <img src="../images/down.svg" alt="Down Arrow" />
                    </div>
                    {quantityDropdownOpen && (
                      <div className="qty-dropdown">
                        {[1, 2, 3, 4].map(val => (
                          <span key={val} onClick={() => handleQuantitySelect(val)}>{val}</span>
                        ))}
                      </div>
                    )}

                    <div
                      className="select select-size"
                      onClick={toggleSizeDropdown}
                    >
                      <span>{selectedSize === '' ? 'Size' : selectedSize}</span>
                      <img src="../images/down.svg" alt="Down Arrow" />
                    </div>
                    {sizeDropdownOpen && (
                      <div className="size-dropdown">
                        {['S', 'M', 'L', 'XL'].map(size => (
                          <span key={size} onClick={() => handleSizeSelect(size)}>{size}</span>
                        ))}
                      </div>
                    )}

                    <span className="price">${calculateTotalPrice()}</span>
                  </div>

                  <div className="buttons">
                    <button onClick={addToCart}>Add To Bag</button>
                    <NavLink to="/details/1">
                      <span className="see-details">See Details</span>
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="images">
                {product?.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`image ${selectedImageIndex === index ? 'activeBorder' : ''}`}
                    onClick={(e) => handleImageClick(image, index, e)}
                  >
                    <img src={image} alt={`Product Image ${index + 1}`} />
                  </div>
                ))}
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
    </div>
  );
};

export default Hero;
