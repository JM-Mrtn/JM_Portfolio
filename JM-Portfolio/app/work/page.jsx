"use client";

import React, { useEffect, useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import WorkHeader from "../../components/WorkHeader";
import TechnicalArchive from "../../components/TechnicalArchive";
import WorkCTA from "../../components/WorkCTA";
import { PROJECTS } from "../../lib/projects";
import TypewriterTitle from "../../components/TypewriterTitle";
import Reveal from "../../components/Reveal";

// Add real Android APKs in public/apk/. Add verified App Store or TestFlight URLs for iOS.
// Never publish placeholder iOS links as working downloads.
const MOBILE_APPS = [
  { projectNum: "01", apk: "/apk/lumispire.apk", iosUrl: null },
  { projectNum: "02", apk: "/apk/patio-de-lorenzo.apk", iosUrl: null },
  { projectNum: "03", apk: "/apk/training-assessment.apk", iosUrl: null },
  { projectNum: "04", apk: "/apk/manpower-services.apk", iosUrl: null },
];

function MobileDownload({ apk, title }) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let active = true;
    // A missing APK must never trigger a broken download link.
    fetch(apk, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        const contentType = response.headers.get("content-type") || "";
        if (active)
          setAvailable(response.ok && !contentType.includes("text/html"));
      })
      .catch(() => {
        if (active) setAvailable(false);
      });
    return () => {
      active = false;
    };
  }, [apk]);

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "1px solid var(--line)",
    borderRadius: 999,
    padding: "10px 15px",
    fontWeight: 600,
    fontSize: 12,
    textDecoration: "none",
    background: "var(--surface)",
    color: "var(--text)",
    opacity: available ? 1 : 0.5,
    cursor: available ? "pointer" : "not-allowed",
    whiteSpace: "nowrap",
    flexShrink: 0,
  };
  return available ? (
    <a
      href={apk}
      download
      aria-label={`Download Android APK for ${title}`}
      style={buttonStyle}
    >
      <Download size={15} /> Download APK
    </a>
  ) : (
    <span
      title="Upload the matching APK to public/apk/ to enable downloads"
      style={buttonStyle}
      aria-disabled="true"
    >
      <Download size={15} /> APK unavailable
    </span>
  );
}

function MobileProjects() {
  const projects = MOBILE_APPS.map(({ projectNum, apk, iosUrl }) => ({
    project: PROJECTS.find((p) => p.num === projectNum),
    apk,
    iosUrl,
  })).filter(({ project }) => Boolean(project));

  return (
    <section
      className="archive-section"
      id="mobile"
      style={{ scrollMarginTop: 110 }}
    >
      <Reveal>
        <div className="archive-header">
          <div className="archive-header-left">
            <div className="section-label">iOS &amp; Android apps</div>
            <TypewriterTitle text="Mobile Projects" />
            <p className="archive-description">
              Mobile versions of my systems for Android and iOS. Download an
              Android APK or visit an official iOS installation link when
              available.
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div className="archive-list">
          {projects.map(({ project, apk, iosUrl }) => (
            <div
              key={project.num}
              className="archive-row"
              style={{ cursor: "default" }}
            >
              <span className="archive-row-num">{project.num}</span>
              <div className="archive-row-main" style={{ minWidth: 0 }}>
                <div className="archive-row-title">{project.title}</div>
                <div className="archive-row-desc">{project.desc}</div>
                <div className="archive-row-tags">
                  <span className="archive-row-category">
                    ANDROID &amp; iOS MOBILE APPLICATION
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <MobileDownload apk={apk} title={project.title} />
                {iosUrl ? (
                  <a
                    href={iosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      gap: 6,
                      alignItems: "center",
                      border: "1px solid var(--line)",
                      borderRadius: 999,
                      padding: "10px 15px",
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      color: "var(--text)",
                      background: "var(--surface)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <ExternalLink size={14} /> View iOS App
                  </a>
                ) : (
                  <span
                    title="Add a valid iOS App Store or TestFlight URL in MOBILE_APPS to enable this link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      border: "1px solid var(--line)",
                      borderRadius: 999,
                      padding: "10px 15px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text)",
                      background: "var(--surface)",
                      opacity: 0.5,
                      whiteSpace: "nowrap",
                    }}
                    aria-disabled="true"
                  >
                    iOS link unavailable
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default function Work() {
  // Live website links remain exactly as defined in lib/projects.js.
  const web = [
    ...PROJECTS.filter((p) => !p.category.includes("Digital")),
    {
      num: "06",
      title: "Personal Portfolio",
      category: "Web Development",
      desc: "My personal portfolio showcasing my background, skills, projects, achievements, and experience.",
      tech: [],
      awards: [],
      image: "/images/projects/Personal_Portfolio.png",
      link: "https://martin-portfolio-three.vercel.app/",
      linkText: "View Project →",
    },
    {
      num: "07",
      title: "Work Portfolio",
      category: "Web Development",
      desc: "A dedicated portfolio highlighting my web, mobile, and software development work and completed projects.",
      tech: [],
      awards: [],
      image: "/images/projects/Work_Portfolio.png",
      link: "https://jm-portfolio-woad.vercel.app/",
      linkText: "View Project →",
    },
  ];
  return (
    <main style={{ position: "relative" }}>
      <WorkHeader />
      <TechnicalArchive projects={web} />
      <MobileProjects />
      <WorkCTA />
    </main>
  );
}
