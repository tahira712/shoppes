import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import "../Style/wishlist.css";
import { useParams } from "react-router-dom";

const WishList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setProducts(storedWishlist);
      setLoading(false);
    };
    fetchWishlist();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products in wishlist.</div>;
  }

  return (
    <div className="wishlist cont">
      <Header />
      <h1 className="title">WishList</h1>
      <div className="grid-header">
        <div>Select All (2)</div>
        <div>Product Name</div>
        <div>Unit Price</div>
        <div>Stock Status</div>
        <div></div>
        <div></div>
      </div>
      {products.map((product) => (
        <div key={product.id} className="grid-row">
          <div className="wishlist-check">
            <label className="container-check">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <div className="wishlist-image">
              <img
                src={product.images[0] || '/images/default-product.jpg'}
                alt={product.name || "Product Image"}
              />
            </div>
          </div>
          <div className="fd">
            <span>{product.name || "No Name"}</span>
            <span className="category">{product.category || "No Category"}</span>
            <span className="media">${product.price || "0.00"}</span>
            <span className={product.inStock ? "media Instock" : "media OutOfStock"}>
              {product.inStock ? "In stock" : "Out of Stock"}
            </span>
          </div>
          <div className="wishlist-price">${product.price || "0.00"}</div>
          <div className="wishlist-stock">
            <span className={product.inStock ? "Instock desk" : "OutOfStock desk"}>
              {product.inStock ? "In stock" : "Out of Stock"}
            </span>
          </div>
          <div className="wishlist-cart">
            <button className="add-to-cart">Add To Cart</button>
          </div>
          <div className="wishlist-delete">
            <img src="/images/delete.svg" alt="Delete" />
          </div>
          <button className="wishlist-delete-button">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default WishList;
