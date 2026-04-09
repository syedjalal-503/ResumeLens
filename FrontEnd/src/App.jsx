import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Analysis from "./pages/Analysis";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import ViewResume from "./pages/ViewResume";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TermsCondition from "./pages/TermsCondition";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col">

      {!hideLayout && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<SignIn />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/view-resume" element={<ViewResume />} />
          <Route path="/terms" element={<TermsCondition />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}

    </div>
  );
}

export default App;