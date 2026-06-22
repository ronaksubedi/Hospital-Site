import { Link } from "react-router-dom";
import { Calendar, Users, Ambulance } from "lucide-react";
import heroImg from "../../../assets/HeroImage.png";

const HeroSection = () => {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", minHeight: "500px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>

          {/* Left: text */}
          <div style={{ maxWidth: "500px", flex: "1 1 400px" }}>
            <div style={{ display: "inline-block", background: "#DBEAFE", color: "#3B82F6", padding: "8px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: "500", marginBottom: "24px" }}>
              Our Services
            </div>
            <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#111827", lineHeight: "1.2", marginBottom: "32px" }}>
              A Great Place <br /> to Receive Care
            </h1>
            <Link to="/appointments" style={{ background: "#3B82F6", color: "white", padding: "12px 32px", borderRadius: "999px", fontWeight: "600", textDecoration: "none", display: "inline-block" }}>
              Learn More →
            </Link>
          </div>

          {/* Right: image */}
          <div style={{ flex: "1 1 320px", position: "relative", display: "flex", justifyContent: "flex-end" }}>
          
            <img
              src={heroImg}
              alt="Doctor"
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: "16px",
                objectFit: "cover",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              }}
            />
          </div>

        </div>
      </div>

      {/* Quick Action Cards */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: "-32px", position: "relative", zIndex: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", borderRadius: "12px", overflow: "hidden" }}>

          <Link to="/appointments" style={{ background: "#1B2F6E", color: "white", padding: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}>
            <span style={{ fontSize: "18px", fontWeight: "600" }}>Book an Appointment</span>
            <Calendar size={40} style={{ opacity: 0.8 }} />
          </Link>

          <Link to="/doctors" style={{ background: "#BFDBFE", color: "#1B2F6E", padding: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}>
            <span style={{ fontSize: "18px", fontWeight: "600" }}>Find a Doctor</span>
            <Users size={40} style={{ opacity: 0.8 }} />
          </Link>

          <Link to="/contact" style={{ background: "#60A5FA", color: "white", padding: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}>
            <span style={{ fontSize: "18px", fontWeight: "600" }}>Emergency Care</span>
            <Ambulance size={40} style={{ opacity: 0.8 }} />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;