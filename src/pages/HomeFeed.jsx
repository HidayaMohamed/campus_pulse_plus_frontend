import PostList from "../components/posts/PostList";

export default function HomeFeed() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Home Feed</h1>
      <PostList />
    </div>
  );
}
