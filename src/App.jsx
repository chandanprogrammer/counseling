import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/style.css"
import "./css/navbar.css"
import "./css/home.css"
import "./css/registration.css"
import "./css/showlist.css"
import "./css/dashboard.css"
import "./css/error.css"
import "./css/login.css"
import "./css/sendmail.css"
import "./css/loader.css"
import "./css/chartstyle.css"
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import RegisteredList from "./pages/RegisteredList";
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
import PdfPage from "./pages/PdfPage";
import SearchConformation from "./pages/SearchConformation";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registered-list" element={<RegisteredList />} />
        <Route path="/selected-list" element={<SelectedList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/all-students-list" element={<AllStudentsList />} />
        <Route path="/dashboard/selection" element={<Selection />} />
        <Route path="/dashboard/send-mail" element={<SendMail />} />
        <Route path="/download-conformation" element={<PdfPage />} />
        <Route path="/search-conformation-page" element={<SearchConformation />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
