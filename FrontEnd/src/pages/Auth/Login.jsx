import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "14px", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFF", padding: "40px 24px" }}>
      <div style={{ background: "white", borderRadius: "16px", padding: "48px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", width: "100%", maxWidth: "440px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "24px", fontWeight: "800", marginBottom: "8px" }}>
            <span style={{ color: "#111827" }}>MED</span>
            <span style={{ color: "#3B82F6" }}>DICAL</span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>Welcome Back</h1>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>Sign in to your account</p>
        </div>

        {error && (
          <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" }}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" }}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required style={inputStyle} />
          </div>

          <button type="submit" disabled={loading}
            style={{ background: "#1B2F6E", color: "white", padding: "14px", borderRadius: "8px", fontWeight: "600", fontSize: "15px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "8px" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#6B7280" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#3B82F6", fontWeight: "600", textDecoration: "none" }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;