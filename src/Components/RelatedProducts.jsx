import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [swiperDirection, setSwiperDirection] = useState("horizontal");
  const [filterCategory, setFilterCategory] = useState(null); // State for dynamic filtering

  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 768px)");

    const checkBreakpoint = () => {
      if (breakpoint.matches) {
        setSwiperDirection("vertical");
      } else {
        setSwiperDirection("horizontal");
      }
    };

    checkBreakpoint();

    const resizeListener = () => {
      checkBreakpoint();
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("/products.json");
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
  };

  return (
    <div className="cont" >
      <div className="related-products" data-aos="fade-up" data-aos-offset="1000" data-aos-easing="ease-in-sine" data-aos-duration="600">
        <h1 className="title">Related Products</h1>
        <div className="related-swiper">
          <Swiper
            spaceBetween={10} // Adjust as needed
            slidesPerView={swiperDirection === 'vertical' ? 'auto' : 4} 
            direction={swiperDirection}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {products.length > 0 ? (
              products
                .filter((product) => !filterCategory || product.category === filterCategory) // Dynamic filtering based on filterCategory
                .map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="trend">
                      <div className="product-description">
                        <Link to={`/details/${product.id}`}>
                          <img src={product.images[0]} alt="" />
                        </Link>
                      </div>
                      <div className="prod-desc">
                        <div className="prod-name-price">
                          <h3>{product.name}</h3>
                          <span>${product.price}</span>
                        </div>
                        <span className="prod-category">{product.category}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
            ) : (
              <p>Loading...</p>
            )}
          </Swiper>
        </div>
      
      </div>
    </div>
  );
};

export default RelatedProducts;
