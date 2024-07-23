import React from 'react'
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { Link } from 'react-router-dom';
export const DescriptionsAndReviews = () => {
  // useParams();
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
  return (
    <div>
      <div className="description-review">
        {/* {products.filter((a) => a.id == id).map((a) => (
          <div>
            {a.description}
            </div>
        ))} */}

        <div className="desc-rev">
          <Link to={`/products/${id}/description`}><span className="desc-text">Description</span></Link>
          <span className="desc-text">Description</span>
          <span className="rev-text">review</span>
        </div>
      </div>
    </div>
  )
}
