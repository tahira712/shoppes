import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import "../Style/details.css";
import RelatedProducts from "../Components/RelatedProducts";
import { NavLink } from "react-router-dom";
import { DescriptionsAndReviews } from "../Components/DescriptionsAndReviews";
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
    // istəsəz buranı async edərsiz xəta verməsin deyə
    const getData = () => {
      fetch("/products.json")
        .then((a) => a.json())
        .then((a) => setProducts(a.products));
    };
    getData();
  }, [id]);

  const product = products.find((a) => a.id == id);

  const [selectedImageDet, setSelectedImage] = useState(product?.images[0]);
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  return (
    <div className="cont details">
      <Header />
      <div className="details-images-desc">
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
        <div className="details-desc">
          <div>
            <h1 className="title">{product?.title} </h1>
            <span className="sub-text">Men's Shoes</span>
            <div className="space-between">
              <span className="price">$ {product?.price}</span>
            </div>
          </div>
          <div className="desc sub-text">
            <p>{product?.description}</p>
          </div>
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

              <div className="select select-size" onClick={toggleSizeDropdown}>
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
      {/* bütün məhsul datalarını bir json da yığsaz sizə daha asan olacaq */}
      {/* {/*  bayaqdan nə vaxt fikir verəcəksiz deyə baxıram jdshgfjshd
hahahaha
      {/* <h1>Product Details</h1>
            <h2>{product.name}</h2>
            <p>{product.description}</p> */}
      <DescriptionsAndReviews />
      <RelatedProducts />
    </div>
  );
};

export default Details;
