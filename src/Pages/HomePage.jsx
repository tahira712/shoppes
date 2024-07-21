import React from "react";
import '../Style/homepage.css';

import Orders from "../Components/Orders";
import WhyChooseUs from "../Components/WhyChooseUs";
import Hero from "../Components/Hero";
import Favourites from "../Components/Favourites";
import Brands from "../Components/Brands";
import Trending from "../Components/Trending";
import ShareWithUs from "../Components/ShareWithUs";
import Blogs from "../Components/Blogs";
import Subscribe from "../Components/Subscribe";
import Login from "./Login";
const HomePage = () => {
  return (
    <div>
      <Hero />
      <Login/>
      <Orders />
      <WhyChooseUs />
      <Favourites />
      <Brands />
      <Trending />
      <ShareWithUs />
      <Blogs />
      <Subscribe />
    </div>
  );
};

export default HomePage;
