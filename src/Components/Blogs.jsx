import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import { Link } from "react-router-dom";

const Blogs = () => {
  const [swiperDirection, setSwiperDirection] = useState("horizontal");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("blogs.json");
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

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
    <div className="blogs" data-aos="fade-up" data-aos-offset="1000" data-aos-easing="ease-in-sine" data-aos-duration="1600">
      <div className="cont">
        <h1 className="title">Latest From Blogs</h1>
        <div className="sub">
          Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </div>

        <Swiper
          spaceBetween={10}
          slidesPerView={swiperDirection === 'vertical' ? 'auto' : 2}
          direction={swiperDirection}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {blogs.map((blog, index) => (
            <SwiperSlide key={index}>
              <Link to={`/blogs/${blog.id}`} className="blog">
                <div className="blog-img">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blog-description">
                  <div className="blog-title">{blog.title}</div>
                  <p className="blog-desc">{blog.description}</p>
                  <div className="blog-author">
                    <div className="author-img">
                      <img src={blog.authorImage} alt={blog.authorName} />
                    </div>
                    <div className="author-name-date">
                      <div className="author-name">{blog.authorName}</div>
                      <div className="date">{blog.date}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Blogs;
