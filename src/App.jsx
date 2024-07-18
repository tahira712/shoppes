import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";

import Orders from "./Pages/Orders";
import WhyChooseUs from "./Pages/WhyChooseUs";
import Hero from "./Pages/Hero";
import Favourites from "./Pages/Favourites";
import Brands from "./Pages/Brands";
import Trending from "./Pages/Trending";
import ShareWithUs from "./Pages/ShareWithUs";
import Blogs from "./Pages/Blogs";
import Subscribe from "./Pages/Subscribe";
import Footer from "./Footer";
function App() {
  return (
    <Router>
      <Hero />
      <Orders />
      <WhyChooseUs />
      <Favourites/>
      <Brands/>
      <Trending/>
      <ShareWithUs/>
      <Blogs/>
      <Subscribe/>
      <Footer/>
    </Router>
  );
}

export default App;
