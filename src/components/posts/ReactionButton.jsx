export default function ReactionButtons({ post, refresh }) {
  async function react(type) {
    await fetch("http://127.0.0.1:5000/api/reactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ post_id: post.id, reaction_type: type }),
    });
    refresh();
  }

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => react("like")}
        className="bg-green-500 text-white px-2 py-1 rounded"
      >
        Like ({post.likes})
      </button>
      <button
        onClick={() => react("dislike")}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Dislike ({post.dislikes})
      </button>
    </div>
  );
}
