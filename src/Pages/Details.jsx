import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import "../Style/details.css";
import RelatedProducts from "../Components/RelatedProducts";
import DescriptionAndReviews from "../Components/DescriptionAndReviews";
import RatingReview from "../Components/RatingReview";
import { useDispatch } from 'react-redux';
import { addItem as addToCartItem } from '../redux/cartSlice'; 
import { addItem as addToWishlistItem } from '../redux/wishlistSlice';

const Details = () => {
  const { id } = useParams();
  const [quantityDropdownOpen, setQuantityDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const toggleQuantityDropdown = () => setQuantityDropdownOpen(prev => !prev);

  const toggleSizeDropdown = () => setSizeDropdownOpen(prev => !prev);

  const handleQuantitySelect = (value) => {
    setQuantity(value);
    setQuantityDropdownOpen(false);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const addToCart = () => {
    if (product) {
      dispatch(addToCartItem({ ...product, quantity }));
      alert(`${product.name} added to cart with quantity ${quantity}!`);
    }
  };

  const addToWishlist = () => {
    if (product) {
      dispatch(addToWishlistItem({ ...product, quantity }));
      alert(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="cont details">
      <Header />
      <div className="details-images-desc">
        <div className="details-images">
          <div className="details-image-main">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product?.name || "Product Image"}
              />
            )}
          </div>
          <div className="details-images-small">
            {product?.images.map((image, index) => (
              <div className="details-image-small" key={index}>
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="details-desc">
          <div className="details-text">
            <h1 className="title">{product?.name}</h1>
            <span className="sub-text">Men's Shoes</span>
            <div className="space-between">
              <span className="price">${product?.price}</span>
              {product?.rating && (
                <span className="rating">
                  <RatingReview
                    rating={product.rating}
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

              <button className="wishlist" onClick={addToWishlist}>
                <img src="/images/heart.svg" alt="Wishlist" />
                <span>Add to Wishlist</span>
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
