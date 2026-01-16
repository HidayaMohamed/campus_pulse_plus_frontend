import { useState, useEffect } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("http://127.0.0.1:5000/api/categories");
      const data = await res.json();
      setCategories(data);
      if (data[0]) setCategoryId(data[0].id);
    }
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://127.0.0.1:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content, category_id: categoryId }),
    });
    setContent("");
    alert("Post created!");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your post..."
          className="border p-2"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
}
