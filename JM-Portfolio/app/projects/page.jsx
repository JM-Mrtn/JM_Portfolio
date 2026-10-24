"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "../../lib/projects";
import Header from "../../components/Header";
import TypewriterTitle from "../../components/TypewriterTitle";

export default function ProjectsPage() {
  return (
    <>
      <Header alwaysShowCoffee alwaysShowBackToTop />
      <div className="projects-page">
      <div className="projects-header">
        <div className="section-label">All Work</div>
        <TypewriterTitle text="Technical Projects" />
        <div className="section-desc">
          A complete collection of my technical work, systems, and digital projects.
        </div>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image-wrap">
              <img src={project.image} alt={project.title} className="project-image" />
            </div>
            <div className="project-content">
              <div className="project-header">
                <div className="project-num">{project.num}</div>
                <div className="project-category">{project.category}</div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span key={i} className="project-tech-item">{t}</span>
                ))}
              </div>
              {project.awards.length > 0 && (
                <div className="project-awards">
                  {project.awards.map((award, i) => (
                    <span key={i} className="project-award-item">{award}</span>
                  ))}
                </div>
              )}
              <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                {project.linkText} <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
