import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Image as ImageIcon, X, Upload } from "lucide-react";

export default function CommentForm({ postId, refresh }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageModal, setImageModal] = useState(null);
  const fileInputRef = useRef(null);