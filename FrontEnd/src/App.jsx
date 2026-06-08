import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Doctors from "./pages/Doctors/Doctors";
import DoctorDetail from "./pages/Doctors/DoctorDetail";
import Services from "./pages/Services/Services";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Appointments from "./pages/Appointments/Appointments";
import MyAppointments from "./pages/Appointments/MyAppointments";
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard.jsx";
import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Layout>

        <Routes>

          <Route 
          path="/" 
          element={<Home />} 
          />

          <Route 
          path="/about" 
          element={<About />} 
          />

          <Route 
          path="/services" 
          element={<Services />} 
          />

          <Route 
          path="/doctors" 
          element={<Doctors />} 
          />

          <Route 
          path="/doctors/:id" 
          element={<DoctorDetail />} 
          />

          <Route 
          path="/blog" 
          element={<Blog />} />
          <Route 
          path="/blog/:slug" 
          element={<BlogDetail />} 
          />

          <Route 
          path="/contact" 
          element={<Contact />} 
          />

          <Route 
          path="/login" 
          element={<Login />} 
          />

          <Route 
          path="/register" 
          element={<Register />} 
          />

          <Route 
          path="/appointments" 
          element={<Appointments />} 
          />

          <Route 
          path="/my-appointments" 
          element={<MyAppointments />} 
          />

          <Route 
          path="/doctor-dashboard" 
          element={<DoctorDashboard />} 
          />

          <Route 
          path="/admin" 
          element={<AdminDashboard />} 
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;