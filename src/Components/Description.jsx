import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
export const Description = () => {
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
  // console.log(id);
  return (
    <div>
      
      {products.filter((a) => a.id == id).map((a) => (
          <div key={a.id} className="description"  data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
            {a.description}
           
            </div>
        ))}
    </div>
  );
};
