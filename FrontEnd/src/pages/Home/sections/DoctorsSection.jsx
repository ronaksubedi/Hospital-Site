import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../services/api";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/api/doctors")
      .then(res => setDoctors(res.data.doctors.slice(0, 4)))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
            Trusted Care
          </p>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#111827" }}>
            Our Doctors
          </h2>
        </div>

        {/* Doctors Grid */}
        {doctors.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>No doctors available yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {doctors.map((doctor) => (
              <Link to={`/doctors/${doctor._id}`} key={doctor._id} style={{ textDecoration: "none" }}>
                <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ background: "#EFF6FF", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {doctor.photo ? (
                      <img src={doctor.photo} alt={doctor.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "#1B2F6E", fontWeight: "700" }}>
                        {doctor.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>{doctor.name}</h3>
                    <p style={{ color: "#3B82F6", fontSize: "14px", fontWeight: "500" }}>{doctor.specialty}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to="/doctors" style={{ background: "#1B2F6E", color: "white", padding: "12px 32px", borderRadius: "999px", fontWeight: "600", textDecoration: "none", display: "inline-block" }}>
            View All Doctors →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSection;