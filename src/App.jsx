import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

function App() {
  // Simple scroll reveal effect (for that cinematic feel)
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

  return (
    <>
      <header className="header">
        <div className="logo">NP.</div>
        <nav className="nav-links">
          <a href="#work" className="nav-link">Work</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
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

          <div className="project-card reveal">
            <div className="project-info">
              <div className="flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <h3 className="project-title">THEMIS</h3>
                <a href="#" className="text-accent"><ArrowUpRight size={32} /></a>
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
              {/* Placeholder for cinematic image */}
              <span className="font-display">THEMIS.VISUAL</span>
            </div>
          </div>

          <div className="project-card reveal">
            <div style={{ backgroundColor: '#D9381E', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', order: -1 }}>
              {/* Placeholder for cinematic image */}
              <span className="font-display">STAYZY.VISUAL</span>
            </div>
            <div className="project-info" style={{ order: 0 }}>
              <div className="flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <h3 className="project-title">STAYZY</h3>
                <a href="#" className="text-accent"><ArrowUpRight size={32} /></a>
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
          </div>
        </section>

        {/* SKILLS */}
        <section className="section container">
          <h2 className="text-huge reveal" style={{ marginBottom: '4rem' }}>CAPABILITIES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="reveal">
              <h4 className="text-accent" style={{ marginBottom: '1rem' }}>AI / ML</h4>
              <p>RAG, Agentic Workflows, LLM Fine-tuning, OpenAI SDK, LiteLLM, Vector DBs (Qdrant), Ollama.</p>
            </div>
            <div className="reveal">
              <h4 className="text-accent" style={{ marginBottom: '1rem' }}>BACKEND</h4>
              <p>FastAPI, Node.js, Express.js, RESTful APIs, Celery, Redis.</p>
            </div>
            <div className="reveal">
              <h4 className="text-accent" style={{ marginBottom: '1rem' }}>FRONTEND</h4>
              <p>React.js, Next.js, Tailwind CSS, HTML5, CSS3, Redux.</p>
            </div>
            <div className="reveal">
              <h4 className="text-accent" style={{ marginBottom: '1rem' }}>CLOUD & DEVOPS</h4>
              <p>AWS (Cognito, Lambda, S3, EC2, IAM, RDS), Azure, Docker, GitHub Actions, Jenkins.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="contact" className="footer section">
        <div className="container reveal">
          <h2 className="text-massive footer-massive">LET'S BUILD.</h2>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem' }}>
            <a href="mailto:panchalnitin1001@gmail.com" className="btn btn-accent">EMAIL ME</a>
            <a href="https://github.com/nitinpanchal1001" className="btn" style={{ borderColor: 'var(--color-bg)', color: 'var(--color-bg)' }}>GITHUB</a>
            <a href="https://linkedin.com/in/nitin-panchal1001" className="btn" style={{ borderColor: 'var(--color-bg)', color: 'var(--color-bg)' }}>LINKEDIN</a>
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
