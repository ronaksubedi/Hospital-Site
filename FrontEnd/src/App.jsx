import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div className="p-10 text-2xl">About Page</div>} />
          <Route path="/services" element={<div className="p-10 text-2xl">Services Page</div>} />
          <Route path="/doctors" element={<div className="p-10 text-2xl">Doctors Page</div>} />
          <Route path="/blog" element={<div className="p-10 text-2xl">Blog Page</div>} />
          <Route path="/contact" element={<div className="p-10 text-2xl">Contact Page</div>} />
          <Route path="/login" element={<div className="p-10 text-2xl">Login Page</div>} />
          <Route path="/register" element={<div className="p-10 text-2xl">Register Page</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;