import { useState } from "react";

export default function AdminResponseForm({ postId, onResponseAdded }) {
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content) return;

    await fetch("http://127.0.0.1:5000/api/admin/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ post_id: postId, content }),
    });

    setContent("");
    onResponseAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write admin response..."
        className="flex-1 border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-3 rounded">
        Respond
      </button>
    </form>
  );
}
