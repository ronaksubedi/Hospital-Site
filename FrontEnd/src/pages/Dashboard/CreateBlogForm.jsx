import { useState } from "react";
import axios from "axios";
import api from "../../services/api";

const CreateBlogForm = ({ token, onSuccess }) => {
  const [form, setForm] = useState({
    title: "", content: "", excerpt: "", category: "", tags: "", isPublished: "false"
  });
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (coverImage) formData.append("coverImage", coverImage);

      await api.post("/api/blogs", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "14px", outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "700px" }}>
      {error && <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "12px", borderRadius: "8px", fontSize: "14px" }}>{error}</div>}

      <div>
        <label style={labelStyle}>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required placeholder="Blog title" style={inputStyle} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Category</label>
          <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Health Tips" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Tags (comma separated)</label>
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="health, tips, wellness" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Excerpt (short summary)</label>
        <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Brief summary shown on listing page" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Content *</label>
        <textarea name="content" value={form.content} onChange={handleChange} required placeholder="Write your full article here..." rows={10}
          style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label style={labelStyle}>Cover Image</label>
        <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])}
          style={{ fontSize: "14px", color: "#374151" }} />
      </div>

      <div>
        <label style={labelStyle}>Publish immediately?</label>
        <select name="isPublished" value={form.isPublished} onChange={handleChange} style={{ ...inputStyle, width: "200px" }}>
          <option value="false">Save as Draft</option>
          <option value="true">Publish Now</option>
        </select>
      </div>

      <button type="submit" disabled={loading}
        style={{ background: "#1B2F6E", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", fontWeight: "600", fontSize: "14px", opacity: loading ? 0.7 : 1, width: "fit-content" }}
      >
        {loading ? "Publishing..." : "Create Blog"}
      </button>
    </form>
  );
};

export default CreateBlogForm;