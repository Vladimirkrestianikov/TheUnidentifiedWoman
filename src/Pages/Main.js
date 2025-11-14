import React, { useEffect, useState, useRef } from 'react';
import '../Pagescss/Main.css';

const Main = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  // Генерация частиц для фона
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      setParticles(newParticles);
    };

    //для сылок

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Анимация частиц
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.y += particle.speed;
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(255, 0, 0, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    animateParticles();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particles]);

  // Случайные глитчи
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  const socialLinks = [
    {
      name: 'TELEGRAM',
      url: 'https://t.me/Vovachka_78',
      icon: '⎊',
      color: '#0088cc',
      description: 'DIRECT_COMMUNICATION'
    },
    {
      name: 'GITHUB',
      url: 'https://github.com/Vladimirkrestianikov',
      icon: '◈',
      color: '#E1306C',
      description: 'VISUAL_FEEDS'
    },
    {
      name: 'INSTAGRAM',
      url: '#',
      icon: '⧉',
      color: '#25D366',
      description: 'INSTANT_CONNECT'
    },

  ];

  return (
    <div className="main-page">
      {/* Канвас с частицами */}
      <canvas ref={canvasRef} className="particles-canvas" />
      
      {/* Эффекты фона */}
      <div className="static-noise"></div>
      <div className={`corruption-layer ${isGlitching ? 'glitch-active' : ''}`}></div>
      <div className="distortion-field"></div>
      <div className="emergency-flash"></div>
      <div className="matrix-rain"></div>
      
      <div className="main-content">
        {/* Центральный контент */}
        <div className="hero-section content-container">
          <div className="hologram-lines"></div>
          <div className="blood-drips"></div>
          <div className="scan-line"></div>
          <div className="pulse-ring"></div>
          
          <div className={`main-title ${isGlitching ? 'glitch' : ''}`}>
            <h1 className="title-line-1">Welcome To The</h1>
            <h1 className="title-line-2">TheUnidentifiedWoman</h1>
            <div className="title-subtext">
              <span>SYSTEM_INITIALIZED</span>
              <span className="blinking-cursor">_</span>
            </div>
          </div>

          <div className="terminal-output">
            <div className="terminal-line">
              <span className="prompt">SYSTEM@USER:~$</span>
              <span className="command"> loading personal matrix</span>
            </div>
            <div className="terminal-line">
              <span className="output">[✓] CORE SYSTEM ACTIVE</span>
            </div>
            <div className="terminal-line">
              <span className="output">[✓] MEMORY BANKS ONLINE</span>
            </div>
            <div className="terminal-line">
              <span className="output">[✓] NEURAL NETWORK SYNCED</span>
            </div>
            <div className="terminal-line">
              <span className="output highlight">READY FOR INTERACTION</span>
            </div>
          </div>
        </div>

        {/* Социальные сети */}
        <div className="social-section content-container">
          <div className="section-header">
            <h2>CONNECTION PORTS</h2>
            <div className="connection-status">
              <span className="status-indicator"></span>
              <span>ONLINE</span>
            </div>
          </div>

          <div className="social-grid">
           {socialLinks.map((social, index) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-card ${hoveredButton === social.name ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredButton(social.name)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="social-icon" style={{ color: social.color }}>
              {social.icon}
            </div>
            <div className="social-info">
              <h3>{social.name}</h3>
              <p>{social.description}</p>
            </div>
            <div className="social-connector">
              <div className="connector-line"></div>
              <div className="connector-dot"></div>
            </div>
            <div className="social-hover-effect"></div>
          </a>
        ))}
          </div>
        </div>

        {/* Быстрые действия */}
        <div className="actions-section content-container">
          <div className="actions-header">
            <h2>QUICK ACCESS</h2>
          </div>
          
          <div className="actions-grid">
            
           <a 
              href="/Repository" 
              className="action-btn project-btn"
              target="_blank" 
              rel="noopener noreferrer"
              >
              
              <span className="btn-icon">☯</span>
              <span className="btn-text">VIEW PROJECTS</span>
              <div className="btn-particles"></div>
             </a>
            

           
           <a 
              href="https://youtube.com" 
              className="action-btn project-btn"
              target="_blank" 
              rel="noopener noreferrer"
              >
              <span className="btn-icon">⟳</span>
              <span className="btn-text">SYSTEM INFO</span>
              <div className="btn-particles"></div>
             </a>
            

            
           <a 
              href="https://youtube.com" 
              className="action-btn project-btn"
              target="_blank" 
              rel="noopener noreferrer"
              >
              <span className="btn-icon">⊛</span>
              <span className="btn-text">ESTABLISH CONTACT</span>
              <div className="btn-particles"></div>
           </a>
           
            

          </div>
        </div>

        {/* Статус система */}
        <div className="status-section content-container">
          <div className="status-grid">
            <div className="status-item">
              <div className="status-label">SYSTEM UPTIME</div>
              <div className="status-value">100%</div>
              <div className="status-bar">
                <div className="status-fill"></div>
              </div>
            </div>
            <div className="status-item">
              <div className="status-label">DATA FLOW</div>
              <div className="status-value">ACTIVE</div>
              <div className="status-bar">
                <div className="status-fill streaming"></div>
              </div>
            </div>
            <div className="status-item">
              <div className="status-label">USER ENGAGEMENT</div>
              <div className="status-value">HIGH</div>
              <div className="status-bar">
                <div className="status-fill"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Плавающие элементы */}
      <div className="floating-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </div>
  );
};

export default Main;