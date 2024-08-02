import React from "react";
import { Header } from "../Components/Header";
import "../Style/detail-blog.css";
import "../Style/blogs.css";
import Search from "../Components/Search";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WriteReview from "../Components/WriteReview";

import WriteComment from "../Components/WriteComment";
import RecentPost from "../Components/RecentPost";
const DetailBlog = () => {
  let { id } = useParams();
  async function fetchData() {
    let data = await fetch("/blogs.json");
    let res = await data.json();
    let b = await res.blogs.find((a) => a.id == id);
    console.log(b);
    setB(b);
  }
  const [isWriteReviewVisible, setIsWriteReviewVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleReplyClick = (rating) => {
    setSelectedRating(rating);
    setIsWriteReviewVisible(true);
  };

  let [b, setB] = useState({});
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div className="cont detail-blog">
      <Header />
      <div className="blog-cont">
        <div className="blog-details">
          <div className="blog-img">
            <img src={b.image} alt="" />
            <span className="italic">{b.categories} </span>
            <span>|</span>
            <span className="date">{b.date}</span>
          </div>
          <h1 className="blog-title">{b.title}</h1>
          <div className="blog-author">
            <div className="author-img">
              <img src={b.authorImage} alt={b.authorName} />
            </div>
            <div className="author-name-date">
              <div className="author-name">{b.authorName}</div>
            </div>
          </div>
          <div className="blog-content">
            <p>{b.content}</p>
          </div>
          <div className="blog-highlight">{b.content?.slice(0, 225)}</div>
          <div className="blog-content">{b.description}</div>
          <div className="flex-images">
            {b.images?.map((a) => (
              <img src={a} alt="" />
            ))}
          </div>
          {b.comments &&
            b.comments.map((a) => (
              <div className="review-container">
                <div className="blog-author-reply">
                  <div className="flex">
                    {" "}
                    <div className="author-img">
                      <img src={a.userImage} alt={a.userName} />
                    </div>
                    <div className="author-name-date">
                      <div className="author-name">{a.userName}</div>
                    </div>
                  </div>
                  <div>Reply</div>
                </div>
                <div className="review-content">{a.review}</div>
              </div>
            ))}

          <WriteComment />
        </div>
    <RecentPost/>
      </div>
    </div>
  );
};

export default DetailBlog;
