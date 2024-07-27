import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ShareWithUs = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("sharewithus.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="cont">
      <div className="share-with-us" data-aos="fade-up" data-aos-offset="1000" data-aos-easing="ease-in-sine" data-aos-duration="1400">
        <h1 className="title">Share With #Shoppes</h1>
        <span className="sub">
          Follow <strong>@shoppes</strong> Instagram for inspirations
        </span>

        <Swiper
          spaceBetween={10}
          slidesPerView={6}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="share">
                <div className="product-description">
                  <img src={product.image} alt="" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ShareWithUs;
