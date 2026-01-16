import { useEffect, useState } from "react";
import AdminPostManager from "../components/admin/AdminPostManager";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const res = await fetch("http://127.0.0.1:5000/api/admin/posts", {
      credentials: "include",
    });
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Respond to reported campus issues below:</p>
      {posts.map((p) => (
        <AdminPostManager key={p.id} post={p} refresh={fetchPosts} />
      ))}
    </div>
  );
}
