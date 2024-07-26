import React from 'react';
import RecentPost from './RecentPost';

const Search = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  

  return (
    <div className="search">
      <label htmlFor="search">Search</label>
      <div className="search-div">
        <input
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={() => setSearchQuery(searchQuery)}>Search</button>
      </div>
      <div className="category">
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
      <RecentPost/>
    </div>
  );
};

export default Search;
