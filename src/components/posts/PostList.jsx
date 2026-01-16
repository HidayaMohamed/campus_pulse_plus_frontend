import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function PostList({ categoryId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      let url = "http://127.0.0.1:5000/api/posts";
      if (categoryId) url += `?category_id=${categoryId}`;
      const res = await fetch(url, { credentials: "include" });
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, [categoryId]);

  return (
    <div>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
