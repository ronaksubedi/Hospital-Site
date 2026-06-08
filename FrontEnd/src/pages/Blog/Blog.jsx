import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, Calendar, User } from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs?search=${search}`)
      .then(res => setBlogs(res.data.blogs))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "60px 24px", textAlign: "center" }}>
        <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
          Latest Updates
        </p>
        <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#111827", marginBottom: "16px" }}>
          News & Blog
        </h1>
        <p style={{ color: "#6B7280", maxWidth: "500px", margin: "0 auto" }}>
          Stay updated with the latest health tips and medical news.
        </p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
          <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "12px 16px 12px 44px", borderRadius: "999px", border: "1px solid #E5E7EB", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>Loading articles...</p>
        ) : blogs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>No articles found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {blogs.map((blog) => (
              <Link to={`/blog/${blog.slug}`} key={blog._id} style={{ textDecoration: "none" }}>
                <div
                  style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s", height: "100%" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {/* Cover Image */}
                  {blog.coverImage ? (
                    <img src={blog.coverImage} alt={blog.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ background: "#EFF6FF", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#93C5FD", fontSize: "48px" }}>📰</span>
                    </div>
                  )}

                  <div style={{ padding: "24px" }}>
                    {blog.category && (
                      <span style={{ background: "#EFF6FF", color: "#3B82F6", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>
                        {blog.category}
                      </span>
                    )}
                    <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#111827", margin: "12px 0 8px", lineHeight: "1.4" }}>
                      {blog.title}
                    </h3>
                    <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
                      {blog.excerpt}
                    </p>

                    <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#9CA3AF" }}>
                      {blog.author && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <User size={12} /> {blog.author.name}
                        </span>
                      )}
                      {blog.publishedAt && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <Calendar size={12} /> {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;