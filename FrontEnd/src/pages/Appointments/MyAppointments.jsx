import { useEffect, useState } from "react";
import API from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, X } from "lucide-react";

const MyAppointments = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelMsg, setCancelMsg] = useState("");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/api/appointments/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data.appointments);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await API.patch(`/api/appointments/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCancelMsg("Appointment cancelled successfully.");
      fetchAppointments();
    } catch (err) {
      setCancelMsg(err.response?.data?.message || "Failed to cancel.");
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

  return (
    <div>
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "60px 24px", textAlign: "center" }}>
        <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>Your Health</p>
        <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#111827", marginBottom: "16px" }}>My Appointments</h1>
        <p style={{ color: "#6B7280", maxWidth: "500px", margin: "0 auto" }}>View and manage your upcoming appointments.</p>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {cancelMsg && <div style={{ background: "#D1FAE5", color: "#065F46", padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", fontSize: "14px" }}>{cancelMsg}</div>}
        {loading ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p style={{ color: "#6B7280", marginBottom: "20px" }}>No appointments found.</p>
            <button onClick={() => navigate("/appointments")}
              style={{ background: "#1B2F6E", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}
            >
              Book an Appointment
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {appointments.map((apt) => {
              const sc = statusColor(apt.status);
              return (
                <div key={apt._id} style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <div style={{ display: "flex", gap: "20px", alignItems: "center", flex: 1 }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "700", color: "#1B2F6E", flexShrink: 0 }}>
                      {apt.doctor?.name?.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>{apt.doctor?.name}</h3>
                      <p style={{ color: "#3B82F6", fontSize: "14px", marginBottom: "8px" }}>{apt.doctor?.specialty}</p>
                      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6B7280", fontSize: "13px" }}>
                          <Calendar size={13} /> {new Date(apt.date).toLocaleDateString()}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6B7280", fontSize: "13px" }}>
                          <Clock size={13} /> {apt.timeSlot}
                        </span>
                      </div>
                      {apt.notes && <p style={{ color: "#9CA3AF", fontSize: "13px", marginTop: "6px", fontStyle: "italic" }}>"{apt.notes}"</p>}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", flexShrink: 0 }}>
                    <span style={{ background: sc.bg, color: sc.color, padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", textTransform: "capitalize" }}>
                      {apt.status}
                    </span>
                    {apt.status === "pending" && (
                      <button onClick={() => handleCancel(apt._id)}
                        style={{ display: "flex", alignItems: "center", gap: "4px", background: "#FEE2E2", color: "#991B1B", padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                      >
                        <X size={13} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;