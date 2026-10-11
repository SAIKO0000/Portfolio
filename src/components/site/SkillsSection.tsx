'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  FiCheckCircle, FiCloud, FiCode, FiCpu, FiDatabase, FiEdit3, FiGitMerge,
  FiGlobe, FiLayers, FiLink, FiMessageSquare, FiMonitor, FiRepeat, FiSearch,
  FiServer, FiShield, FiUsers, FiWifi, FiZap,
} from 'react-icons/fi';
import { FaAws, FaCss3Alt, FaJava } from 'react-icons/fa';
import {
  SiAnthropic, SiDocker, SiExpress, SiFigma, SiFirebase, SiGit,
  SiGithub, SiGitlab, SiGooglecloud, SiGooglegemini, SiGooglesheets,
  SiHtml5, SiJavascript, SiLinux, SiMake, SiMediapipe, SiMongodb, SiMysql,
  SiN8N, SiNeon, SiNextdotjs, SiNodedotjs, SiOdoo, SiOpencv, SiPhp,
  SiPostgresql, SiPostman, SiPython, SiReact, SiSupabase, SiTailwindcss,
  SiTelegram, SiTypescript, SiVercel, SiVitest,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

type SkillCategory = { title: string; skills: string[] };
type SkillTab = { id: string; label: string; categories: SkillCategory[] };

const tabs: SkillTab[] = [
  {
    id: 'ai-data', label: 'AI & Data', categories: [
      { title: 'AI & Automation', skills: ['OpenAI API', 'Anthropic Claude', 'Google Gemini API', 'Groq API', 'n8n', 'Make.com', 'AI Agents', 'Vector Search', 'RAG', 'Webhooks', 'CRM Integrations', 'Prompt Engineering', 'LLM Integration', 'AI Workflow Automation', 'Google Sheets', 'Telegram'] },
      { title: 'Databases', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Neon', 'pgvector', 'Firebase'] },
    ],
  },
  {
    id: 'development', label: 'Development', categories: [
      { title: 'Programming Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'PHP'] },
      { title: 'Frontend', skills: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'XML'] },
      { title: 'Backend', skills: ['Node.js', 'Express.js', 'Odoo ERP', 'REST API'] },
      { title: 'Design & Prototyping', skills: ['Figma', 'Google Stitch', 'Canva'] },
      { title: 'Applied Vision', skills: ['OpenCV', 'MediaPipe'] },
    ],
  },
  {
    id: 'delivery', label: 'Delivery', categories: [
      { title: 'Development Tools', skills: ['Git', 'GitHub', 'GitLab', 'Docker', 'Playwright', 'Postman', 'Vitest', 'CI/CD'] },
      { title: 'Cloud Platforms', skills: ['Microsoft Azure', 'Google Cloud Platform', 'Vercel', 'Amazon Web Services (AWS)'] },
      { title: 'Software Engineering', skills: ['Object-Oriented Programming', 'Agile Development', 'Software Testing'] },
      { title: 'Learning now · AWS re/Start', skills: ['Linux', 'Networking', 'Security', 'Cloud operations'] },
    ],
  },
];

type SkillIcon = { glyph: IconType; color: string };

// Product logos use Simple Icons where available. Broad methods use distinct
// Feather pictograms instead of a misleading vendor logo or letter badge.
const icons: Record<string, SkillIcon> = {
  'OpenAI API': { glyph: FiCpu, color: '#33806B' },
  'Anthropic Claude': { glyph: SiAnthropic, color: '#B16246' },
  'Google Gemini API': { glyph: SiGooglegemini, color: '#705DB5' },
  'Groq API': { glyph: FiZap, color: '#B74F36' },
  n8n: { glyph: SiN8N, color: '#CB4055' },
  'Make.com': { glyph: SiMake, color: '#6D00CC' },
  'AI Agents': { glyph: FiCpu, color: '#2457E6' },
  'Vector Search': { glyph: FiSearch, color: '#386FA8' },
  RAG: { glyph: FiLayers, color: '#705DB5' },
  Webhooks: { glyph: FiLink, color: '#2457E6' },
  'CRM Integrations': { glyph: FiUsers, color: '#A65A40' },
  'Prompt Engineering': { glyph: FiEdit3, color: '#8B59A6' },
  'LLM Integration': { glyph: FiMessageSquare, color: '#7555A7' },
  'AI Workflow Automation': { glyph: FiGitMerge, color: '#2D827F' },
  'Google Sheets': { glyph: SiGooglesheets, color: '#188553' },
  Telegram: { glyph: SiTelegram, color: '#1685B5' },
  PostgreSQL: { glyph: SiPostgresql, color: '#416B9A' },
  MySQL: { glyph: SiMysql, color: '#4479A1' },
  MongoDB: { glyph: SiMongodb, color: '#3B8952' },
  Supabase: { glyph: SiSupabase, color: '#168664' },
  Neon: { glyph: SiNeon, color: '#147D66' },
  pgvector: { glyph: FiDatabase, color: '#6070A0' },
  Firebase: { glyph: SiFirebase, color: '#C07B0D' },
  Python: { glyph: SiPython, color: '#3776AB' },
  JavaScript: { glyph: SiJavascript, color: '#A77E00' },
  TypeScript: { glyph: SiTypescript, color: '#3178C6' },
  Java: { glyph: FaJava, color: '#B84B45' },
  SQL: { glyph: FiDatabase, color: '#4B6FA8' },
  PHP: { glyph: SiPhp, color: '#777BB4' },
  React: { glyph: SiReact, color: '#1386A8' },
  'Next.js': { glyph: SiNextdotjs, color: '#252525' },
  HTML5: { glyph: SiHtml5, color: '#D94F2B' },
  CSS3: { glyph: FaCss3Alt, color: '#1572B6' },
  'Tailwind CSS': { glyph: SiTailwindcss, color: '#078BA5' },
  XML: { glyph: FiCode, color: '#8063A5' },
  'Node.js': { glyph: SiNodedotjs, color: '#43853D' },
  'Express.js': { glyph: SiExpress, color: '#56616E' },
  'Odoo ERP': { glyph: SiOdoo, color: '#714B67' },
  'REST API': { glyph: FiGlobe, color: '#356BB8' },
  Figma: { glyph: SiFigma, color: '#A259FF' },
  'Google Stitch': { glyph: FiEdit3, color: '#4E6FC5' },
  Canva: { glyph: FiEdit3, color: '#148C94' },
  OpenCV: { glyph: SiOpencv, color: '#D84F3E' },
  MediaPipe: { glyph: SiMediapipe, color: '#3579B8' },
  Git: { glyph: SiGit, color: '#E25438' },
  GitHub: { glyph: SiGithub, color: '#252525' },
  GitLab: { glyph: SiGitlab, color: '#D85F25' },
  Docker: { glyph: SiDocker, color: '#187FBC' },
  Playwright: { glyph: FiMonitor, color: '#3B8245' },
  Postman: { glyph: SiPostman, color: '#E36131' },
  Vitest: { glyph: SiVitest, color: '#71872A' },
  'CI/CD': { glyph: FiRepeat, color: '#5368AD' },
  'Microsoft Azure': { glyph: FiCloud, color: '#0078D4' },
  'Google Cloud Platform': { glyph: SiGooglecloud, color: '#4285F4' },
  Vercel: { glyph: SiVercel, color: '#252525' },
  'Amazon Web Services (AWS)': { glyph: FaAws, color: '#B9740E' },
  'Object-Oriented Programming': { glyph: FiCode, color: '#5369A8' },
  'Agile Development': { glyph: FiGitMerge, color: '#3D8072' },
  'Software Testing': { glyph: FiCheckCircle, color: '#2C7E67' },
  Linux: { glyph: SiLinux, color: '#B88C16' },
  Networking: { glyph: FiWifi, color: '#3B77A6' },
  Security: { glyph: FiShield, color: '#5E769A' },
  'Cloud operations': { glyph: FiServer, color: '#5D77AD' },
};

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case 'ArrowRight': nextIndex = (index + 1) % tabs.length; break;
      case 'ArrowLeft': nextIndex = (index - 1 + tabs.length) % tabs.length; break;
      case 'Home': nextIndex = 0; break;
      case 'End': nextIndex = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return <section id="skills" className="section section--ruled site-container" aria-labelledby="skills-title">
    <span id="about" className="legacy-anchor" aria-hidden="true" />
    <header className="section-intro">
      <h2 id="skills-title">Core Skills</h2>
      <p>Tools and methods I’ve worked with, from automation and development to delivery. Current AWS re/Start coursework is marked separately.</p>
    </header>
    <div className="skill-tabs" role="tablist" aria-label="Skill categories">
      {tabs.map((tab, index) => <button
        key={tab.id}
        ref={(element) => { tabRefs.current[index] = element; }}
        id={`skill-tab-${tab.id}`}
        type="button"
        role="tab"
        aria-selected={activeTab === index}
        aria-controls={`skill-panel-${tab.id}`}
        tabIndex={activeTab === index ? 0 : -1}
        onClick={() => setActiveTab(index)}
        onKeyDown={(event) => handleTabKeyDown(event, index)}
      >{tab.label}</button>)}
    </div>
    {tabs.map((tab, index) => <div
      key={tab.id}
      id={`skill-panel-${tab.id}`}
      className="skill-panel"
      role="tabpanel"
      aria-labelledby={`skill-tab-${tab.id}`}
      tabIndex={0}
      hidden={activeTab !== index}
    >
      {tab.categories.map((category) => <section className="skill-category" key={category.title} aria-label={category.title}>
        <h3>{category.title}</h3>
        <ul className="skill-grid">
          {category.skills.map((label) => {
            const { glyph: Icon, color } = icons[label];
            return <li key={label}>
              <span className="skill-grid__icon" style={{ '--skill-color': color } as CSSProperties} aria-hidden="true"><Icon /></span>
              <span>{label}</span>
            </li>;
          })}
        </ul>
      </section>)}
    </div>)}
  </section>;
}
