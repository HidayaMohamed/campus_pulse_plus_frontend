export default function CommentList({ comments }) {
  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Comments</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((c) => (
        <div key={c.id} className="border p-2 rounded mb-2 bg-gray-50">
          <p>{c.content}</p>
          <span className="text-xs text-gray-500">
            {new Date(c.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
