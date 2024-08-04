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
import { createConnection } from './chat.js';

const App = () => {
  const [serverUrl, setServerUrl] = useState('http://localhost:5173/');
  const [roomId, setRoomId] = useState('defaultRoom'); // Set default or fetch from context

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    AOS.init(); // Initialize AOS here
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  return (
    <>
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
    </>
  );
};

export default App;
