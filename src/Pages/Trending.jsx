import "swiper/css";import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";


const Trending = () => {
  const [products, setProducts] = useState([]);
  const [swiperDirection, setSwiperDirection] = useState("horizontal");

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
    const response = await fetch("./src/Pages/trending.json");
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
},[])
  return (
    <div className="cont">
      <div className="trending">
        <h1 className="title">What’s Trending Now</h1>
        <div className="trending-swiper">
          <Swiper
            spaceBetween={50}
            slidesPerView={2}
            direction={swiperDirection}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="trend">
                  <div className="product-description">
                    <img src={product.image} alt="" />
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
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Trending;
