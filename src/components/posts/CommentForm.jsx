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
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setUploadedFile(file);
      setImageUrl(URL.createObjectURL(file));
      toast.success("Image selected!");
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    console.log("Cloudinary config:", { cloudName, uploadPreset });

    if (
      !cloudName ||
      !uploadPreset ||
      cloudName === "your-cloud-name" ||
      uploadPreset === "your-upload-preset"
    ) {
      throw new Error(
        "Image upload not configured. Please set up Cloudinary credentials in .env file.",
      );
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    console.log("Uploading to Cloudinary...");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    console.log("Cloudinary response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudinary upload failed:", errorText);
      throw new Error(`Failed to upload image: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("Cloudinary upload success:", data.secure_url);
    return data.secure_url;
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      let finalImageUrl = null;

      if (uploadedFile) {
        setUploading(true);
        finalImageUrl = await uploadToCloudinary(uploadedFile);
        setUploading(false);
      }

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content,
          post_id: postId,
          image: finalImageUrl,
        }),
      });

      if (response.ok) {
        toast.success("Comment added!");
        setContent("");
        setImageUrl("");
        setUploadedFile(null);
        refresh();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add comment");
      }
    } catch (error) {
      console.error("Comment submission error:", error);
      if (error.message.includes("Image upload not configured")) {
        toast.error(error.message);
      } else if (error.message.includes("Failed to upload image")) {
        toast.error(
          "Failed to upload image to Cloudinary. Please check your configuration.",
        );
      } else {
        toast.error("Network error. Please try again.");
      }
      setUploading(false);
    }
  }