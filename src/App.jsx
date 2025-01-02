import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/style.css"
import "./css/registration.css"
import "./css/showregistration.css"
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import ShowRegistraction from "./pages/ShowRegistraction";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Success from "./pages/Success";
import Footer from "./components/Footer";
import Dasboard from "./pages/Dasboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/show-registration" element={<ShowRegistraction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dasboard" element={<Dasboard />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
