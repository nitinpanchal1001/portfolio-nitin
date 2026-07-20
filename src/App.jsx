import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      return savedMode === 'dark';
    }
    return false;
  });
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
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
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
      content: "I believe in moving beyond simple RAG (Retrieval-Augmented Generation). True autonomous systems require multi-step reasoning, deterministic guardrails, and dynamic tool calling. I build systems that don't just answer questions, but autonomously execute complex compliance and data workflows with extreme reliability."
    },
    {
      title: "02. MULTI-TENANT SCALE",
      content: "Security and isolation are non-negotiable. Architecting for enterprise SaaS means ensuring zero cross-tenant data access, robust Role-Based Access Control (RBAC), and policy-driven permissions engineered from day one, rather than bolted on as an afterthought."
    },
    {
      title: "03. PERFORMANCE ENGINEERING",
      content: "Latency is a feature, not a metric. Whether it's achieving sub-second first-response times for voice-based AI agents or optimizing complex MySQL procedures for a 30% performance gain, I engineer backend pipelines that are both highly resilient and blazing fast."
    },
    {
      title: "04. BRUTALIST SIMPLICITY",
      content: "In both code and design, form follows function. I reject bloated frameworks and cluttered interfaces in favor of raw, uncompromised performance. Minimalist, highly-functional architectures naturally lead to fewer bugs, faster iterations, and vastly superior user experiences."
    },
    {
      title: "05. DETERMINISTIC RELIABILITY",
      content: "AI systems are inherently stochastic, but enterprise software demands predictability. I specialize in building strict schemas, fallback protocols, and validation layers to force deterministic, auditable, and reliable outputs from otherwise unpredictable generative models."
    }
  ];

  const skillsData = [
    {
      category: "AI / MACHINE LEARNING",
      items: ["RAG", "Agentic Workflows", "LLM Fine-tuning", "OpenAI SDK", "LiteLLM", "Hugging Face", "Ollama"]
    },
    {
      category: "LANGUAGES",
      items: ["Python", "JavaScript", "TypeScript", "C++", "C", "HTML5/CSS3"]
    },
    {
      category: "BACKEND",
      items: ["FastAPI", "Node.js", "Express.js", "Celery", "RESTful APIs"]
    },
    {
      category: "FRONTEND",
      items: ["React.js", "Next.js", "Tailwind CSS", "Redux", "Framer Motion"]
    },
    {
      category: "DATABASES",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Qdrant"]
    },
    {
      category: "CLOUD & DEVOPS",
      items: ["AWS Ecosystem", "Azure", "Docker", "Jenkins", "Git/GitHub", "Vercel", "Nginx"]
    }
  ];

  const experience = [
    {
      company: "M37 Labs",
      role: "Full Stack AI Engineer",
      period: "OCT 2025 - PRESENT",
      points: [
        "Architected and delivered an intelligent risk-monitoring dashboard for public-relations firms, serving 10+ client orgs and 600+ users in production.",
        "Designed multi-tenant architecture with strict tenant isolation, scoped RBAC, and policy-driven permissions, enforcing zero cross-tenant data access.",
        "Built a model-orchestration layer routing inference across 4 LLM providers based on task type, latency SLA, and cost constraints, cutting inference spend by 40%.",
        "Developed FastAPI microservices and Celery-based distributed task queues powering a unified voice + chat agent with sub-second (~800ms) first-response latency and 50+ concurrent sessions.",
        "Own the backend of a clienteling application for a leading Indian jewellery brand, designing FastAPI services and managing Azure deployments via Jenkins CI/CD."
      ]
    },
    {
      company: "AventIQ",
      role: "Software Developer",
      period: "NOV 2024 - OCT 2025",
      points: [
        "Built a full-stack MERN Employee Management System integrating Microsoft Graph APIs to auto-provision employees in Azure AD.",
        "Developed role-based dashboards for employees and HR using React and Tailwind CSS, enabling real-time insights.",
        "Integrated Razorpay payments and AWS Cognito authentication into a serverless senior-citizen healthcare application, reducing server maintenance costs by 30%.",
        "Developed a React-based admin dashboard on AWS with IAM RBAC, optimizing MySQL stored procedures for a 20% query performance gain."
      ]
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
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="https://s3-bucket-docs-99.s3.eu-north-1.amazonaws.com/Nitin_CV.pdf" target="_blank" rel="noopener noreferrer" className="resume-btn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            [ DOWNLOAD.CV ]
          </a>
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

        {/* SKILLS */}
        <section className="section container">
          <div className="mask-overflow" style={{ marginBottom: '4rem' }}>
            <motion.h2 
              className="text-huge"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              CAPABILITIES.SYS
            </motion.h2>
          </div>
          
          <div className="skills-grid">
            {skillsData.map((skillGroup, idx) => (
              <div key={idx} className="skill-category">
                <h4 className="skill-category-title">[{skillGroup.category}]</h4>
                <div className="project-tech">
                  {skillGroup.items.map((item, itemIdx) => (
                    <motion.span 
                      key={itemIdx} 
                      className="tech-tag" 
                      style={{ fontSize: '0.85rem' }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
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
              <div className="project-tech" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">FastAPI</span>
                <span className="tech-tag">RAG</span>
                <span className="tech-tag">Qdrant</span>
                <span className="tech-tag">Celery</span>
                <span className="tech-tag">LiteLLM</span>
                <span className="tech-tag">Redis</span>
                <span className="tech-tag">PostgreSQL</span>
              </div>
            </div>
            <div className="terminal-container">
              <div style={{ position: 'absolute', top: '1rem', left: '1.5rem', color: '#666', fontSize: '0.75rem' }}>
                root@themis-worker-04:~# tail -f /var/log/celery/compliance_engine.log
              </div>
              <pre style={{ fontSize: '0.8rem', lineHeight: '1.6', opacity: 0.8, margin: 0, whiteSpace: 'pre-wrap' }}>
                {`[2026-07-20 10:14:02] INFO: Ingesting payload_1002.pdf (4.2MB)
[2026-07-20 10:14:02] INFO: Chunking complete. Generated 42 nodes.
[2026-07-20 10:14:03] INFO: Generating embeddings (text-embedding-3-small)
[2026-07-20 10:14:03] INFO: Qdrant UPSERT success (collection: tenant_a)
[2026-07-20 10:14:04] DEBUG: Starting RAG Policy Retrieval (k=5)
[2026-07-20 10:14:04] DEBUG: Extracted clauses: [GDPR_Art32, HIPAA_164.312]
[2026-07-20 10:14:05] WARN: Analyzer agent flagged anomaly in node_12.`}
                <br /><br />
                <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>[2026-07-20 10:14:06] CRITICAL: VIOLATION_DETECTED (Risk Score: 94)</span>
                {`[2026-07-20 10:14:06] DETAIL: Unencrypted PII transmission detected.
[2026-07-20 10:14:06] INFO: Pushing violation case to human-review queue.
[2026-07-20 10:14:07] INFO: Awaiting next task... _`}
              </pre>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                    {/* The 3 Pillars */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

                      {/* Pillar 1 */}
                      <div>
                        <h4 style={{ letterSpacing: '-0.02em', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>01. THE ASYNC PIPELINE</h4>
                        <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6' }}>
                          The API is fast and stateless. Heavy workloads (Embeddings, <strong>OpenAI Whisper-1</strong> TTS/STT processing, LLM reasoning) are offloaded to <strong>Celery workers</strong>.
                          <br /><br />
                          The RAG agent retrieves the top-5 relevant clauses from <strong>Qdrant</strong>. The system relies on a <strong>LiteLLM wrapper</strong>, making the architecture completely AI model-agnostic (effortlessly swapping OpenAI, Anthropic, or local Ollama). The Reasoning agent forces structured JSON-mode output to guarantee every violation is backed by an exact policy citation.
                        </p>
                      </div>

                      {/* Pillar 2 */}
                      <div>
                        <h4 style={{ letterSpacing: '-0.02em', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>02. DETERMINISTIC SCORING</h4>
                        <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6' }}>
                          "The AI proposes; the formula disposes." An LLM cannot be trusted to generate an auditable score.
                          <br /><br />
                          Instead, the LLM detects violations, and a <strong>deterministic risk algorithm</strong> computes the 0–100 score. Severity sets the tier, while volume positions the score within the band via confidence-weighted evidence.
                        </p>
                      </div>

                      {/* Pillar 3 */}
                      <div>
                        <h4 style={{ letterSpacing: '-0.02em', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>03. ENTERPRISE ISOLATION</h4>
                        <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6' }}>
                          Multi-tenancy enforced at every layer: Postgres queries, payload filters on the Qdrant vector space, and tenant-prefixed S3 keys.
                          <br /><br />
                          Secured via JWT auth with 15-minute rotation and 7-day refresh registries stored in Redis. Includes strict 3-role RBAC (admin, reviewer, viewer) and rate-limiting.
                        </p>
                      </div>

                    </div>

                    {/* Stats Footer */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--color-accent)' }}>
                      <span>1536-DIM EMBEDDINGS</span>
                      <span>•</span>
                      <span>COSINE DISTANCE</span>
                      <span>•</span>
                      <span>GPT-4O / GPT-4O-MINI</span>
                      <span>•</span>
                      <span>GDPR / HIPAA / PCI-DSS / SOX</span>
                      <span>•</span>
                      <span>TEMP 0.0</span>
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

        {/* OFF GRID */}
        <section className="section container reveal">
          <h2 className="text-huge" style={{ marginBottom: '4rem' }}>OFF-GRID</h2>
          <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.25rem', maxWidth: '800px' }}>
            Beyond the code, my life revolves around two core disciplines: Music and Fitness. Whether it's discovering complex aural soundscapes or pushing physical limits at the gym, I believe in relentless consistency and constant growth.
          </p>

          <div className="off-grid-container">
            <div
              className="off-grid-item"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ backgroundImage: 'url(/music.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="off-grid-overlay">MUSIC LISTENER</div>
            </div>
            <div
              className="off-grid-item"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ backgroundImage: 'url(/gym.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="off-grid-overlay">THE GYM</div>
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
                      <p style={{ paddingBottom: '2rem', maxWidth: '800px', fontSize: '1rem', opacity: 0.8 }}>
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
