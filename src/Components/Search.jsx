import React, { useState, useEffect, useCallback } from 'react';
import RecentPost from './RecentPost';

const Search = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentQuery, setCurrentQuery] = useState(searchQuery);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/blogs.json');
        const data = await response.json();
        if (Array.isArray(data)) {
          setAllPosts(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, []);

  // Update local query state when searchQuery prop changes
  useEffect(() => {
    setCurrentQuery(searchQuery);
  }, [searchQuery]);

  // Function to filter posts based on query and category
  const filterPosts = useCallback(() => {
    if (!Array.isArray(allPosts)) {
      console.error('allPosts is not an array:', allPosts);
      return;
    }

    const filtered = allPosts.filter(post => {
      const matchesQuery = post.title.toLowerCase().includes(currentQuery.toLowerCase());
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      return matchesQuery && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [allPosts, currentQuery, selectedCategory]);

  // Apply filters when query, category, or posts change
  useEffect(() => {
    filterPosts();
  }, [filterPosts]);

  const handleSearchChange = (event) => {
    setCurrentQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(currentQuery); // Update the parent component's searchQuery state
    filterPosts(); // Apply filter
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterPosts(); // Apply filter
  };

  return (
    <div className="search" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
      <label htmlFor="search">Search</label>
      <div className="search-div">
        <input
          type="text"
          name="search"
          id="search"
          value={currentQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="category" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="700">
        <label htmlFor="category">Category</label>
        <div className="categories">
          {['Sport', 'Lifestyle', 'Design', 'Promo', 'Modern', 'Brand'].map(category => (
            <span
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={selectedCategory === category ? 'selected' : ''}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="search-results" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="800">
        {(
          filteredPosts.map(post => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p><strong>Category:</strong> {post.category}</p>
            </div>
          ))
        ) }
      </div>
      <RecentPost />
    </div>
  );
};

export default Search;
