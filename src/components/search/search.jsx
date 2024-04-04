"use client"
import React, { useState } from 'react';

const Blog = ({ blogPosts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortCriteria === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortCriteria === 'popularity') {
      return b.likes - a.likes;
    }
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />

      <select value={sortCriteria} onChange={handleSortChange}>
        <option value="date">Sort by Date</option>
        <option value="popularity">Sort by Popularity</option>
      </select>

      {sortedPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <span>{post.date}</span>
          <span>Likes: {post.likes}</span>
        </div>
      ))}
    </div>
  );
};

export default Blog;
