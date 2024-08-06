import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import "../Style/shop.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import PriceRange from "../Components/PriceRange";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/products.json");
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    };
    
    fetchProducts();
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

    console.log("Filtered Products:", updatedProducts); // Debugging line
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

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handleClearFilters = () => {
    setCategory("All");
    setColor("All");
    setPriceRange([0, 2000]);
    setFilteredProducts(products);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 990) {
        setIsFilterOpen(false);
      } else {
        setIsFilterOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  return (
    <div className="cont shop-cont">
      <Header />
      <div className="sort-by">
        <span
          onClick={toggleFilter}
          className={`filter-toggle-btn ${isFilterOpen ? 'active' : 'close-filter'}`}
        >
          Sort by <img src="./images/down.svg" alt="" />
        </span>
      </div>
      <div className="shop-container">
        <div className={`shop-filter ${isFilterOpen ? '' : 'close-filter'}`}>
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
          <div className="filters">
            {category !== "All" && (
              <span className="filter-category">
                {category} ({products.filter(p => p.category.includes(category)).length})
                <img onClick={() => setCategory("All")} className="close-button" src="./images/Close.png" alt="Clear Filters" />
              </span>
            )}
            {priceRange[0] !== 0 || priceRange[1] !== 2000 && (
              <span className="filter-price">
                $ {priceRange[0]} - $ {priceRange[1]}
                <img onClick={() => setPriceRange([0, 2000])} className="close-button" src="./images/Close.png" alt="Clear Filters" />
              </span>
            )}
            {color !== "All" && (
              <span className="filter-color">
                Color ({color})
                <img onClick={() => setColor("All")} className="close-button" src="./images/Close.png" alt="Clear Filters" />
              </span>
            )}
            {color !== "All" || priceRange[0] !== 0 || priceRange[1] !== 2000 || category !== "All" ? (
              <span onClick={handleClearFilters}>Clear All</span>
            ) : null}
          </div>

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
                      <span className="price-span"><span>$ </span>{product.price}</span>
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
