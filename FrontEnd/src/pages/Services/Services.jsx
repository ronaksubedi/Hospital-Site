import { useEffect, useState } from "react";
import API from "../../utils/api";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/api/services?search=${search}`)
      .then(res => setServices(res.data.services))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div>
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "60px 24px", textAlign: "center" }}>
        <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>What We Offer</p>
        <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#111827", marginBottom: "16px" }}>Our Services</h1>
        <p style={{ color: "#6B7280", maxWidth: "500px", margin: "0 auto" }}>Comprehensive medical services delivered with care and expertise.</p>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
          <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
          <input type="text" placeholder="Search services..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "12px 16px 12px 44px", borderRadius: "999px", border: "1px solid #E5E7EB", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>Loading services...</p>
        ) : services.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>No services found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {services.map((service) => (
              <div key={service._id}
                style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {service.image && <img src={service.image} alt={service.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
                <div style={{ padding: "24px" }}>
                  {service.category && (
                    <span style={{ background: "#EFF6FF", color: "#3B82F6", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>
                      {service.category}
                    </span>
                  )}
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", margin: "12px 0 8px" }}>{service.name}</h3>
                  <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>{service.description}</p>
                  {service.doctors?.length > 0 && (
                    <p style={{ color: "#6B7280", fontSize: "13px", marginBottom: "16px" }}>{service.doctors.length} doctor{service.doctors.length > 1 ? "s" : ""} available</p>
                  )}
                  <Link to="/appointments" style={{ color: "#3B82F6", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>Book Appointment →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;