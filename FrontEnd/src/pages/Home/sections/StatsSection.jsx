const stats = [
  { number: "5000+", label: "Patients Served" },
  { number: "20+", label: "Years Experience" },
  { number: "100+", label: "Specialist Doctors" },
  { number: "15+", label: "Departments" },
];

const StatsSection = () => {
  return (
    <div style={{ background: "#1B2F6E", padding: "60px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", textAlign: "center" }}>
        {stats.map((stat, i) => (
          <div key={i}>
            <p style={{ fontSize: "42px", fontWeight: "800", color: "white", marginBottom: "8px" }}>{stat.number}</p>
            <p style={{ color: "#93C5FD", fontSize: "15px", fontWeight: "500" }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;