import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './gal.css'; // Import a CSS file for styling (create this file in your project)

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      // Make a request to Reddit API with the "after" parameter for pagination
      const response = await fetch(`https://www.reddit.com/r/memes.json?limit=1000&after=${after || ''}`);

      // Parse the response to JSON
      const data = await response.json();

      // Extract thumbnail and URL information from each post
      const extractedPosts = data.data.children.map((child) => {
        const post = {
          title: child.data.title,
          thumbnail: child.data.thumbnail,
          url: child.data.url,
        };
        return post;
      });

      // Update the state with the extracted posts and set the "after" parameter for pagination
      setPosts((prevPosts) => [...prevPosts, ...extractedPosts]);
      setAfter(data.data.after);

      // Check if there is more data available
      setHasMore(extractedPosts.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the first render

  return (
    <div className='container'>
      <div className='heading'>
        <h1>MEMES <span>GALLERY</span></h1>
      </div>

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="thumbnail-grid">
          {posts.map((post, index) => (
            <div key={index} className="grid-item">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <img src={post.thumbnail} alt="THUMBNAIL" />
                <div className='title'>
                  <h4>{post.title}</h4>
                </div>
              </a>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
