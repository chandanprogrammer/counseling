import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/style.css"
import "./css/home.css"
import "./css/registration.css"
import "./css/showlist.css"
import "./css/dashboard.css"
import "./css/error.css"
import "./css/login.css"
import "./css/sendmail.css"
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import ShowList from "./pages/ShowList";
import SelectedList from "./pages/SelectedList";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Success from "./pages/Success";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import AllStudentsList from "./pages/AllStudentsList";
import Selection from "./pages/Selection";
import SendMail from "./pages/SendMail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/show-list" element={<ShowList />} />
        <Route path="/selected-list" element={<SelectedList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/all-students-list" element={<AllStudentsList />} />
        <Route path="/dashboard/selection" element={<Selection />} />
        <Route path="/dashboard/send-mail" element={<SendMail />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
