import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  // Mouse tracking for Custom Cursor
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Theme Toggle Effect
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const toggleAccordion = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const toggleProject = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  const philosophy = [
    {
      title: "01. AGENTIC WORKFLOWS",
      content: "I believe in moving beyond simple RAG. True autonomous systems require multi-step reasoning, deterministic guardrails, and dynamic tool calling. I build systems that don't just answer questions, but execute complex compliance workflows reliably."
    },
    {
      title: "02. MULTI-TENANT SCALE",
      content: "Security and isolation are non-negotiable. Architecting for SaaS means ensuring zero cross-tenant data access, robust RBAC, and policy-driven permissions from day one, rather than bolting them on later."
    },
    {
      title: "03. PERFORMANCE ENGINEERING",
      content: "Latency is a feature. Whether it's sub-second first-response times for voice agents or optimizing MySQL queries for a 20% gain, I engineer backend systems that are both resilient and blazing fast."
    }
  ];

  return (
    <>
      {/* Custom Cursor */}
      <motion.div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        animate={{ 
          x: cursorPos.x, 
          y: cursorPos.y,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      >
        {isHovering ? "VIEW" : ""}
      </motion.div>

      <header className="header">
        <div className="logo">NP.</div>
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
          </button>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="section hero container">
          <div className="reveal">
            <h1 className="text-massive">NITIN<br />PANCHAL</h1>
            <p className="hero-sub text-muted">
              FULL STACK AI ENGINEER.<br />
              ARCHITECTING INTELLIGENT SYSTEMS & SCALE.
            </p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="work" className="section container">
          <h2 className="text-huge reveal mb-16" style={{ marginBottom: '4rem' }}>EXPERIENCE</h2>
          
          <div className="exp-item reveal">
            <div className="exp-meta">
              <span className="exp-company">M37 Labs</span>
              <span className="exp-date">Oct 2025 – Present • Gurugram, India</span>
            </div>
            <div className="exp-content">
              <h3 className="exp-role">Full Stack AI Engineer</h3>
              <ul className="exp-bullets">
                <li>Architected and delivered an intelligent risk-monitoring dashboard for PR firms, serving 10+ client orgs and 600+ users in production.</li>
                <li>Designed multi-tenant architecture with strict tenant isolation, scoped RBAC, policy-driven permissions, enforcing zero cross-tenant data access.</li>
                <li>Built a model-orchestration layer routing inference across 4 LLM providers based on task type and cost, cutting inference spend by 40%.</li>
                <li>Developed FastAPI microservices and Celery-based distributed task queues powering a unified voice + chat agent (sub-second latency, 50+ concurrent sessions).</li>
              </ul>
            </div>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <span className="exp-company">AventIQ</span>
              <span className="exp-date">Nov 2024 – Oct 2025 • Delhi, India</span>
            </div>
            <div className="exp-content">
              <h3 className="exp-role">Software Developer</h3>
              <ul className="exp-bullets">
                <li>Built a full-stack MERN Employee Management System integrating Microsoft Graph APIs to auto-provision employees in Azure AD.</li>
                <li>Developed role-based dashboards using React and Tailwind CSS for real-time insights.</li>
                <li>Integrated Razorpay payments and AWS Cognito authentication into a serverless healthcare application, reducing maintenance costs by 30%.</li>
                <li>Developed a React-based admin dashboard on AWS with IAM RBAC, optimizing MySQL stored procedures for a 20% query performance gain.</li>
              </ul>
            </div>
          </div>
        </section>


        {/* PROJECTS */}
        <section id="projects" className="section container">
          <h2 className="text-huge reveal" style={{ marginBottom: '4rem' }}>PROJECTS</h2>

          <div 
            className="project-card reveal"
            style={{ cursor: 'pointer' }}
            onClick={() => toggleProject('themis')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="project-info">
              <div className="flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <h3 className="project-title">
                  <a href="https://themis-agent.vercel.app" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ textDecoration: 'underline', textUnderlineOffset: '4px', display: 'inline-flex', alignItems: 'center' }}>
                    THEMIS <ArrowUpRight style={{ color: '#ff6b00', marginLeft: '0.5rem' }} size={40} />
                  </a>
                </h3>
                <span className="text-accent">{expandedProject === 'themis' ? '-' : '+'}</span>
              </div>
              <p className="project-role">Autonomous Compliance Agent</p>
              <p>
                Built a multi-tenant agentic SaaS with a 3-stage pipeline (policy RAG → LLM reasoning → deterministic risk scoring) that auto-detects citation-backed violations across GDPR, HIPAA, PCI-DSS, SOX, cutting manual review effort ~80%.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">FastAPI</span>
                <span className="tech-tag">RAG</span>
                <span className="tech-tag">Qdrant</span>
                <span className="tech-tag">Celery</span>
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--color-text)', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-bg)' }}>
              <span className="font-display">THEMIS.VISUAL</span>
            </div>
            
            <AnimatePresence>
              {expandedProject === 'themis' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="case-study-details"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div>
                      <h4>THE ARCHITECTURE</h4>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                        The core engine relies on a robust Celery-based async ingestion pipeline (S3 → parse → chunk → embed → index) with automatic retries. 
                        Embeddings (1536-dim OpenAI) are stored in Qdrant, retrieving top-5 policy clauses to eliminate hallucinations and lifting precision by ~35%.
                      </p>
                    </div>
                    <div>
                      <h4>SECURITY & SCALE</h4>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                        The platform enforces tenant isolation, 3-role RBAC, and JWT authentication with 15-minute access windows and rotating 7-day refresh tokens.
                        Rate limiting and request-size caps ensure deterministic risk-scoring on 50MB+ uploads without system degradation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="project-card reveal"
            style={{ cursor: 'pointer' }}
            onClick={() => toggleProject('stayzy')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{ backgroundColor: '#D9381E', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', order: window.innerWidth > 768 ? -1 : 0 }}>
              <span className="font-display">STAYZY.VISUAL</span>
            </div>
            <div className="project-info" style={{ order: 0 }}>
              <div className="flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <h3 className="project-title">STAYZY</h3>
                <span className="text-accent">{expandedProject === 'stayzy' ? '-' : '+'}</span>
              </div>
              <p className="project-role">Accommodation Platform</p>
              <p>
                Built a full-stack accommodation booking platform (MERN) with JWT-based authentication, session management, and owner/guest role separation. Designed a robust booking engine with date-conflict validation.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Express</span>
              </div>
            </div>

            <AnimatePresence>
              {expandedProject === 'stayzy' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="case-study-details"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                      <h4>THE BOOKING ENGINE</h4>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem', maxWidth: '800px' }}>
                        Designed a highly reliable booking engine that implements rigorous date-conflict validation at the database level to entirely prevent double bookings.
                        The platform supports comprehensive property listing CRUD operations, dynamic image uploads, and advanced search filtering across 50+ property listings.
                      </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* OFF GRID (MUSIC) */}
        <section className="section container reveal">
          <h2 className="text-huge" style={{ marginBottom: '4rem' }}>OFF-GRID</h2>
          <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.25rem', maxWidth: '800px' }}>
            Beyond the code, I am deeply passionate about Music. It requires the same level of discipline, creativity, and structural understanding as architecting software systems.
          </p>
          
          <div className="off-grid-container">
            <div 
              className="off-grid-item" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              style={{ backgroundColor: '#1A1A1A' }}
            >
              <span className="font-display text-muted">MUSIC.PERFORMANCE</span>
              <div className="off-grid-overlay">LIVE SETS</div>
            </div>
            <div 
              className="off-grid-item" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              style={{ backgroundColor: '#2A2A2A' }}
            >
              <span className="font-display text-muted">MUSIC.PRODUCTION</span>
              <div className="off-grid-overlay">STUDIO</div>
            </div>
          </div>
        </section>

        {/* ACCORDION / PHILOSOPHY */}
        <section className="section container reveal">
          <h2 className="text-huge" style={{ marginBottom: '4rem' }}>APPROACH</h2>
          <div>
            {philosophy.map((item, idx) => (
              <div key={idx} className="accordion-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button 
                  className="accordion-header" 
                  onClick={() => toggleAccordion(idx)}
                >
                  {item.title}
                  <span style={{ color: 'var(--color-accent)' }}>{expandedSection === idx ? '-' : '+'}</span>
                </button>
                <AnimatePresence>
                  {expandedSection === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="accordion-content"
                    >
                      <p style={{ paddingBottom: '2rem', maxWidth: '800px', fontSize: '1.25rem' }}>
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="contact" className="footer section">
        <div className="container reveal">
          <h2 className="text-massive footer-massive">LET'S BUILD.</h2>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem' }}>
            <a href="mailto:panchalnitin1001@gmail.com" className="btn btn-accent" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>EMAIL ME</a>
            <a href="https://github.com/nitinpanchal1001" className="btn" style={{ borderColor: 'var(--color-bg)', color: 'var(--color-bg)' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>GITHUB</a>
            <a href="https://linkedin.com/in/nitin-panchal1001" className="btn" style={{ borderColor: 'var(--color-bg)', color: 'var(--color-bg)' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>LINKEDIN</a>
          </div>
          <p style={{ marginTop: '4rem', color: '#666', fontSize: '0.875rem', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Nitin Panchal. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
