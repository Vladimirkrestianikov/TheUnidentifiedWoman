import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "./Pages/Main";
import About from "./Pages/About";
import Contacts from "./Pages/Contacts";
import Repository from "./Pages/Repository";
import "./App.css";

function App() {
  const [activeLink, setActiveLink] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Случайные глитч-эффекты
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 100);
    }, Math.random() * 3000 + 2000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <Router basename="/Main"
    >
      <div className={`corruption-layer ${glitchEffect ? 'glitch-active' : ''}`}></div>
      <div className="static-noise"></div>
      
      <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${glitchEffect ? "glitch" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">TheUnidentifiedWoman</span>
            <span className="logo-glitch">Unknow</span>
          </div>
          
          <div className="hologram-lines"></div>
          <div className="blood-drips"></div>
          
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${activeLink === "/" ? "active" : ""}`}
              onClick={() => setActiveLink("/")}
            >
              <span className="link-text">MAIN</span>
              <span className="link-corruption"></span>
            </Link>
            
            <Link 
              to="/about" 
              className={`nav-link ${activeLink === "/about" ? "active" : ""}`}
              onClick={() => setActiveLink("/about")}
            >
              <span className="link-text">ABOUT</span>
              <span className="link-corruption"></span>
            </Link>
            
            
            
            <Link 
              to="/contacts" 
              className={`nav-link ${activeLink === "/contacts" ? "active" : ""}`}
              onClick={() => setActiveLink("/contacts")}
            >
              <span className="link-text">CONTACTS</span>
              <span className="link-corruption"></span>
            </Link>
            
            <Link 
              to="/repository" 
              className={`nav-link ${activeLink === "/repository" ? "active" : ""}`}
              onClick={() => setActiveLink("/repository")}
            >
              <span className="link-text">REPOSITORY</span>
              <span className="link-corruption"></span>
            </Link>
          </div>

          <div className="scan-line"></div>
          <div className="hologram-flicker"></div>
        </div>
      </nav>

      <div className="page-content">
        <div className="distortion-field"></div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />

          <Route path="/contacts" element={<Contacts />} />
          <Route path="/repository" element={<Repository />} />
        </Routes>
      </div>
      
      <div className="emergency-flash"></div>
    </Router>
  );
}

export default App;