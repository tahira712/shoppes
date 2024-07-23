import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import RatingReview from "../Components/RatingReview";
import WriteReview from "./WriteReview";
const Review = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getData = () => {
      fetch("/products.json")
        .then((a) => a.json())
        .then((a) => setProducts(a.products));
    };
    getData();
  }, [id]);
  const [rating, setRating] = useState(0);
  return (
    <div className="review-container">
        <WriteReview/>
      {products
        .filter((a) => a.id == id)
        .map(
          (a) => (
            console.log(a.reviews),
            a.reviews.map((b) => (
              <div className="review">
                <div className="reviewer-image-name-star">
                  <div className="reviewer-image-name">
                    <div className="reviewer-image">
                      <img src={b.userImage} alt="" />
                    </div>
                    <div className="reviewer-name">{b.userName}</div>
                  </div>
                  <div className="star">
                    {" "}
                    <RatingReview rating={a?.rating} setRating={setRating} />
                  </div>
                </div>
                <div>{b.review}</div>
                <div className="review-images">
                   
                  <div className="review-image">
                  <img src={b.image} alt="" />
                  </div>                </div>
              </div>
            ))
          )
        )}
    </div>
  );
};

export default Review;
