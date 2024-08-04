import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../Components/Header";
import "../Style/details.css";
import RelatedProducts from "../Components/RelatedProducts";
import DescriptionAndReviews from "../Components/DescriptionAndReviews";
import RatingReview from "../Components/RatingReview";

const Details = () => {
  const [quantityDropdownOpen, setQuantityDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [products, setProducts] = useState([]);
  const [selectedImageDet, setSelectedImage] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch product data
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [id]);

  const product = products.find((a) => a.id == id);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

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

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const addToCart = () => {
    if (product) {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = [...storedCartItems, { ...product, quantity }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      alert(`${product.name} added to cart with quantity ${quantity}!`);
    }
  };

  const addToWishlist = () => {
    if (product) {
      const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!existingWishlist.find((item) => item.id === product.id)) {
        existingWishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      }
    }
  };

  return (
    <div className="cont details">
      <Header />
      <div
        className="details-images-desc"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1400"
      >
        <div className="details-images">
          <div className="details-image-main">
            {product?.images && (
              <img
                src={selectedImageDet || product.images[0]}
                alt={product?.name || "Product Image"}
              />
            )}
          </div>
          <div className="details-images-small">
            {product?.images &&
              product.images.map((image, index) => (
                <div className="details-image-small" key={index}>
                  <img
                    src={image}
                    alt=""
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="details-desc" data-aos="fade-up">
          <div className="details-text">
            <h1 className="title">{product?.name}</h1>
            <span className="sub-text">Men's Shoes</span>
            <div className="space-between">
              <span className="price">${product?.price}</span>
              {product?.rating && (
                <span className="rating">
                  <RatingReview
                    rating={product?.rating}
                    setRating={setRating}
                  />
                </span>
              )}
            </div>
            <div className="desc sub-text">
              <p>{product?.description}</p>
            </div>
          </div>

          <div className="cart-div">
            <div className="selects">
              <div
                className="select select-quantity"
                onClick={toggleQuantityDropdown}
              >
                <span>QNT</span>
                <img src="/images/down.svg" alt="Dropdown" />
              </div>
              {quantityDropdownOpen && (
                <div className="qty-dropdown">
                  {[1, 2, 3, 4].map((qty) => (
                    <span key={qty} onClick={() => handleQuantitySelect(qty)}>
                      {qty}
                    </span>
                  ))}
                </div>
              )}

              <div className="select select-size" onClick={toggleSizeDropdown}>
                <span>SIZE</span>
                <img src="/images/down.svg" alt="Dropdown" />
              </div>
              {sizeDropdownOpen && (
                <div className="size-dropdown">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <span key={size}>{size}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="buttons">
              <button onClick={addToCart}>Add To Bag</button>

              <button className="wishlist">
                <img src="/images/heart.svg" alt="Wishlist" />
                <span onClick={addToWishlist}>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <DescriptionAndReviews />
      <RelatedProducts />
    </div>
  );
};

export default Details;
