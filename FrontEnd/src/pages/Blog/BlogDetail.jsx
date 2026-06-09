import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import api from "../../services/api";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/blogs/slug/${slug}`)
      .then(res => setBlog(res.data.blog))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p style={{ textAlign: "center", padding: "80px", color: "#6B7280" }}>Loading...</p>;
  if (!blog) return <p style={{ textAlign: "center", padding: "80px", color: "#6B7280" }}>Article not found.</p>;

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "40px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#3B82F6", textDecoration: "none", marginBottom: "24px", fontSize: "14px", fontWeight: "500" }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {blog.category && (
            <span style={{ background: "#DBEAFE", color: "#1E40AF", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", display: "inline-block", marginBottom: "16px" }}>
              {blog.category}
            </span>
          )}

          <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#111827", lineHeight: "1.3", marginBottom: "20px" }}>
            {blog.title}
          </h1>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {blog.author && (
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6B7280", fontSize: "14px" }}>
                <User size={14} /> {blog.author.name}
              </span>
            )}
            {blog.publishedAt && (
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6B7280", fontSize: "14px" }}>
                <Calendar size={14} /> {new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Cover Image */}
        {blog.coverImage && (
          <img src={blog.coverImage} alt={blog.title}
            style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "16px", marginBottom: "40px" }}
          />
        )}

        {/* Excerpt */}
        {blog.excerpt && (
          <p style={{ fontSize: "18px", color: "#4B5563", lineHeight: "1.8", marginBottom: "32px", fontStyle: "italic", borderLeft: "4px solid #3B82F6", paddingLeft: "20px" }}>
            {blog.excerpt}
          </p>
        )}

        {/* Main Content */}
        <div style={{ fontSize: "16px", color: "#374151", lineHeight: "1.9", whiteSpace: "pre-wrap" }}>
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div style={{ marginTop: "40px", display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <Tag size={16} color="#9CA3AF" />
            {blog.tags.map((tag, i) => (
              <span key={i} style={{ background: "#F3F4F6", color: "#374151", padding: "4px 12px", borderRadius: "999px", fontSize: "13px" }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #E5E7EB" }}>
          <Link to="/blog"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#1B2F6E", color: "white", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}
          >
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;