import {  Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import Analysis from "./pages/Analysis";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import ViewResume from "./pages/ViewResume";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
 

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<SignIn />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/view-resume" element={<ViewResume />} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
