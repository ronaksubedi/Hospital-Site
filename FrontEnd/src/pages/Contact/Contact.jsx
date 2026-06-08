import { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setSuccess("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "60px 24px", textAlign: "center" }}>
        <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
          Get In Touch
        </p>
        <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#111827", marginBottom: "16px" }}>
          Contact Us
        </h1>
        <p style={{ color: "#6B7280", maxWidth: "500px", margin: "0 auto" }}>
          Have questions? We're here to help you.
        </p>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }}>

          {/* Left — Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              { icon: <Phone size={20} color="#3B82F6" />, title: "Emergency", value: "9876543210" },
              { icon: <Mail size={20} color="#3B82F6" />, title: "Email", value: "info@meddical.com" },
              { icon: <MapPin size={20} color="#3B82F6" />, title: "Location", value: "0123 Some Place, City" },
              { icon: <Clock size={20} color="#3B82F6" />, title: "Work Hours", value: "09:00 - 20:00 Everyday" },
            ].map((item, i) => (
              <div key={i} style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ background: "#EFF6FF", padding: "12px", borderRadius: "10px", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "13px", color: "#9CA3AF", marginBottom: "4px", fontWeight: "500" }}>{item.title}</p>
                  <p style={{ fontSize: "15px", color: "#111827", fontWeight: "600" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Contact Form */}
          <div style={{ background: "white", borderRadius: "16px", padding: "40px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "24px" }}>Send a Message</h2>

            {success && (
              <div style={{ background: "#D1FAE5", color: "#065F46", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
                {success}
              </div>
            )}
            {error && (
              <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" }}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" }}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" }}>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="9800000000" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" }}>Subject *</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="Appointment Query" required style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" }}>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." required rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <button type="submit" disabled={loading}
                style={{ background: "#1B2F6E", color: "white", padding: "14px", borderRadius: "8px", fontWeight: "600", fontSize: "15px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;