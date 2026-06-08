import { Link } from "react-router-dom";
import { Award, Users, Heart, Shield } from "lucide-react";

const values = [
  { icon: <Heart size={28} color="#3B82F6" />, title: "Compassionate Care", desc: "We treat every patient with empathy, respect, and dignity." },
  { icon: <Award size={28} color="#3B82F6" />, title: "Excellence", desc: "We strive for the highest standards in medical care and service." },
  { icon: <Users size={28} color="#3B82F6" />, title: "Patient First", desc: "Every decision we make puts the patient's wellbeing first." },
  { icon: <Shield size={28} color="#3B82F6" />, title: "Integrity", desc: "We operate with transparency, honesty, and ethical standards." },
];

const team = [
  { name: "Dr. Sarah Johnson", role: "Chief Medical Officer", img: "" },
  { name: "Dr. Michael Chen", role: "Head of Cardiology", img: "" },
  { name: "Dr. Emily Davis", role: "Head of Neurology", img: "" },
  { name: "Dr. James Wilson", role: "Head of Pediatrics", img: "" },
];

const About = () => {
  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(to right, #EFF6FF, #DBEAFE)", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
          Who We Are
        </p>
        <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#111827", marginBottom: "20px" }}>
          About Meddical
        </h1>
        <p style={{ color: "#6B7280", maxWidth: "600px", margin: "0 auto", fontSize: "16px", lineHeight: "1.8" }}>
          A leading healthcare provider committed to delivering exceptional medical care with compassion, expertise, and innovation.
        </p>
      </div>

      {/* Mission */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
              Our Mission
            </p>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#111827", marginBottom: "20px", lineHeight: "1.3" }}>
              A Great Place to Receive Care
            </h2>
            <p style={{ color: "#6B7280", lineHeight: "1.9", marginBottom: "16px" }}>
              At Meddical, we believe that quality healthcare is a fundamental right. Our team of dedicated professionals works tirelessly to provide personalized, evidence-based medical care to every patient who walks through our doors.
            </p>
            <p style={{ color: "#6B7280", lineHeight: "1.9", marginBottom: "32px" }}>
              Founded over 20 years ago, we have grown from a small clinic to a comprehensive healthcare facility serving thousands of patients each year. Our state-of-the-art facilities and experienced medical staff ensure you receive the best possible care.
            </p>
            <Link to="/contact"
              style={{ background: "#1B2F6E", color: "white", padding: "14px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", display: "inline-block" }}
            >
              Contact Us
            </Link>
          </div>

          <div style={{ background: "#EFF6FF", borderRadius: "20px", padding: "48px", textAlign: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {[
                { number: "20+", label: "Years Experience" },
                { number: "5000+", label: "Patients Served" },
                { number: "100+", label: "Expert Doctors" },
                { number: "15+", label: "Departments" },
              ].map((stat, i) => (
                <div key={i} style={{ background: "white", borderRadius: "12px", padding: "24px" }}>
                  <p style={{ fontSize: "32px", fontWeight: "800", color: "#1B2F6E", marginBottom: "4px" }}>{stat.number}</p>
                  <p style={{ color: "#6B7280", fontSize: "14px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: "#F8FAFF", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
              What Drives Us
            </p>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#111827" }}>Our Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {values.map((val, i) => (
              <div key={i} style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
                <div style={{ background: "#EFF6FF", width: "64px", height: "64px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>{val.title}</h3>
                <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.7" }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#3B82F6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "13px", marginBottom: "12px" }}>
              Meet the Team
            </p>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#111827" }}>Our Leadership</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {team.map((member, i) => (
              <div key={i} style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
                <div style={{ background: "#EFF6FF", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: "700", color: "#1B2F6E" }}>
                    {member.name.charAt(3)}
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>{member.name}</h3>
                  <p style={{ color: "#3B82F6", fontSize: "13px", fontWeight: "500" }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;