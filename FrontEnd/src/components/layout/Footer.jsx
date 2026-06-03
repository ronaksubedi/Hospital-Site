import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ background: "#0F1D4A", color: "white", padding: "60px 24px 20px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>

          {/* Brand */}
          <div>
            <div style={{ fontSize: "24px", fontWeight: "800", marginBottom: "16px" }}>
              <span style={{ color: "white" }}>MED</span>
              <span style={{ color: "#60A5FA" }}>DICAL</span>
            </div>
            <p style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "1.8", marginBottom: "24px" }}>
              Leading healthcare provider committed to delivering exceptional medical care with compassion and expertise.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <div key={i} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1B2F6E", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Icon size={16} color="#60A5FA" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "20px", color: "white" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Doctors", path: "/doctors" },
                { name: "News", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((item, i) => (
                <Link key={i} to={item.path}
                  style={{ color: "#9CA3AF", fontSize: "14px", textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.color = "#60A5FA"}
                  onMouseLeave={e => e.target.style.color = "#9CA3AF"}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "20px", color: "white" }}>Services</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Cardiology", "Neurology", "Orthopedics", "Ophthalmology", "Pediatrics", "General Medicine"].map((item, i) => (
                <Link key={i} to="/services"
                  style={{ color: "#9CA3AF", fontSize: "14px", textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.color = "#60A5FA"}
                  onMouseLeave={e => e.target.style.color = "#9CA3AF"}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "20px", color: "white" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <MapPin size={16} color="#60A5FA" style={{ marginTop: "2px", flexShrink: 0 }} />
                <p style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "1.6" }}>0123 Some Place, City, Country</p>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Phone size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
                <p style={{ color: "#9CA3AF", fontSize: "14px" }}>(237) 681-812-255</p>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Mail size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
                <p style={{ color: "#9CA3AF", fontSize: "14px" }}>info@meddical.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid #1B2F6E", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#6B7280", fontSize: "13px" }}>© 2026 Meddical. All rights reserved.</p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link to="/privacy" style={{ color: "#6B7280", fontSize: "13px", textDecoration: "none" }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: "#6B7280", fontSize: "13px", textDecoration: "none" }}>Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;