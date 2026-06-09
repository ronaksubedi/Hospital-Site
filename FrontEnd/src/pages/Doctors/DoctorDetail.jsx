import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Star, Clock, Award, Phone, Mail, ArrowLeft } from "lucide-react";
import api from "../../services/api";

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [ratingMsg, setRatingMsg] = useState("");

  useEffect(() => {
    api.get(`/api/doctors/${id}`)
      .then(res => setDoctor(res.data.doctor))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleRate = async (value) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRatingMsg("Please login to rate this doctor.");
      return;
    }
    try {
      const res = await api.post(
        `/api/doctors/${id}/rate`,
        { rating: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRatingMsg(res.data.message);
      setDoctor(res.data.updated);
    } catch (err) {
      setRatingMsg("Failed to submit rating.");
    }
  };

  if (loading) return <p style={{ textAlign: "center", padding: "80px", color: "#6B7280" }}>Loading...</p>;
  if (!doctor) return <p style={{ textAlign: "center", padding: "80px", color: "#6B7280" }}>Doctor not found.</p>;

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "40px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Link to="/doctors" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#3B82F6", textDecoration: "none", marginBottom: "24px", fontSize: "14px", fontWeight: "500" }}>
            <ArrowLeft size={16} /> Back to Doctors
          </Link>
        </div>
      </div>

      {/* Doctor Profile */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }}>

          {/* Left — Photo & Quick Info */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
              {/* Photo */}
              <div style={{ background: "#EFF6FF", height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {doctor.photo ? (
                  <img src={doctor.photo} alt={doctor.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "#BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", color: "#1B2F6E", fontWeight: "700" }}>
                    {doctor.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div style={{ padding: "24px" }}>
                <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#111827", marginBottom: "4px" }}>{doctor.name}</h1>
                <p style={{ color: "#3B82F6", fontWeight: "600", marginBottom: "16px" }}>{doctor.specialty}</p>

                <span style={{ display: "inline-block", padding: "4px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600", background: doctor.available ? "#D1FAE5" : "#FEE2E2", color: doctor.available ? "#065F46" : "#991B1B", marginBottom: "16px" }}>
                  {doctor.available ? "Available" : "Unavailable"}
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6B7280", fontSize: "14px" }}>
                    <Award size={16} color="#3B82F6" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6B7280", fontSize: "14px" }}>
                    <Star size={16} color="#F59E0B" />
                    <span>{doctor.rating} ({doctor.ratingCount} reviews)</span>
                  </div>
                  {doctor.email && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6B7280", fontSize: "14px" }}>
                      <Mail size={16} color="#3B82F6" />
                      <span>{doctor.email}</span>
                    </div>
                  )}
                  {doctor.phone && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6B7280", fontSize: "14px" }}>
                      <Phone size={16} color="#3B82F6" />
                      <span>{doctor.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Book Appointment Button */}
            <Link to={`/appointments?doctor=${doctor._id}`} style={{ display: "block", background: "#1B2F6E", color: "white", padding: "14px", borderRadius: "12px", textAlign: "center", textDecoration: "none", fontWeight: "600", fontSize: "15px" }}>
              Book Appointment
            </Link>
          </div>

          {/* Right — Bio & Rating */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Bio */}
            <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "16px" }}>About</h2>
              <p style={{ color: "#6B7280", lineHeight: "1.8", fontSize: "15px" }}>
                {doctor.bio || "No bio available for this doctor."}
              </p>
            </div>

            {/* Department */}
            {doctor.department && (
              <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "16px" }}>Department</h2>
                <p style={{ color: "#3B82F6", fontWeight: "600" }}>{doctor.department?.name}</p>
              </div>
            )}

            {/* Rate Doctor */}
            <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "16px" }}>Rate this Doctor</h2>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    style={{ cursor: "pointer", transition: "transform 0.1s" }}
                    fill={(hovered || rating) >= star ? "#F59E0B" : "none"}
                    color={(hovered || rating) >= star ? "#F59E0B" : "#D1D5DB"}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => { setRating(star); handleRate(star); }}
                  />
                ))}
              </div>
              {ratingMsg && (
                <p style={{ color: "#3B82F6", fontSize: "14px", fontWeight: "500" }}>{ratingMsg}</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;