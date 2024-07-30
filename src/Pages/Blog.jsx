import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import "../Style/blogs.css";
import ReactPaginate from "react-paginate";
import Search from '../Components/Search'; // Import the new component
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useParams } from "react-router-dom";
import { useResolvedPath } from "react-router-dom";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs));
  }, []);

  const itemsPerPage = 6;

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearchQuery = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? blog.categories.includes(selectedCategory) : true;
    return matchesSearchQuery && matchesCategory;
  });

  const pageCount = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };
  let pathName = useResolvedPath();
  let pathURL = pathName.pathname;
  console.log(pathURL);
  return (
    <div className="cont blogs-cont">
      <Header />
      <div className="blogs-container">
       
        <div className="blogs-all">
          {currentBlogs.map((blog, index) => (
            <Link to={`/blogs/${blog.id}`}>
            <div key={index} className="blog" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
              <div className="blog-img">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-description">
                <div className="blog-category">{blog.categories}</div>
                <div className="blog-title">{blog.title}</div>
                <p className="blog-desc">{blog.description}</p>
                <div className="blog-author">
                  <div className="author-img">
                    <img src={blog.authorImage} alt={blog.authorName} />
                  </div>
                  <div className="author-name-date">
                    <div className="author-name">{blog.authorName}</div>
                    <div className="date">{blog.date}</div>
                  </div>
                </div>
              </div>
            </div></Link>
          ))}
        </div>
{

}
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Blog;
