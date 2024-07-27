import React from "react";
import Review from "./Review";
import { Description } from "./Description";
import { useParams, useResolvedPath } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Details from "../Pages/Details";
const DescriptionAndReviews = () => {
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
  let pathName = useResolvedPath();
  let pathURL = pathName.pathname.split("/")[3];
  //   console.log(path);
  let review=products.filter((a) => a.id == id);
  let reviewLength = review.map((a) => a.reviews.length);
  console.log(reviewLength);
  return (
    <div data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="1000">
      <div className="desc-rev">
        <Link to={`/products/${id}/description`}>
          <span className="desc-text">Description</span>
        </Link>
        <Link to={`/products/${id}/review`}>
          <span className="rev-text">Review ({reviewLength})</span>
        </Link>{" "}
      </div>

      {pathURL === "description" ? <Description /> : <Review />}

      {/* <Description/>
      <Review/> */}
    </div>
  );
};

export default DescriptionAndReviews;
