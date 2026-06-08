import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Clock, MapPin, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Doctors", path: "/doctors" },
    { name: "News", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header style={{ width: "100%" }}>
      {/* Top Bar */}
      <div style={{ background: "white", borderBottom: "1px solid #F3F4F6", padding: "12px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontSize: "24px", fontWeight: "800", textDecoration: "none" }}>
            <span style={{ color: "#111827" }}>MED</span>
            <span style={{ color: "#3B82F6" }}>DICAL</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {[
              { icon: <Phone size={16} color="#3B82F6" />, label: "Emergency", value: "(237) 681-812-255" },
              { icon: <Clock size={16} color="#3B82F6" />, label: "Work Hour", value: "09:00 - 20:00 Everyday" },
              { icon: <MapPin size={16} color="#3B82F6" />, label: "Location", value: "0123 Some Place" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ background: "#EFF6FF", padding: "8px", borderRadius: "50%" }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase", fontWeight: "500", margin: 0 }}>{item.label}</p>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#3B82F6", margin: 0 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <nav style={{ background: "#1B2F6E", padding: "16px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                style={{ fontSize: "14px", fontWeight: isActive(link.path) ? "700" : "500", color: isActive(link.path) ? "white" : "#93C5FD", textDecoration: "none" }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Search size={20} color="white" style={{ cursor: "pointer" }} />

            {user ? (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    {user.role === "doctor" && (
      <Link to="/doctor-dashboard"
        style={{ color: "white", fontSize: "13px", fontWeight: "500", textDecoration: "none", opacity: 0.9 }}
      >
        My Dashboard
      </Link>
    )}
    {user.role === "patient" && (
      <Link to="/my-appointments"
        style={{ color: "white", fontSize: "13px", fontWeight: "500", textDecoration: "none", opacity: 0.9 }}
      >
        My Appointments
      </Link>
    )}
    {user.role === "admin" && (
      <Link to="/admin"
        style={{ color: "white", fontSize: "13px", fontWeight: "500", textDecoration: "none", opacity: 0.9 }}
      >
        Admin Panel
      </Link>
    )}
    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "white", fontSize: "13px" }}>
      <User size={16} />
      <span>{user.name}</span>
    </div>
    <button onClick={handleLogout}
      style={{ background: "transparent", border: "1px solid white", color: "white", padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
    >
      Logout
    </button>
  </div>
) : (
  <div style={{ display: "flex", gap: "8px" }}>
    <Link to="/login"
      style={{ color: "white", padding: "8px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}
      >
       Login
      </Link>
      <Link to="/appointments"
      style={{ background: "white", color: "#1B2F6E", padding: "8px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: "700", textDecoration: "none" }}
        >
      Appointment
    </Link>
  </div>
)}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;