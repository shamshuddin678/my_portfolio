'use client'

import { useState } from 'react'
import { Braces, Code2, Database, Terminal, ArrowUpRight } from 'lucide-react'

const groups = [
  { name: 'Languages', icon: Code2, description: 'The language I think in.', skills: ['Python'], detail: 'Readable, expressive, and built for getting things done.' },
  { name: 'Backend & APIs', icon: Braces, description: 'Where the logic lives.', skills: ['Django', 'FastAPI', 'Flask', 'REST APIs'], detail: 'Frameworks and interfaces that connect the pieces.' },
  { name: 'Databases & Caching', icon: Database, description: 'A place for every byte.', skills: ['PostgreSQL', 'MySQL', 'Redis'], detail: 'Structured data, thoughtful queries, faster access.' },
  { name: 'Tools & Environment', icon: Terminal, description: 'From my machine to yours.', skills: ['Docker', 'Git', 'Linux'], detail: 'Consistent environments and a dependable workflow.' },
]

export function Skills() {
  const [active, setActive] = useState('All skills')
  const visible = active === 'All skills' ? groups : groups.filter(group => group.name === active)
  return (
    <section id="skills" className="skills-section page-width" aria-labelledby="skills-title">
      <div className="section-heading"><div><p className="section-label font-mono">TOOLS OF THE TRADE</p><h2 id="skills-title">My backend toolkit<span className="text-primary">.</span></h2></div><p>The right tools. A strong foundation.<br />Built to work together.</p></div>
      <div className="skill-filters" role="group" aria-label="Filter skills by category">{['All skills', ...groups.map(group => group.name)].map(name => <button type="button" key={name} onClick={() => setActive(name)} aria-pressed={active === name}>{name}</button>)}</div>
      <div className="skill-grid" aria-live="polite">{visible.map(({ name, icon: Icon, description, skills, detail }) => <article key={name} className="skill-card"><div className="skill-card-top"><Icon size={25} strokeWidth={1.5} /><ArrowUpRight size={17} className="text-muted-foreground" /></div><h3>{name}</h3><p>{description}</p><ul className="skill-chips">{skills.map(skill => <li className="font-mono" key={skill}>{skill}</li>)}</ul><p className="skill-detail">{detail}</p></article>)}</div>
    </section>
  )
}
