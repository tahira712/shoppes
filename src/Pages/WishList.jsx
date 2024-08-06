import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice'; // Assuming you have an `addItem` action
import { Header } from "../Components/Header";
import "../Style/wishlist.css";

const WishList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const cartItems = useSelector(state => state.cart.items);

  // Fetch wishlist from localStorage
  useEffect(() => {
    const fetchWishlist = () => {
      try {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
        setProducts(storedWishlist);
      } catch (error) {
        console.error("Error fetching wishlist from localStorage", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 })); // Dispatch action to add item to cart
    alert(`${product.name} added to cart!`);
  };

  // Remove product from wishlist
  const handleRemoveItem = (index) => {
    const updatedItems = products.filter((_, i) => i !== index);
    setProducts(updatedItems);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedItems));
  };

  // Add all products to cart
  const addAllToCart = () => {
    products.forEach(product => dispatch(addItem({ ...product, quantity: 1 })));
    alert('All items added to cart!');
  };

  // Add selected products to cart
  const addSelectedToCart = () => {
    selectedItems.forEach(index => {
      const product = products[index];
      dispatch(addItem({ ...product, quantity: 1 }));
    });
    alert('Selected items added to cart!');
  };

  // Handle item selection
  const handleCheckboxChange = (index) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle empty wishlist
  if (products.length === 0) {
    return (
      <div className="wishlist cont">
        <Header />
        <div className="no-products">
          <img src="./images/no-product.png" alt="No products" />
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist cont">
      <Header />
      <h1 className="title">WishList</h1>
      <div className="grid-header">
        <div>Select All ({products.length})</div>
        <div>Product Name</div>
        <div>Unit Price</div>
        <div>Stock Status</div>
        <div></div>
        <div></div>
      </div>
      {products.map((product, index) => (
        <div key={product.id} className="grid-row">
          <div className="wishlist-check">
            <label className="container-check">
              <input
                type="checkbox"
                checked={selectedItems.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
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
            <button
              className="add-to-cart"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
          <div className="wishlist-delete">
            <img
              src="/images/delete.svg"
              alt="Delete"
              onClick={() => handleRemoveItem(index)}
              className="delete-icon"
            />
          </div>
          <button onClick={() => handleRemoveItem(index)} className="wishlist-delete-button">Delete</button>
        </div>
      ))}
      <div className="buttons-wishlist">
        <button className="check-out" onClick={addSelectedToCart}>Add Selected to Cart</button>
        <button className="add-to-cart" onClick={addAllToCart}>Add All to Bag</button>
      </div>
    </div>
  );
};

export default WishList;
