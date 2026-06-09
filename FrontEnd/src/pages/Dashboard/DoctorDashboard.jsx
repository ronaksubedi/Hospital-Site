import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ToggleLeft, ToggleRight } from "lucide-react";

const DoctorDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggleMsg, setToggleMsg] = useState("");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (user.role !== "doctor") { navigate("/"); return; }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [aptsRes, doctorsRes] = await Promise.all([
        api.get("/api/appointments/doctor", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get("/api/doctors", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setAppointments(aptsRes.data.appointments);
      // find doctor profile linked to current user
      const myProfile = doctorsRes.data.doctors.find(d => d.user === user._id || d.email === user.email);
      setDoctorProfile(myProfile);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    if (!doctorProfile) return;
    try {
      const res = await api.patch(
        `/api/doctors/${doctorProfile._id}/availability`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDoctorProfile({ ...doctorProfile, available: res.data.available });
      setToggleMsg(res.data.message);
      setTimeout(() => setToggleMsg(""), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const statusColor = (status) => {
    const colors = {
      pending: { bg: "#FEF3C7", color: "#92400E" },
      confirmed: { bg: "#D1FAE5", color: "#065F46" },
      cancelled: { bg: "#FEE2E2", color: "#991B1B" },
      completed: { bg: "#DBEAFE", color: "#1E40AF" },
    };
    return colors[status] || { bg: "#F3F4F6", color: "#374151" };
  };

  if (loading) return <p style={{ textAlign: "center", padding: "80px", color: "#6B7280" }}>Loading...</p>;

  const pending = appointments.filter(a => a.status === "pending").length;
  const confirmed = appointments.filter(a => a.status === "confirmed").length;
  const completed = appointments.filter(a => a.status === "completed").length;

  return (
    <div style={{ background: "#F8FAFF", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#111827", marginBottom: "4px" }}>
              Doctor Dashboard
            </h1>
            <p style={{ color: "#6B7280", fontSize: "14px" }}>Welcome back, {user?.name}</p>
          </div>

          {/* Availability Toggle */}
          {doctorProfile && (
            <div style={{ background: "white", borderRadius: "12px", padding: "16px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Availability</span>
              <button onClick={handleToggle} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                {doctorProfile.available
                  ? <ToggleRight size={36} color="#10B981" />
                  : <ToggleLeft size={36} color="#9CA3AF" />
                }
              </button>
              <span style={{ fontSize: "13px", fontWeight: "600", color: doctorProfile.available ? "#10B981" : "#9CA3AF" }}>
                {doctorProfile.available ? "Available" : "Unavailable"}
              </span>
            </div>
          )}
        </div>

        {toggleMsg && (
          <div style={{ background: "#D1FAE5", color: "#065F46", padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", fontSize: "14px" }}>
            {toggleMsg}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
          {[
            { label: "Total Appointments", value: appointments.length, bg: "#EFF6FF", color: "#1B2F6E" },
            { label: "Pending", value: pending, bg: "#FEF3C7", color: "#92400E" },
            { label: "Confirmed", value: confirmed, bg: "#D1FAE5", color: "#065F46" },
            { label: "Completed", value: completed, bg: "#DBEAFE", color: "#1E40AF" },
          ].map((stat, i) => (
            <div key={i} style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "8px" }}>{stat.label}</p>
              <p style={{ fontSize: "32px", fontWeight: "800", color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Appointments List */}
        <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "24px", borderBottom: "1px solid #F3F4F6" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>My Appointments</h2>
          </div>

          {appointments.length === 0 ? (
            <p style={{ textAlign: "center", padding: "60px", color: "#6B7280" }}>No appointments yet.</p>
          ) : (
            <div>
              {appointments.map((apt) => {
                const sc = statusColor(apt.status);
                return (
                  <div key={apt._id} style={{ padding: "20px 24px", borderBottom: "1px solid #F9FAFB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", color: "#1B2F6E", flexShrink: 0 }}>
                        {apt.patient?.name?.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontWeight: "600", color: "#111827", marginBottom: "4px" }}>{apt.patient?.name}</p>
                        <p style={{ color: "#6B7280", fontSize: "13px" }}>{apt.patient?.email}</p>
                        <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6B7280", fontSize: "12px" }}>
                            <Calendar size={12} /> {new Date(apt.date).toLocaleDateString()}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6B7280", fontSize: "12px" }}>
                            <Clock size={12} /> {apt.timeSlot}
                          </span>
                        </div>
                        {apt.notes && (
                          <p style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "4px", fontStyle: "italic" }}>"{apt.notes}"</p>
                        )}
                      </div>
                    </div>
                    <span style={{ background: sc.bg, color: sc.color, padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", textTransform: "capitalize" }}>
                      {apt.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;