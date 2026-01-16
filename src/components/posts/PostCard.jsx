import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="border p-4 rounded shadow mb-4 bg-white">
      <p className="text-gray-800">{post.content}</p>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>Likes: {post.likes}</span>
        <span>Dislikes: {post.dislikes}</span>
        <span>Comments: {post.comments_count}</span>
      </div>
      {post.admin_response && (
        <p className="mt-2 text-green-600 font-semibold">
          Admin: {post.admin_response}
        </p>
      )}
      <Link
        to={`/posts/${post.id}`}
        className="text-blue-600 underline mt-2 block"
      >
        View Details
      </Link>
    </div>
  );
}
