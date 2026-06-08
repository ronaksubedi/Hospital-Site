import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/doctors?search=${search}`);
      setDoctors(res.data.doctors);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [search]);

  return (
    <div>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "60px 24px", textAlign: "center" }}>
        <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
          Trusted Care
        </p>
        <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#111827", marginBottom: "16px" }}>
          Our Doctors
        </h1>
        <p style={{ color: "#6B7280", maxWidth: "500px", margin: "0 auto" }}>
          Meet our team of experienced and dedicated medical professionals.
        </p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
          <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "12px 16px 12px 44px", borderRadius: "999px", border: "1px solid #E5E7EB", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>No doctors found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {doctors.map((doctor) => (
              <Link to={`/doctors/${doctor._id}`} key={doctor._id} style={{ textDecoration: "none" }}>
                <div
                  style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {/* Photo */}
                  <div style={{ background: "#EFF6FF", height: "220px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {doctor.photo ? (
                      <img src={doctor.photo} alt={doctor.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "#BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", color: "#1B2F6E", fontWeight: "700" }}>
                        {doctor.name?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>
                      {doctor.name}
                    </h3>
                    <p style={{ color: "#3B82F6", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
                      {doctor.specialty}
                    </p>
                    <p style={{ color: "#6B7280", fontSize: "13px", marginBottom: "12px" }}>
                      {doctor.experience} years experience
                    </p>

                    {/* Availability */}
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "600",
                      background: doctor.available ? "#D1FAE5" : "#FEE2E2",
                      color: doctor.available ? "#065F46" : "#991B1B"
                    }}>
                      {doctor.available ? "Available" : "Unavailable"}
                    </span>

                    {/* Rating */}
                    {doctor.ratingCount > 0 && (
                      <p style={{ color: "#F59E0B", fontSize: "13px", marginTop: "8px" }}>
                        ★ {doctor.rating} ({doctor.ratingCount} reviews)
                      </p>
                    )}
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

export default Doctors;