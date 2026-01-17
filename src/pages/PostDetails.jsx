import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../components/posts/CommentList";
import CommentForm from "./CommentForm";
import ReactionButtons from "./ReactionButtons";
import { AuthContext } from "../../context/AuthContext";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  async function fetchPost() {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/posts/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setPost(data);
  }

  useEffect(() => {
    fetchPost();
  }, [id]);
