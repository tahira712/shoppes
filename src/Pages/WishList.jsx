import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import "../Style/wishlist.css";
import { useParams } from "react-router-dom";

const WishList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/products.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Filter products based on ID or some other criteria
      const filteredProducts = data.products.filter((product) => product.id === parseInt(id, 10));
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>Product not found or there was an error.</div>;
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
                src={product.images[0]}
                alt={product.name || "Product Image"}
              />
            </div>
          </div>
          <div className="fd">
            <span>{product.name}</span>
            <span className="category">{product.category}</span>
            <span className="media">${product.price}</span>
            <span className={   product.inStock ? " media Instock" : "media OutOfStock"}>
              {product.inStock ? "In stock" : "Out of Stock"}
            </span>
          </div>
          <div className="wishlist-price">${product.price}</div>
          <div className="wishlist-stock">
            <span className={product.inStock ? "Instock desk " : "OutOfStock desk"}>
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
