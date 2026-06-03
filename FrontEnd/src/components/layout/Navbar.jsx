import { Link, useLocation } from "react-router-dom";
import { Phone, Clock, MapPin, Search, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Doctors", path: "/doctors" },
    { name: "News", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <span className="text-gray-900">MED</span>
            <span className="text-blue-500">DICAL</span>
          </Link>

          {/* Info */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-2 rounded-full">
                <Phone className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Emergency</p>
                <p className="text-sm font-semibold text-blue-500">(237) 681-812-255</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-2 rounded-full">
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Work Hour</p>
                <p className="text-sm font-semibold text-blue-500">09:00 - 20:00 Everyday</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-2 rounded-full">
                <MapPin className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Location</p>
                <p className="text-sm font-semibold text-blue-500">0123 Some Place</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <nav className="bg-[#1B2F6E] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white hover:text-gray-300 transition">
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/appointments"
              className="bg-white text-[#1B2F6E] px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition"
            >
              Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 px-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium ${
                  isActive(link.path) ? "text-white" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/appointments"
              className="bg-white text-[#1B2F6E] px-6 py-2 rounded-full text-sm font-semibold text-center"
            >
              Appointment
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;