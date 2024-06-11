'use client';
import React, { useState,useEffect } from 'react';

interface Post {
  post_id : number;
  author_id : number;
  post_title : string;
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

      <div id="header" className="font-bold text-3xl">
        <h1 className="text-center">Posts</h1>
        <div id="underline" className="h-0.5 bg-[#a6adbb] w-2/4 mx-auto mt-5"></div>
      </div>

      <div className="flex justify-center">
        <div id="posts_container" className="grid grid-cols-3 mt-10" style={{columnGap : '10vw', rowGap : '5vw'}}>
          {posts.map((post) => (
            <div key={post.post_id} className="card w-96 text-black bg-white bg-base-100 hover:shadow-2xl">
              <div className="card-body">
                <h2 className="card-title">{post.post_title}</h2>
                <p>{post.post_content}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Disagree</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
