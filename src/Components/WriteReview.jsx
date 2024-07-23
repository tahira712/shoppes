import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingReview from "./RatingReview";
const WriteReview = () => {
  let [sum, setSum] = useState(0, 0);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  let [rating, setRating] = useState(0);
  useEffect(() => {
    const getData = () => {
      fetch("/products.json")
        .then((a) => a.json())
        .then((a) => setProducts(a.products));
    };
    getData();
  }, [id]);
  function toggleReview() {
    let reviewForm = document.querySelector(".write-review-form");
    
    if (reviewForm.style.display === "flex") {
      reviewForm.style.display = "none";
    } else {
      reviewForm.style.display = "flex";
    }
  }
  
  return (
    <div>
      <div className="write-review">
        <div className="rating">
          {products
            .filter((a) => a.id == id)
            .map((a) => (
              <div className="flex">
                <div className="sum">{(sum += a.rating)}</div>
                <div className="star-review">
                  <RatingReview rating={sum} setRating={setRating} />
                  <span className="text-rev">({a.rating} Reviews)</span>
                </div>
              </div>
            ))}
        </div>
        <button className="btn-write" onClick={toggleReview}>Write Review</button>
      </div>
      <div className="write-review-form" >
        <label htmlFor="review">Your Rating</label>
        <RatingReview  rating={rating} setRating={setRating}/>
        <form action="">
          <label htmlFor="review">Your Review</label>
          <textarea
            name="review"
            id="review"
           
            rows="5"
            
          ></textarea>
          <div className="flex">
           <div>
           <label htmlFor="name">Name</label>
           <input type="text" name="name" id="name" />
           </div>
            <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            </div>
          </div>
            <button className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
