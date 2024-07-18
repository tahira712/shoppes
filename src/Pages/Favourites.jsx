import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles

const Favourites = () => {
  const [swiperDirection, setSwiperDirection] = useState("horizontal");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("./src/Pages/favorites.json");
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSlideChange = () => {
    console.log("slide change");
  };

  const handleSwiper = (swiper) => {
    console.log(swiper);
  };

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

  return (
    <div className="cont">
      <h2 className="title">Favourites on This Week</h2>

      <div className="all-favs">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          direction={swiperDirection}
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiper}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="favs">
                <div className="product-description">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="prod-desc">
                  <div className="prod-name-price">
                    <h3>{product.name}</h3>
                    <span>{product.price}</span>
                  </div>
                  <span className="prod-category">{product.category}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Favourites;
