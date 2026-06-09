import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Appointments = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedDoctor = searchParams.get("doctor");

  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    doctor: preselectedDoctor || "",
    service: "",
    date: "",
    timeSlot: "",
    notes: "",
  });

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "02:00 PM",
    "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
    "04:30 PM", "05:00 PM",
  ];

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    api.get("/api/doctors?available=true").then(res => setDoctors(res.data.doctors));
    api.get("/api/services").then(res => setServices(res.data.services));
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/api/appointments", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Appointment booked successfully!");
      setForm({ doctor: "", service: "", date: "", timeSlot: "", notes: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "14px", outline: "none", boxSizing: "border-box", background: "white" };
  const labelStyle = { fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", display: "block" };

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "60px 24px", textAlign: "center" }}>
        <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
          Schedule a Visit
        </p>
        <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#111827", marginBottom: "16px" }}>
          Book an Appointment
        </h1>
        <p style={{ color: "#6B7280", maxWidth: "500px", margin: "0 auto" }}>
          Choose your doctor and preferred time slot.
        </p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ background: "white", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>

          {success && (
            <div style={{ background: "#D1FAE5", color: "#065F46", padding: "16px", borderRadius: "8px", marginBottom: "24px", fontSize: "14px", fontWeight: "500" }}>
              ✅ {success}
            </div>
          )}
          {error && (
            <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "16px", borderRadius: "8px", marginBottom: "24px", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Doctor */}
            <div>
              <label style={labelStyle}>Select Doctor *</label>
              <select name="doctor" value={form.doctor} onChange={handleChange} required style={inputStyle}>
                <option value="">Choose a doctor</option>
                {doctors.map(d => (
                  <option key={d._id} value={d._id}>{d.name} — {d.specialty}</option>
                ))}
              </select>
            </div>

            {/* Service */}
            <div>
              <label style={labelStyle}>Select Service</label>
              <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
                <option value="">Choose a service (optional)</option>
                {services.map(s => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Time Slot *</label>
                <select name="timeSlot" value={form.timeSlot} onChange={handleChange} required style={inputStyle}>
                  <option value="">Choose time</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Describe your symptoms or reason for visit..."
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <button type="submit" disabled={loading}
              style={{ background: "#1B2F6E", color: "white", padding: "16px", borderRadius: "8px", fontWeight: "700", fontSize: "16px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointments;