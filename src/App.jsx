import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/Pages/HomePage";
import Footer from "./Components/Footer";
import Details from "./Pages/Details";
import Blog from "./Pages/Blog";
import DetailBlog from "./Pages/DetailBlog";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS
import Shop from "./Pages/Shop";
import OrderTracking from "./Pages/OrderTracking";
import WishList from "./Pages/WishList";
import { Provider } from 'react-redux';
import  store  from './redux/store';
const App = () => {
 

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/products/:id/description" element={<Details />} />
          <Route path="/products/:id/review" element={<Details />} />
          <Route path="/blogs/:id" element={<DetailBlog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/wishlist/:id" element={<WishList />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};
AOS.init({
  duration: 1000, // Duration of animations
  once: true, // Whether animations should only happen once
  // Other options you may want to use
});
export default App;
