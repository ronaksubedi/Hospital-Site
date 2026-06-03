import { Link } from "react-router-dom";
import { Heart, Brain, Bone, Eye, Baby, Stethoscope } from "lucide-react";

const services = [
  { icon: <Heart size={32} />, title: "Cardiology", desc: "Heart care and cardiovascular treatments." },
  { icon: <Brain size={32} />, title: "Neurology", desc: "Brain and nervous system disorders." },
  { icon: <Bone size={32} />, title: "Orthopedics", desc: "Bone, joint and muscle treatments." },
  { icon: <Eye size={32} />, title: "Ophthalmology", desc: "Eye care and vision treatments." },
  { icon: <Baby size={32} />, title: "Pediatrics", desc: "Healthcare for infants and children." },
  { icon: <Stethoscope size={32} />, title: "General Medicine", desc: "Primary healthcare and diagnosis." },
];

const ServicesSection = () => {
  return (
    <div style={{ padding: "80px 24px", background: "#F8FAFF" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
            Care You Can Trust
          </p>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#111827" }}>
            Our Services
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {services.map((service, i) => (
            <div key={i} style={{ background: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ color: "#3B82F6", marginBottom: "16px" }}>{service.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>{service.title}</h3>
              <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.6" }}>{service.desc}</p>
              <Link to="/services" style={{ color: "#3B82F6", fontSize: "14px", fontWeight: "600", textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;