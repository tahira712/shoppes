import React, { useState } from "react";
import { Header } from "../Components/Header";

const OrderTracking = () => {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [orderFound, setOrderFound] = useState(null); // Use null to indicate not yet checked

  const checkingData = async (event) => {
    event.preventDefault(); // Prevents form submission and page reload

    try {
      const response = await fetch('/tracking.json');
      const res = await response.json();

      console.log("Response:", res);

      if (Array.isArray(res)) {
        const order = res.find(a => a.order_id === data1 && a.email === data2);

        if (order) {
          console.log("Order found:", order);
          setOrderFound("Order found!");
          let nodata = document.querySelector(".no-data");
          nodata.style.display = "none";
          let tracking= document.querySelector(".order-tracking");
          tracking.style.display = "flex";
        } else {
          console.log("Order not found.");
          setOrderFound("Order not found.");
          let nodata = document.querySelector(".no-data");
          nodata.style.display = "flex";  
          let tracking= document.querySelector(".order-tracking");
          tracking.style.display = "none";
        }
      } else {
        console.error("Expected an array but got:", typeof res);
        setOrderFound("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setOrderFound("Error fetching data."); 
    }
  };

  return (
    <div className="cont order">
      <Header />
      <div className="no-data"><img src="/images/No Data Found.png" alt="" /></div>
      <div className="order-tracking-cont">
        <div className="order-tracking" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
          <h1 className="title">Order Tracking</h1>
          <p>
            To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
          </p>
          <form onSubmit={checkingData}>
            <label htmlFor="order-id">Order Tracking</label>
            <input
              id="order-id"
              type="text"
              placeholder="Order ID"
              onChange={(e) => setData1(e.target.value)}
            />
            <label htmlFor="email">Billing Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setData2(e.target.value)}
            />
            <button type="submit">Track</button>
          </form>
          {orderFound && <p className="order-found">{orderFound}</p>}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
