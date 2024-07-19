import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";

import Orders from "./Components/Orders";
import WhyChooseUs from "./Components/WhyChooseUs";
import Hero from "./Components/Hero";
import Favourites from "./Components/Favourites";
import Brands from "./Components/Brands";
import Trending from "./Components/Trending";
import ShareWithUs from "./Components/ShareWithUs";
import Blogs from "./Components/Blogs";
import Subscribe from "./Components/Subscribe";
import Footer from "./Components/Footer";
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
