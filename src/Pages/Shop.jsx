import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import "../Style/shop.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import PriceRange from "../Components/PriceRange";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 2000]); // Initialize price range
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");

  const itemsPerPage = 6;

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products); // Initialize filtered products
      });
  }, []);

  useEffect(() => {
    let updatedProducts = products.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (category !== "All") {
      updatedProducts = updatedProducts.filter(product => 
        product.category.includes(category)
      );
    }

    if (color !== "All") {
      updatedProducts = updatedProducts.filter(product => 
        product.color === color
      );
    }

    setFilteredProducts(updatedProducts);
  }, [priceRange, category, color, products]);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const openFilter = () => {
    document.querySelector(".shop-filter").classList.toggle("close-filter");
  }

  return (
    <div className="cont shop-cont">
      <Header />
      <span onClick={openFilter} className="filter-toggle-btn">Sort by :</span> 
      <div className="shop-container">
        <div className="shop-filter">
          <h1 className="filter-title">All Products ({filteredProducts.length})</h1>
          <div className="shop-category">
            <span className="filter-title">Categories</span>
            <span onClick={() => handleCategoryChange("Shoes")}>Shoes ({products.filter(p => p.category.includes("Shoes")).length})</span>
            <span onClick={() => handleCategoryChange("Clothing")}>Clothes ({products.filter(p => p.category.includes("Clothing")).length})</span>
            <span onClick={() => handleCategoryChange("Accessories")}>Accessories ({products.filter(p => p.category.includes("Accessories")).length})</span>
            <span onClick={() => handleCategoryChange("All")}>All ({products.length})</span>
          </div>
          <PriceRange value={priceRange} onChange={setPriceRange} />
          <div className="filter-by-color">
            <span className="filter-title">Color</span>
            <div className="color-circles">
              <div className="color-circle black" onClick={() => handleColorChange("#100D22")}></div>
              <div className="color-circle gray" onClick={() => handleColorChange("#aba7a7")}></div>
              <div className="color-circle pink" onClick={() => handleColorChange("#D96D6D")}></div>
              <div className="color-circle dark-pink" onClick={() => handleColorChange("#BA4164")}></div>
              <div className="color-circle pastel-blue" onClick={() => handleColorChange("#56A1AD")}></div>
              <div className="color-circle purple" onClick={() => handleColorChange("#5848CA")}></div>
              <div className="color-circle white" onClick={() => handleColorChange("#e2dddd")}></div>
              <div className="color-circle olive" onClick={() => handleColorChange("#A8BD84")}></div>
              <div className="color-circle all" onClick={() => handleColorChange("All")}></div>
            </div>
          </div>
        </div>
        <div className="all-products">
          {currentProducts.length === 0 ? (
            <div className="no-product"><img src="./images/no-product.png" alt="No products available" /></div>
          ) : (
            currentProducts.map((product) => (
              <Link to={`/details/${product.id}`} key={product.id}>
                <div className="product-item">
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.title} />
                  </div>
                  <div className="product-details">
                    <div className="space-between">
                      <h3>{product.name}</h3>
                      <span><span>$ </span>{product.price}</span>
                    </div>
                    <span>{product.category}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default Shop;
