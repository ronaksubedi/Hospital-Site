import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { UserCheck, Calendar, Activity, Mail } from "lucide-react";
import CreateBlogForm from "./CreateBlogForm";

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (user.role !== "admin") { navigate("/"); return; }
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [docRes, aptRes, contactRes, blogRes] = await Promise.all([
        api.get("/api/doctors", { headers }),
        api.get("/api/appointments/all", { headers }),
        api.get("/api/contact", { headers }),
        api.get("/api/blogs/admin", { headers }),
      ]);
      setDoctors(docRes.data.doctors);
      setAppointments(aptRes.data.appointments);
      setContacts(contactRes.data.contacts);
      setBlogs(blogRes.data.blogs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentStatus = async (id, status) => {
    try {
      await api.patch(
        `/api/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  const handleContactStatus = async (id, status) => {
    try {
      await api.patch(
        `/api/contact/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to remove this doctor?")) return;
    try {
      await api.delete(`/api/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleBlog = async (id) => {
    try {
      await api.patch(`/api/blogs/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  const statusColor = (status) => {
    const colors = {
      pending: { bg: "#FEF3C7", color: "#92400E" },
      confirmed: { bg: "#D1FAE5", color: "#065F46" },
      cancelled: { bg: "#FEE2E2", color: "#991B1B" },
      completed: { bg: "#DBEAFE", color: "#1E40AF" },
      unread: { bg: "#FEE2E2", color: "#991B1B" },
      read: { bg: "#FEF3C7", color: "#92400E" },
      replied: { bg: "#D1FAE5", color: "#065F46" },
    };
    return colors[status] || { bg: "#F3F4F6", color: "#374151" };
  };

  const tabStyle = (tab) => ({
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    background: activeTab === tab ? "#1B2F6E" : "transparent",
    color: activeTab === tab ? "white" : "#6B7280",
  });

  const selectStyle = {
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid #E5E7EB",
    fontSize: "12px",
    cursor: "pointer",
    outline: "none",
  };

  if (loading) return <p style={{ textAlign: "center", padding: "80px", color: "#6B7280" }}>Loading...</p>;

  const pendingApts = appointments.filter(a => a.status === "pending").length;
  const unreadContacts = contacts.filter(c => c.status === "unread").length;

  return (
    <div style={{ background: "#F8FAFF", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#111827", marginBottom: "4px" }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>Welcome back, {user?.name}</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
          {[
            { label: "Total Doctors", value: doctors.length, icon: <UserCheck size={20} color="#3B82F6" />, bg: "#EFF6FF" },
            { label: "Total Appointments", value: appointments.length, icon: <Calendar size={20} color="#10B981" />, bg: "#ECFDF5" },
            { label: "Pending Appointments", value: pendingApts, icon: <Activity size={20} color="#F59E0B" />, bg: "#FFFBEB" },
            { label: "Unread Messages", value: unreadContacts, icon: <Mail size={20} color="#EF4444" />, bg: "#FEF2F2" },
          ].map((stat, i) => (
            <div key={i} style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ background: stat.bg, padding: "12px", borderRadius: "10px" }}>{stat.icon}</div>
              <div>
                <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "4px" }}>{stat.label}</p>
                <p style={{ fontSize: "28px", fontWeight: "800", color: "#111827" }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", background: "white", padding: "8px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", width: "fit-content", flexWrap: "wrap" }}>
          {[
            { key: "overview", label: "Overview" },
            { key: "appointments", label: `Appointments (${appointments.length})` },
            { key: "doctors", label: `Doctors (${doctors.length})` },
            { key: "blogs", label: `Blogs (${blogs.length})` },
            { key: "create-blog", label: "Write Blog" },
            { key: "contacts", label: `Messages (${contacts.length})` },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={tabStyle(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", marginBottom: "20px" }}>Recent Appointments</h2>
              {appointments.length === 0 ? (
                <p style={{ color: "#6B7280", textAlign: "center", padding: "40px" }}>No appointments yet.</p>
              ) : appointments.slice(0, 5).map(apt => {
                const sc = statusColor(apt.status);
                return (
                  <div key={apt._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #F9FAFB" }}>
                    <div>
                      <p style={{ fontWeight: "600", color: "#111827", fontSize: "14px" }}>{apt.patient?.name}</p>
                      <p style={{ color: "#6B7280", fontSize: "13px" }}>Dr. {apt.doctor?.name} — {new Date(apt.date).toLocaleDateString()} at {apt.timeSlot}</p>
                    </div>
                    <span style={{ background: sc.bg, color: sc.color, padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", textTransform: "capitalize" }}>
                      {apt.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #F3F4F6" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>All Appointments</h2>
              </div>
              {appointments.length === 0 ? (
                <p style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>No appointments yet.</p>
              ) : appointments.map(apt => {
                const sc = statusColor(apt.status);
                return (
                  <div key={apt._id} style={{ padding: "16px 24px", borderBottom: "1px solid #F9FAFB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontWeight: "600", color: "#111827", fontSize: "14px", marginBottom: "4px" }}>{apt.patient?.name}</p>
                      <p style={{ color: "#6B7280", fontSize: "13px" }}>Dr. {apt.doctor?.name} — {apt.doctor?.specialty}</p>
                      <p style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "2px" }}>{new Date(apt.date).toLocaleDateString()} at {apt.timeSlot}</p>
                      {apt.notes && <p style={{ color: "#9CA3AF", fontSize: "12px", fontStyle: "italic" }}>"{apt.notes}"</p>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ background: sc.bg, color: sc.color, padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", textTransform: "capitalize" }}>
                        {apt.status}
                      </span>
                      <select value={apt.status} onChange={(e) => handleAppointmentStatus(apt._id, e.target.value)} style={selectStyle}>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* DOCTORS */}
          {activeTab === "doctors" && (
            <div>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #F3F4F6" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>All Doctors</h2>
              </div>
              {doctors.length === 0 ? (
                <p style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>No doctors yet.</p>
              ) : doctors.map(doctor => (
                <div key={doctor._id} style={{ padding: "16px 24px", borderBottom: "1px solid #F9FAFB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", color: "#1B2F6E", overflow: "hidden", flexShrink: 0 }}>
                      {doctor.photo
                        ? <img src={doctor.photo} alt={doctor.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : doctor.name?.charAt(0)
                      }
                    </div>
                    <div>
                      <p style={{ fontWeight: "600", color: "#111827", fontSize: "14px", marginBottom: "2px" }}>{doctor.name}</p>
                      <p style={{ color: "#3B82F6", fontSize: "13px" }}>{doctor.specialty}</p>
                      <p style={{ color: "#6B7280", fontSize: "12px" }}>{doctor.email} · {doctor.experience} yrs exp</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ background: doctor.available ? "#D1FAE5" : "#FEE2E2", color: doctor.available ? "#065F46" : "#991B1B", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>
                      {doctor.available ? "Available" : "Unavailable"}
                    </span>
                    <button onClick={() => handleDeleteDoctor(doctor._id)}
                      style={{ background: "#FEE2E2", color: "#991B1B", padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BLOGS */}
          {activeTab === "blogs" && (
            <div>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>All Blogs</h2>
                <button onClick={() => setActiveTab("create-blog")}
                  style={{ background: "#1B2F6E", color: "white", padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                >
                  + Write New Blog
                </button>
              </div>
              {blogs.length === 0 ? (
                <p style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>No blogs yet.</p>
              ) : blogs.map(blog => (
                <div key={blog._id} style={{ padding: "16px 24px", borderBottom: "1px solid #F9FAFB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: "60px", height: "60px", borderRadius: "8px", background: "#EFF6FF", flexShrink: 0 }} />
                    )}
                    <div>
                      <p style={{ fontWeight: "600", color: "#111827", fontSize: "14px", marginBottom: "4px" }}>{blog.title}</p>
                      <p style={{ color: "#6B7280", fontSize: "13px" }}>{blog.category} — {blog.author?.name}</p>
                      {blog.publishedAt && (
                        <p style={{ color: "#9CA3AF", fontSize: "12px" }}>{new Date(blog.publishedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ background: blog.isPublished ? "#D1FAE5" : "#FEE2E2", color: blog.isPublished ? "#065F46" : "#991B1B", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                    <button onClick={() => handleToggleBlog(blog._id)}
                      style={{ background: "#EFF6FF", color: "#1B2F6E", padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                    >
                      {blog.isPublished ? "Unpublish" : "Publish"}
                    </button>
                    <button onClick={() => handleDeleteBlog(blog._id)}
                      style={{ background: "#FEE2E2", color: "#991B1B", padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CREATE BLOG */}
          {activeTab === "create-blog" && (
            <div style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", marginBottom: "24px" }}>Write New Blog</h2>
              <CreateBlogForm token={token} onSuccess={() => { fetchAll(); setActiveTab("blogs"); }} />
            </div>
          )}

          {/* CONTACTS */}
          {activeTab === "contacts" && (
            <div>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #F3F4F6" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111827" }}>All Messages</h2>
              </div>
              {contacts.length === 0 ? (
                <p style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>No messages yet.</p>
              ) : contacts.map(contact => {
                const sc = statusColor(contact.status);
                const mailtoHref = "mailto:" + contact.email + "?subject=Re: " + contact.subject;
                return (
                  <div key={contact._id} style={{ padding: "20px 24px", borderBottom: "1px solid #F9FAFB" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <p style={{ fontWeight: "600", color: "#111827", fontSize: "14px", marginBottom: "2px" }}>{contact.name}</p>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          <a href={mailtoHref}
                            style={{ color: "#3B82F6", fontSize: "13px", textDecoration: "none", fontWeight: "500" }}
                          >
                            {contact.email}
                          </a>
                          {contact.phone && <span style={{ color: "#6B7280", fontSize: "13px" }}>{contact.phone}</span>}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ background: sc.bg, color: sc.color, padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", textTransform: "capitalize" }}>
                          {contact.status}
                        </span>
                        <select value={contact.status} onChange={(e) => handleContactStatus(contact._id, e.target.value)} style={selectStyle}>
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </div>
                    </div>
                    <p style={{ fontWeight: "700", color: "#374151", fontSize: "13px", marginBottom: "6px" }}>{contact.subject}</p>
                    <p style={{ color: "#6B7280", fontSize: "13px", lineHeight: "1.7", marginBottom: "12px" }}>{contact.message}</p>
                    
                      <a href={mailtoHref}
                        style={{ display: "inline-block", background: "#1B2F6E", color: "white", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}
                        onClick={() => handleContactStatus(contact._id, "replied")}>
                        Reply via Email
                      </a>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;