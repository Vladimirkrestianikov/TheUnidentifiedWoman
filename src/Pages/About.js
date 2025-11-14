import React, { useEffect, useState } from 'react';
import '../Pagescss/About.css';

const About = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="about-page">
      {/* Эффекты фона */}
      <div className="static-noise"></div>
      <div className={`corruption-layer ${isGlitching ? 'glitch-active' : ''}`}></div>
      <div className="distortion-field"></div>
      <div className="emergency-flash"></div>
      
      <div className="content-container about-container">
        <div className="hologram-lines"></div>
        <div className="blood-drips"></div>
        <div className="scan-line"></div>
        
        <h1 className="about-title">
          <span className="title-text">TheUnidentifiedWoman</span>
          <span className="title-glitch">ABOUT CORRUPTED</span>
        </h1>
        
        <div className="about-content">
          <div className="text-block">
            <p className="glitch-text">
              <span className="text-main">[INITIALIZING PERSONAL DATABASE]</span>
            </p>
            
            <p className="description">
              This website serves as my personal space where I upload projects, 
              share life experiences, and provide useful tips and insights.
            </p>
          </div>

          <div className="text-block">
            <p className="glitch-text">
              <span className="text-main">[MISSION PARAMETERS]</span>
            </p>
            
            <ul className="mission-list">
              <li className="mission-item">
                <span className="item-bullet">■</span>
                PROJECTUPLOADS: My development projects and code experiments
              </li>
              <li className="mission-item">
                <span className="item-bullet">■</span>
                LIFELOG: Personal stories and memorable moments
              </li>
              <li className="mission-item">
                <span className="item-bullet">■</span>
                DATAFRAGMENTS: Useful tips and interesting information
              </li>
            </ul>
          </div>

          <div className="text-block">
            <p className="glitch-text">
              <span className="text-main">[SYSTEM STATUS]</span>
            </p>
            
            <p className="description">
              The platform is regularly updated with new content.
            </p>
          </div>
        </div>

        <div className="system-info">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">CONTENT QUALITY:</span>
              <span className="info-value">HIGH</span>
            </div>
            <div className="info-item">
              <span className="info-label">UPDATE_FREQUENCY:</span>
              <span className="info-value">REGULAR</span>
            </div>
            <div className="info-item">
              <span className="info-label">ACCESS_LEVEL:</span>
              <span className="info-value">PUBLIC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;