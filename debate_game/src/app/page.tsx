'use client';
import React, { useState,useEffect } from 'react';

interface Post {
  post_id : number;
  author_id : number;
  post_content : string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/posts', {
      method: 'GET',
    });
    const data = await response.json();
    setPosts(data.results);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <div id="posts_container" className="text-white">
        {posts.map((post) => (
          <div key={post.post_id} className="card">
            <h1>{post.post_content}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}
