import React from "react";

const Orders = () => {
  return (
    <div>
      <div className="orders">
        <div className="cont">
          <div className="customer-review">
            <div >
              <span className="price">500+</span>
              <span className="price-text">Amazing products</span>
            <span className="border-left"></span>
            </div>
            <div >
              <span className="price">40k+</span>
              <span className="price-text">Orders Complated</span>
            <span className="border-left"></span>
            </div>

            <div >
              <span className="price">32k+</span>
              <span className="price-text">Happy Customers</span>
            <span className="border-left-none"></span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
