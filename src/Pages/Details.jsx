import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import "../Style/details.css";
import RelatedProducts from "../Components/RelatedProducts";
import { NavLink } from "react-router-dom";
import  DescriptionAndReviews  from "../Components/DescriptionAndReviews";
import RatingReview from "../Components/RatingReview";
const Details = () => {
  const [quantityDropdownOpen, setQuantityDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const { id } = useParams();
  const toggleQuantityDropdown = () => {
    setQuantityDropdownOpen(!quantityDropdownOpen);
  };

  const toggleSizeDropdown = () => {
    setSizeDropdownOpen(!sizeDropdownOpen);
  };

  const [quantity, setQuantity] = useState(1);
  const handleQuantitySelect = (value) => {
    setQuantity(value);
    setQuantityDropdownOpen(false);
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = () => {
      fetch("/products.json")
        .then((a) => a.json())
        .then((a) => setProducts(a.products));
    };
    getData();
  }, [id]);
  const [rating, setRating] = useState(0)
  const product = products.find((a) => a.id == id);

  const [selectedImageDet, setSelectedImage] = useState(product?.images[0]);
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  return (
    <div className="cont details">
      <Header />
      <div className="details-images-desc" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="1400">
        <div className="details-images">
          <div className="details-image-main">
            {product?.images && (
              <img
                src={selectedImageDet ? selectedImageDet : product.images[0]}
                alt=""
              />
            )}
          </div>
          <div className="details-images-small">
            {product?.images &&
              product.images.map((image, index) => (
                <div className="details-image-small">
                  <img
                    src={image}
                    alt=""
                    key={index}
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="details-desc" data-aos="fade-up" >
          <div className="details-text">
            <h1 className="title">{product?.name} </h1>
            <span className="sub-text">Men's Shoes</span>
            <div className="space-between">
              <span className="price">$ {product?.price}</span>
              {product?.rating && (
                <span className="rating">
                  <RatingReview rating={product?.rating} setRating={setRating} />
                </span>
              )}
              {/* <span><RatingReview rating={product?.rating} setRating={setRating} /></span> */}
            </div>
            <div className="desc sub-text">
            <p>{product?.description}</p>
          </div>
          </div>
          
          <div className="cart-div" >
            <div className="selects">
              <div
                className="select select-quantity"
                onClick={toggleQuantityDropdown}
              >
                <span>QNT</span>
                <img src="/images/down.svg" alt="" />
              </div>
              {quantityDropdownOpen && (
                <div className="qty-dropdown">
                  <span onClick={() => handleQuantitySelect(1)}>1</span>
                  <span onClick={() => handleQuantitySelect(2)}>2</span>
                  <span onClick={() => handleQuantitySelect(3)}>3</span>
                  <span onClick={() => handleQuantitySelect(4)}>4</span>
                </div>
              )}

              <div className="select select-size" onClick={toggleSizeDropdown}>
                <span>SIZE</span>
                <img src="/images/down.svg" alt="" />
              </div>
              {sizeDropdownOpen && (
                <div className="size-dropdown">
                  <span>S</span>
                  <span>M</span>
                  <span>L</span>
                  <span>XL</span>
                </div>
              )}
            </div>

            <div className="buttons">
              <button>Add To Bag</button>

              <button className="wishlist">
                <img src="/images/heart.svg" alt="" />{" "}
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <DescriptionAndReviews  />
      <RelatedProducts />
    </div>
  );
};

export default Details;
