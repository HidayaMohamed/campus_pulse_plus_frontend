import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import ReactionButtons from "./ReactionButton";
import { AuthContext } from "../../context/AuthContext";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  async function fetchPost() {
    const res = await fetch(`http://127.0.0.1:5000/api/posts/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setPost(data);
  }

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Post Detail</h2>
      <p>{post.content}</p>
      <ReactionButtons post={post} refresh={fetchPost} />
      <CommentList comments={post.comments} />
      {user && <CommentForm postId={post.id} refresh={fetchPost} />}
      {post.admin_response && (
        <p className="mt-2 text-green-600 font-semibold">
          Admin: {post.admin_response}
        </p>
      )}
    </div>
  );
}
