import { ArrowDown, ArrowUpRight, Code2, Braces, Database, Terminal, Layers3 } from 'lucide-react'
import { DeskExperience } from '@/components/portfolio/desk-experience'
import { Skills } from '@/components/portfolio/skills'

export default function Page() {
  return (
    <main id="home" className="font-sans">
      <a className="skip-link" href="#about">Skip to content</a>
      <header className="site-header page-width">
        <a href="#home" className="wordmark" aria-label="Shamshuddin Shaik home"><span className="brand-mark"><Terminal size={21} /></span> shamshuddin<span className="text-primary">.</span></a>
        <nav aria-label="Main navigation" className="main-nav"><a href="#home">Home</a><a href="#about">About</a><a href="#skills">Skills <ArrowUpRight size={14} /></a></nav>
        <span className="header-note font-mono"><span className="status-dot" /> BUILDING WITH PYTHON</span>
      </header>

      <section className="hero page-width" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <div className="eyebrow font-mono"><span className="tiny-line" /> THE DEVELOPER BEHIND THE SYSTEMS</div>
          <h1 id="hero-heading">Shamshuddin<br /><span>Shaik<span className="text-primary">.</span></span></h1>
          <div className="role"><span className="role-line" /> Python Backend Developer</div>
          <p className="hero-description">Turning complex problems into clean, reliable backends. One thoughtful line of Python at a time.</p>
          <div className="hero-actions"><a href="#skills" className="primary-link">Explore my skills <ArrowUpRight size={18} /></a><a href="#about" className="secondary-link">A little about me <ArrowDown size={16} /></a></div>
          <div className="hero-signoff font-mono"><Code2 size={17} /><span>Clean code. Solid foundations.</span></div>
        </div>
        <div className="hero-art"><DeskExperience /><div className="scene-caption"><span className="caption-square" /><span className="font-mono">MY LITTLE CORNER OF THE INTERNET</span><span className="caption-line" /></div></div>
        <div className="hero-bottom"><a href="#about" className="scroll-link"><span className="scroll-track"><span /></span><span className="font-mono">SCROLL TO EXPLORE</span></a><span className="font-mono desktop-note">BUILT ON LOGIC. DRIVEN BY CURIOSITY.</span></div>
      </section>

      <div className="stack-strip"><div className="page-width stack-strip-inner"><span className="font-mono strip-label">MY EVERYDAY TOOLKIT</span><span><Code2 /> Python</span><span><Layers3 /> Django</span><span><Braces /> FastAPI</span><span><Database /> PostgreSQL</span><span><Terminal /> Docker</span></div></div>

      <section id="about" className="about-section page-width" aria-labelledby="about-title">
        <div><p className="section-label font-mono">A LITTLE ABOUT ME</p><h2 id="about-title">Behind every great app,<br />there&apos;s a <span className="text-primary">solid backend.</span></h2></div>
        <div className="about-copy"><p>I&apos;m Shamshuddin, a Python Backend Developer who enjoys making things work beautifully behind the scenes.</p><p>My focus is on building well-structured APIs, working with data, and creating services that are easy to understand and maintain. I believe the best solutions start with curiosity and stay simple by design.</p><div className="about-signature font-mono"><span className="text-primary">{'>'}</span> Think clearly. Build thoughtfully. Keep learning.</div></div>
      </section>
      <Skills />
      <section className="closing page-width"><span className="closing-code font-mono" aria-hidden="true">{'</>'}</span><div><p className="section-label font-mono">ALWAYS A WORK IN PROGRESS</p><h2>Curiosity is part of the stack.</h2><p>Learning, experimenting, and building something better.</p></div><a href="#home" className="back-top" aria-label="Back to top"><ArrowUpRight size={24} /></a></section>
      <footer className="site-footer page-width"><a href="#home" className="wordmark">shamshuddin<span className="text-primary">.</span></a><span>Python Backend Developer</span><span className="font-mono">Made with intention.</span></footer>
    </main>
  )
}
