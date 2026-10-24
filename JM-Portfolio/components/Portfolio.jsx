"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Github,
  Mail,
  ExternalLink,
  X,
  Code2,
  FlaskConical,
  Rocket,
  Trophy,
  GraduationCap,
  Linkedin,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { PROJECTS as BASE_PROJECTS } from "../data/projects";
import Header from "./Header";
import TypewriterTitle from "./TypewriterTitle";
import Reveal from "./Reveal";

// Keep the original Work Gallery carousel and use the PNG covers from
// public/images/projects/.  Only gallery data is changed.
const COVER_IMAGES = [
  "/images/projects/Lumispire.png",
  "/images/projects/Hotel_and_Resort.png",
  "/images/projects/Training_and_Assessment.png",
  "/images/projects/Manpower_Services.png",
  "/images/projects/Silingan_Lifestyle_Solutions.png",
];

const PROJECTS = [
  ...BASE_PROJECTS.map((project, index) => ({
    ...project,
    image: COVER_IMAGES[index] || project.image,
  })),
  {
    num: "06",
    title: "Personal Portfolio",
    category: "Portfolio Website",
    desc: "A personal portfolio showcasing my background, technical skills, selected projects, and professional journey.",
    tech: [],
    awards: [],
    image: "/images/projects/Personal_Portfolio.png",
    link: "https://martin-portfolio-three.vercel.app/",
    linkText: "View Portfolio →",
  },
  {
    num: "07",
    title: "Work Portfolio",
    category: "Project Portfolio",
    desc: "A dedicated work portfolio featuring my software development projects, systems, and technical work.",
    tech: [],
    awards: [],
    image: "/images/projects/Work_Portfolio.png",
    link: "https://jm-portfolio-woad.vercel.app/",
    linkText: "View Portfolio →",
  },
];

const SKILLS = [
  {
    group: "Backend",
    items: [
      "PHP",
      "CodeIgniter 4",
      "REST APIs",
      "Query Builder & raw SQL",
      "Session & role-based auth",
    ],
  },
  {
    group: "Data & Ops",
    items: [
      "MySQL / MariaDB",
      "PhpSpreadsheet",
      "RFID & QR integration",
      ".env credential hygiene",
      "Git & GitHub",
    ],
  },
  {
    group: "Frontend",
    items: [
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "Chart.js dashboards",
      "Responsive layouts",
    ],
  },
  {
    group: "Domain",
    items: [
      "LGU payroll & compliance",
      "Disaster relief logistics",
      "Resident records",
      "Fleet & transit systems",
    ],
  },
];

const WHAT_I_CAN_DO = [
  {
    group: "WEB & MOBILE APPLICATION DEVELOPMENT",
    description:
      "Building responsive web and mobile applications using modern programming languages and frameworks, with a focus on usability, performance, and reliability.",
    visual: "qa",
    size: "large",
    items: [
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL",
      "HTML5",
      "CSS3",
      "React.js",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Flask",
      "Flutter",
      "React Native",
      "Expo",
      "Android Studio",
      "RFID & QR Integration",
    ],
  },
  {
    group: "AI, AUTOMATION & DEVELOPMENT TOOLS",
    description:
      "Using AI tools, automation platforms, databases, and developer technologies to streamline workflows, integrate systems, and deliver efficient solutions.",
    visual: "va",
    size: "medium",
    items: [
      "OpenAI API",
      "Claude AI",
      "Codex",
      "n8n",
      "MySQL",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Git / GitHub",
      "Postman",
      "VS Code",
      "Figma",
      "Vercel",
      "Render",
    ],
  },
];

const SOCIALS = [
  {
    label: "Email",
    value: "martinjohnmike@yahoo.com",
    href: "mailto:martinjohnmike@yahoo.com",
    icon: Mail,
    color: "#000000",
  },
  {
    label: "GitHub",
    value: "github.com/JM-Mrtn",
    href: "https://github.com/JM-Mrtn",
    icon: Github,
    color: "#000000",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/john-mike-martin-designer-and-engineer",
    href: "https://www.linkedin.com/in/john-mike-martin-designer-and-engineer",
    icon: Linkedin,
    color: "#000000",
  },
];

const CARDS = [
  "Problem Solver",
  "Detail-Oriented",
  "Reliable",
  "Organized",
  "Curious",
  "Quick Learner",
  "Creative",
  "Adaptable",
  "User-Focused",
  "Open to Feedback",
];

// Fixed "chaotic" rotation/offset per card so each trait keeps its own
// scattered position as it cycles through the stack (looks like a messy
// pile of photos rather than a neat deck).
const CARD_SCATTER = [
  { rot: -7, x: 6, y: -4 },
  { rot: 5, x: -8, y: 3 },
  { rot: -3, x: 10, y: 6 },
  { rot: 9, x: -5, y: -6 },
  { rot: -10, x: 4, y: 5 },
  { rot: 4, x: -10, y: -2 },
  { rot: -5, x: 9, y: -5 },
  { rot: 8, x: -3, y: 7 },
  { rot: -8, x: 7, y: 2 },
  { rot: 3, x: -6, y: -7 },
];

const CURRENTLY = [
  { icon: Code2, label: "Building", detail: "Web & Mobile Applications" },
  { icon: FlaskConical, label: "Exploring", detail: "UI/UX Design" },
  { icon: Rocket, label: "Learning", detail: "Full-stack development" },
];

// Mobile-only stacked album for the Work Gallery — same click-to-flick
// mechanic as the Experience section's image stack, but cycling through
// project cover images instead of a single experience's photos.
function WorkAlbumStack({ projects, activeIndex, onAdvance }) {
  const count = projects.length;

  return (
    <div className="work-mobile-stack" onClick={onAdvance}>
      {projects.map((project, i) => {
        const offset = (i - activeIndex + count) % count;
        const isExiting = offset === count - 1;
        // Only the front 3 cards and the one that just got flicked away are rendered.
        if (offset > 2 && !isExiting) return null;

        const scatter = CARD_SCATTER[i % CARD_SCATTER.length];
        let style;

        if (isExiting) {
          style = {
            "--tx": `${scatter.x + 100}px`,
            "--ty": `${scatter.y - 40}px`,
            "--rot": `${scatter.rot + 25}deg`,
            "--sc": 0.88,
            "--op": 0,
            zIndex: 5,
          };
        } else {
          const depth = offset;
          const isFront = depth === 0;
          const calm = 0.4; // dampens the scatter chaos for the album stack
          const dir = depth % 2 === 1 ? -1 : 1; // alternate: mid card peeks up, back card peeks down
          style = {
            "--tx": isFront ? "0px" : `${scatter.x * calm + depth * 8}px`,
            "--ty": isFront
              ? "0px"
              : `${scatter.y * calm + dir * depth * 10}px`,
            "--rot": isFront
              ? "0deg"
              : `${scatter.rot * calm + depth * (scatter.rot >= 0 ? 1.5 : -1.5)}deg`,
            "--sc": isFront ? 1 : 1 - depth * 0.06,
            "--op": isFront ? 1 : 0.75 - (depth - 1) * 0.2,
            zIndex: 30 - depth * 10,
          };
        }

        return (
          <img
            key={project.num}
            src={project.image}
            alt={project.title}
            className={`stacked-image${offset === 0 ? " stacked-image-front" : ""}`}
            style={style}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

// Live GitHub contribution calendar. Styles stay in this file; no CSS changes needed.
function GitHubActivity() {
  const username = "JM-Mrtn";
  const accent = "var(--text)";
  const [activity, setActivity] = useState([]);
  const [status, setStatus] = useState("loading");
  const [updated, setUpdated] = useState(null);
  const [selected, setSelected] = useState(null);

  const loadActivity = React.useCallback(async () => {
    setStatus((prev) => (prev === "ready" ? "refreshing" : "loading"));
    try {
      // Public contribution counts, not fabricated or hard-coded statistics.
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        { cache: "no-store" },
      );
      if (!response.ok) throw new Error("Contribution data is unavailable");
      const json = await response.json();
      if (!Array.isArray(json.contributions))
        throw new Error("Unexpected response");
      setActivity(json.contributions);
      setUpdated(new Date());
      setStatus("ready");
    } catch (error) {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadActivity();
    const interval = setInterval(loadActivity, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadActivity]);

  const { days, total, active, longest } = React.useMemo(() => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const first = new Date(today);
    first.setDate(first.getDate() - 364);
    const counts = new Map(
      activity.map((entry) => [entry.date, Number(entry.count) || 0]),
    );
    const raw = [];
    let total = 0;
    let active = 0;
    let longest = 0;
    let currentStreak = 0;
    for (let i = 0; i < 365; i++) {
      const date = new Date(first);
      date.setDate(first.getDate() + i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const count = counts.get(key) || 0;
      total += count;
      if (count > 0) {
        active++;
        currentStreak++;
        longest = Math.max(longest, currentStreak);
      } else {
        currentStreak = 0;
      }
      raw.push({
        date: key,
        count,
        month: date.toLocaleString("en-US", { month: "short" }),
        day: date.getDate(),
      });
    }
    // Pad to Sunday so every column maps to a calendar week.
    const padding = first.getDay();
    const days = [...Array(padding).fill(null), ...raw];
    return { days, total, active, longest };
  }, [activity]);

  const colors = [
    "color-mix(in srgb, var(--text) 9%, var(--surface))",
    "color-mix(in srgb, var(--text) 27%, var(--surface))",
    "color-mix(in srgb, var(--text) 45%, var(--surface))",
    "color-mix(in srgb, var(--text) 68%, var(--surface))",
    "color-mix(in srgb, var(--text) 92%, var(--surface))",
  ];
  const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const selectedDay = selected
    ? activity.find((day) => day.date === selected)
    : null;
  const weeks = Math.ceil(days.length / 7);
  const monthMarkers = [];
  for (let col = 0; col < weeks; col++) {
    const weekDays = days.slice(col * 7, col * 7 + 7).filter(Boolean);
    if (weekDays.length) {
      const monthStart = weekDays.find((day) => day.day === 1);
      if (monthStart) {
        monthMarkers.push({ col, label: monthStart.month });
      }
    }
  }

  return (
    <section
      id="github"
      className="section"
      style={{ paddingTop: 72, paddingBottom: 85 }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", minWidth: 0 }}>
        <Reveal>
          <div className="section-label">GITHUB ACTIVITY</div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(35px, 5vw, 60px)",
                  letterSpacing: "-0.055em",
                  lineHeight: 1.05,
                  fontWeight: 800,
                  margin: "12px 0 16px",
                  color: "var(--text)",
                }}
              >
                Commit by <span style={{ color: accent }}>commit.</span>
              </h2>
              <p
                style={{
                  maxWidth: 580,
                  lineHeight: 1.7,
                  color: "var(--text)",
                  opacity: 0.72,
                  fontSize: 15,
                  margin: 0,
                }}
              >
                A live record of the work behind this portfolio. Every dot
                represents a day of code contributed to GitHub over the past
                twelve months.
              </p>
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                border: "1px solid var(--line)",
                borderRadius: 40,
                padding: "12px 20px",
                color: accent,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              @{username} <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div
            style={{
              display: "flex",
              gap: "clamp(25px, 5vw, 65px)",
              flexWrap: "wrap",
              marginTop: 48,
              marginBottom: 48,
            }}
          >
            {[
              [
                status === "ready" || status === "refreshing"
                  ? total.toLocaleString()
                  : "—",
                "Contributions in the past year",
              ],
              [
                status === "ready" || status === "refreshing"
                  ? active.toLocaleString()
                  : "—",
                "Active days",
              ],
              [
                status === "ready" || status === "refreshing"
                  ? `${longest} days`
                  : "—",
                "Longest streak",
              ],
            ].map(([value, label], index) => (
              <div
                key={label}
                style={{
                  minWidth: 140,
                  maxWidth: 205,
                  paddingRight: 30,
                  borderRight: index === 2 ? "none" : "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(36px, 4vw, 50px)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    color: index === 0 ? accent : "var(--text)",
                    lineHeight: 1.15,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    maxWidth: 160,
                    lineHeight: 1.5,
                    color: "var(--text)",
                    opacity: 0.7,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 30 }}>
            <div style={{ overflowX: "auto", paddingBottom: 12 }}>
              <div style={{ minWidth: 805, width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    marginLeft: 38,
                    height: 22,
                    position: "relative",
                  }}
                >
                  {monthMarkers.map((marker, i) => (
                    <span
                      key={`${marker.col}-${i}`}
                      style={{
                        position: "absolute",
                        left: `${(marker.col / weeks) * 100}%`,
                        color: "var(--text)",
                        opacity: 0.73,
                        fontSize: 11,
                      }}
                    >
                      {marker.label}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: "repeat(7, 1fr)",
                      gap: 4,
                      width: 26,
                      flexShrink: 0,
                      fontSize: 10,
                      color: "var(--text)",
                      opacity: 0.68,
                    }}
                  >
                    {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                      <span
                        key={i}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <div
                    role="grid"
                    aria-label="GitHub contributions over the past year"
                    style={{
                      display: "grid",
                      gridTemplateRows: "repeat(7, 1fr)",
                      gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
                      gridAutoFlow: "column",
                      gap: 4,
                      width: "100%",
                    }}
                  >
                    {days.map((day, index) =>
                      day ? (
                        <button
                          key={day.date}
                          type="button"
                          role="gridcell"
                          aria-label={`${day.count} contributions on ${formatDate(day.date)}`}
                          title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                          onClick={() => setSelected(day.date)}
                          style={{
                            width: "100%",
                            aspectRatio: "1 / 1",
                            minWidth: 0,
                            padding: 0,
                            border:
                              selected === day.date
                                ? `2px solid ${accent}`
                                : "1px solid transparent",
                            borderRadius: 4,
                            cursor: "pointer",
                            background:
                              status === "ready" || status === "refreshing"
                                ? colors[
                                    day.count === 0
                                      ? 0
                                      : day.count < 3
                                        ? 1
                                        : day.count < 6
                                          ? 2
                                          : day.count < 10
                                            ? 3
                                            : 4
                                  ]
                                : colors[0],
                          }}
                        />
                      ) : (
                        <span key={`pad-${index}`} />
                      ),
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 16,
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{ fontSize: 12, color: "var(--text)", opacity: 0.8 }}
                  >
                    {selected
                      ? `${selectedDay?.count ?? 0} contributions • ${formatDate(selected)}`
                      : "Select a square to view contributions for that day"}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 10,
                      color: "var(--text)",
                      opacity: 0.75,
                    }}
                  >
                    Less{" "}
                    {colors.map((color, i) => (
                      <span
                        key={i}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 3,
                          background: color,
                        }}
                      />
                    ))}{" "}
                    More
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid var(--line)",
                marginTop: 23,
                paddingTop: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
                flexWrap: "wrap",
                fontSize: 11,
                color: "var(--text)",
                opacity: 0.8,
              }}
            >
              <span>
                {status === "error"
                  ? "Unable to load public GitHub activity right now."
                  : status === "loading"
                    ? "Loading activity from GitHub…"
                    : `● Synced from public GitHub data · checks every 5 min${updated ? ` · ${updated.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : ""}`}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const heroRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardPaused, setCardPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certificateZoom, setCertificateZoom] = useState(100);
  const [formStatus, setFormStatus] = useState("idle");
  const [contactError, setContactError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeProject = PROJECTS[activeIndex];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!certificateModalOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setCertificateModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [certificateModalOpen]);

  const goTo = (index) => {
    const normalized =
      ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    setActiveIndex(normalized);
  };

  useEffect(() => {
    const handleMouse = (e) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const syncMarqueeSpeed = () => {
      const enterSeconds = 8; // matches marquee-enter duration in CSS
      const pxPerSecond = window.innerWidth / enterSeconds; // entrance travels 100vw in 4s
      const loopDistance = track.scrollWidth / 2; // loop travels -50% of the doubled track
      const loopSeconds = loopDistance / pxPerSecond;
      // Set on the hero section (not the track itself) so every bg-name-track
      // descendant -- the center row and all mobile fill rows -- inherits the
      // exact same duration and stays in perfect sync as one cohesive animation.
      heroRef.current?.style.setProperty(
        "--marquee-loop-duration",
        `${loopSeconds}s`,
      );
    };

    syncMarqueeSpeed();
    window.addEventListener("resize", syncMarqueeSpeed);
    return () => window.removeEventListener("resize", syncMarqueeSpeed);
  }, []);

  useEffect(() => {
    if (cardPaused) return;
    const id = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % CARDS.length);
    }, 1500);
    return () => clearInterval(id);
  }, [cardPaused]);

  return (
    <div ref={rootRef} className="portfolio-root">
      <svg
        className="bg-lines"
        viewBox="0 0 1440 5000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <g opacity="0.28">
          <path
            d="M-100 200 C 200 100, 500 300, 800 200 C 1100 100, 1300 280, 1540 180"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 350 C 300 250, 600 400, 900 320 C 1200 240, 1400 380, 1440 300"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-80 500 C 240 420, 540 580, 840 500 C 1140 420, 1360 560, 1500 480"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
        <g opacity="0.32">
          <path
            d="M0 700 C 320 620, 620 780, 920 700 C 1220 620, 1420 760, 1440 680"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-100 850 C 260 780, 560 920, 860 860 C 1160 800, 1380 940, 1540 880"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 1000 C 300 940, 600 1060, 900 1000 C 1200 940, 1400 1080, 1440 1020"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
        </g>
        <g opacity="0.22">
          <path
            d="M-120 1250 C 200 1180, 500 1320, 820 1260 C 1140 1200, 1340 1340, 1560 1280"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 1400 C 280 1340, 580 1460, 880 1400 C 1180 1340, 1380 1480, 1440 1420"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-60 1550 C 240 1490, 540 1610, 840 1550 C 1140 1490, 1360 1630, 1500 1570"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 1700 C 320 1640, 620 1760, 920 1700 C 1220 1640, 1420 1780, 1440 1720"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
        </g>
        <g opacity="0.3">
          <path
            d="M-140 1950 C 220 1880, 520 2020, 860 1960 C 1200 1900, 1400 2040, 1580 1980"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 2100 C 300 2040, 600 2160, 900 2100 C 1200 2040, 1400 2180, 1440 2120"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-80 2250 C 240 2190, 540 2310, 840 2250 C 1140 2190, 1360 2330, 1500 2270"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
        <g opacity="0.26">
          <path
            d="M0 2500 C 320 2440, 620 2560, 920 2500 C 1220 2440, 1420 2580, 1440 2520"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-100 2650 C 260 2590, 560 2710, 860 2650 C 1160 2590, 1380 2730, 1540 2670"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 2800 C 300 2740, 600 2860, 900 2800 C 1200 2740, 1400 2880, 1440 2820"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-60 2950 C 240 2890, 540 3010, 840 2950 C 1140 2890, 1360 3030, 1500 2970"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
        <g opacity="0.34">
          <path
            d="M-120 3250 C 200 3180, 500 3320, 820 3260 C 1140 3200, 1340 3340, 1560 3280"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 3400 C 280 3340, 580 3460, 880 3400 C 1180 3340, 1380 3480, 1440 3420"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-80 3550 C 240 3490, 540 3610, 840 3550 C 1140 3490, 1360 3630, 1500 3570"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 3700 C 320 3640, 620 3760, 920 3700 C 1220 3640, 1420 3780, 1440 3720"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
        </g>
        <g opacity="0.24">
          <path
            d="M-100 4050 C 260 3990, 560 4110, 860 4050 C 1160 3990, 1380 4130, 1540 4070"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 4200 C 300 4140, 600 4260, 900 4200 C 1200 4140, 1400 4280, 1440 4220"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-60 4350 C 240 4290, 540 4410, 840 4350 C 1140 4290, 1360 4430, 1500 4370"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
        <g opacity="0.3">
          <path
            d="M-140 4600 C 220 4540, 520 4660, 860 4600 C 1200 4540, 1400 4680, 1580 4620"
            stroke="var(--light-gray)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 4750 C 300 4690, 600 4810, 900 4750 C 1200 4690, 1400 4830, 1440 4770"
            stroke="var(--light-gray)"
            strokeWidth="1"
            fill="none"
          />
        </g>
      </svg>
      <Header />

      {/* HERO */}
      <section id="hero" className="hero-root" ref={heroRef}>
        <div className="bg-name-marquee">
          <div className="bg-name-track" ref={marqueeTrackRef}>
            <span className="bg-name-text">JOHN MIKE MARTIN</span>
            <span className="bg-name-text">JOHN MIKE MARTIN</span>
          </div>
        </div>

        {/* Mobile-only fill rows: 4 above + 4 below, same animation/style as the center row = 9 total */}
        {["t1", "t2", "t3", "t4", "b1", "b2", "b3", "b4"].map((pos) => (
          <div
            key={pos}
            className={`bg-name-marquee bg-name-marquee--mobile-extra bg-name-marquee--${pos}`}
            aria-hidden="true"
          >
            <div className="bg-name-track">
              <span className="bg-name-text">JOHN MIKE MARTIN</span>
              <span className="bg-name-text">JOHN MIKE MARTIN</span>
            </div>
          </div>
        ))}

        <div className="concentric-circles">
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </div>

        <div className="profile-wrap">
          <img
            src="/images/about/JM_Profile.png"
            alt="JOHN MIKE MARTIN"
            className="profile-image"
            draggable={false}
          />
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll Down</span>
        </div>
      </section>

      {/* WORK GALLERY */}
      <section id="work" className="section">
        <Reveal>
          <div className="work-header">
            <div>
              <div className="section-label">Selected Work</div>
              <TypewriterTitle text="Work Gallery" />
              <div className="section-desc">
                A collection of systems, digital projects, and technical work
                I've built.
              </div>
            </div>
            <Link href="/work" className="work-album-btn-top">
              View More Projects <ExternalLink size={14} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="work-album">
            <div className="work-album-inner">
              {PROJECTS.map((project, index) => {
                const total = PROJECTS.length;

                let diff = (index - activeIndex + total) % total;
                if (diff > total / 2) diff -= total;

                const isCenter = diff === 0;
                const distance = Math.abs(diff);
                const dir = isCenter ? 0 : diff / distance;

                const style = isCenter
                  ? {
                      transform: "translate(-50%, -50%) scale(1)",
                      zIndex: 5,
                      opacity: 1,
                    }
                  : {
                      transform: `translate(calc(-50% + ${
                        dir * (200 + (distance - 1) * 130)
                      }px), -50%) scale(${Math.max(0.55, 1 - distance * 0.28)})`,
                      zIndex: 5 - distance,
                      opacity:
                        distance <= 2
                          ? Math.max(0, 0.85 - (distance - 1) * 0.55)
                          : 0,
                      pointerEvents: distance <= 2 ? "auto" : "none",
                    };

                return (
                  <div
                    key={project.num}
                    className={`work-album-item${isCenter ? " work-album-item-center" : ""}`}
                    style={style}
                    onClick={() => !isCenter && goTo(index)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="work-album-img"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="work-mobile-stack-wrap">
            <WorkAlbumStack
              projects={PROJECTS}
              activeIndex={activeIndex}
              onAdvance={() => goTo(activeIndex + 1)}
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="work-info" key={activeProject.num}>
            <h3 className="work-info-title">{activeProject.title}</h3>
            <p className="work-info-desc">{activeProject.desc}</p>

            <a
              href={activeProject.link}
              className="work-info-link"
              target={activeProject.link !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {activeProject.linkText}
            </a>
          </div>
        </Reveal>
      </section>

      {/* WHAT I CAN DO */}
      <section
        id="what-i-can-do"
        className="section"
        style={{
          maxWidth: "1200px",
          width: "calc(100% - 48px)",
          boxSizing: "border-box",
          paddingLeft: isMobile ? "16px" : "20px",
          paddingRight: isMobile ? "16px" : "20px",
        }}
      >
        <div
          className="what-i-can-do-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "minmax(0, 9fr) minmax(0, 11fr)",
            gap: isMobile ? "28px" : "18px",
            alignItems: "start",
            width: "100%",
            maxWidth: isMobile ? "100%" : "1140px",
            margin: "0 auto",
          }}
        >
          <div
            className="what-i-can-do-left"
            style={{
              minWidth: 0,
              width: "100%",
              maxWidth: "none",
            }}
          >
            <Reveal>
              <div className="section-label">My Capabilities</div>
              <TypewriterTitle
                text="What I Can Do"
                style={{
                  fontSize: isMobile
                    ? "clamp(38px, 9vw, 48px)"
                    : "clamp(46px, 4.5vw, 62px)",
                }}
              />
              <div className="what-i-can-do-desc">
                I build web and mobile applications, manage databases, and
                integrate AI-powered tools to create practical, reliable, and
                efficient digital solutions.
              </div>

              <div
                className="tech-stack"
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(5, minmax(0, 1fr))"
                    : "repeat(5, 58px)",
                  columnGap: isMobile ? "10px" : "0px",
                  rowGap: isMobile ? "14px" : "18px",
                  justifyContent: isMobile ? "start" : "space-between",
                  alignItems: "start",
                  marginTop: "24px",
                  paddingRight: isMobile ? "0px" : "22px",
                  paddingBottom: "20px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {[
                  // Programming languages
                  ["Java", "logos:java"],
                  ["JavaScript", "logos:javascript"],
                  ["TypeScript", "logos:typescript-icon"],
                  ["Python", "logos:python"],
                  ["HTML5", "logos:html-5"],
                  ["CSS3", "logos:css-3"],

                  // Web development
                  ["React.js", "logos:react"],
                  ["Next.js", "logos:nextjs-icon"],
                  ["Node.js", "logos:nodejs-icon"],
                  ["Tailwind CSS", "logos:tailwindcss-icon"],
                  ["Flask", "logos:flask"],
                  ["Flutter", "logos:flutter"],

                  // Mobile and databases
                  ["React Native", "logos:react"],
                  ["Expo", "logos:expo-icon"],
                  ["Android Studio", "logos:android-icon"],
                  ["SQL", "vscode-icons:file-type-sql"],
                  ["MySQL", "logos:mysql-icon"],
                  ["MongoDB", "logos:mongodb-icon"],

                  // Tools and services
                  ["Supabase", "logos:supabase-icon"],
                  ["Firebase", "logos:firebase"],
                  ["GitHub", "logos:github-icon"],
                  ["VS Code", "logos:visual-studio-code"],
                  ["Figma", "logos:figma"],
                  ["Postman", "logos:postman-icon"],

                  // AI, automation, and deployment (the six missing icons)
                  ["OpenAI API", "simple-icons:openai"],
                  ["Claude AI", "simple-icons:claude"],
                  ["Codex", "simple-icons:openai"],
                  ["n8n", "simple-icons:n8n"],
                  ["Vercel", "logos:vercel-icon"],
                  ["Render", "simple-icons:render"],
                ].map(([name, icon]) => (
                  <div
                    className="tech-stack-item"
                    key={name}
                    style={{
                      width: isMobile ? "100%" : "58px",
                      height: isMobile ? "46px" : "58px",
                      padding: isMobile ? "7px" : "10px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                      position: "relative",
                      margin: 0,
                    }}
                  >
                    <img
                      src={`https://api.iconify.design/${icon.replace(":", "/")}.svg`}
                      alt={name}
                      loading="lazy"
                      draggable={false}
                      style={{
                        width: isMobile ? "27px" : "36px",
                        height: isMobile ? "27px" : "36px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />

                    <span className="tech-stack-label">{name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div
            className="what-i-can-do-right"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "minmax(0, 1fr)"
                : "repeat(2, minmax(0, 1fr))",
              alignItems: "stretch",
              minWidth: 0,
              gap: isMobile ? "18px" : "20px",
              width: "100%",
              maxWidth: "100%",
              marginLeft: 0,
            }}
          >
            {WHAT_I_CAN_DO.map((group, index) => (
              <Reveal key={group.group} delay={150 + index * 120}>
                <div
                  className={`bento-card ${group.size === "large" ? "bento-large" : "bento-medium"}`}
                  style={{
                    width: "100%",
                    minWidth: 0,
                    minHeight: isMobile ? "auto" : "650px",
                    height: "auto",
                    padding: isMobile ? "24px" : "20px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="bento-header">
                    <div className="bento-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="bento-category">{group.group}</div>
                  </div>

                  <div className="bento-visual">
                    {index === 0 && (
                      <img
                        src="/images/gif/coding.gif"
                        alt="Web Development & QA"
                        className="bento-gif"
                        draggable={false}
                      />
                    )}
                    {index === 1 && (
                      <img
                        src="/images/gif/assistant.gif"
                        alt="Virtual Assistance"
                        className="bento-gif"
                        draggable={false}
                      />
                    )}
                    {index === 2 && (
                      <img
                        src="/images/gif/social.gif"
                        alt="Content & Digital"
                        className="bento-gif"
                        draggable={false}
                      />
                    )}
                  </div>

                  <p className="bento-desc">{group.description}</p>

                  <div
                    className="bento-skills"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignContent: "flex-end",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "auto",
                      width: "100%",
                      paddingBottom: "0",
                    }}
                  >
                    {group.items.map((item) => (
                      <React.Fragment key={item}>
                        <span
                          className="bento-tag"
                          style={{
                            display: "inline-flex",
                            flex: "0 0 auto",
                            alignItems: "center",
                            width: "max-content",
                            maxWidth: "100%",
                            boxSizing: "border-box",
                            fontSize: "11.5px",
                            lineHeight: 1.35,
                            padding: "6px 10px",
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                          }}
                        >
                          {item}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <Reveal>
          <div className="section-label">ABOUT ME</div>
          <TypewriterTitle
            text={
              isMobile
                ? "Web & Mobile Developer.\nAI Integration."
                : "Web & Mobile Developer. AI Integration."
            }
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="about-profile-card">
            <div className="about-profile-header">
              <div className="about-profile-image-wrapper">
                <img
                  src="/images/about/JM_Profile.png"
                  alt="John Mike G. Martin"
                  className="about-profile-image"
                  draggable={false}
                />
              </div>
              <div className="about-profile-info">
                <div className="about-profile-name">JOHN MIKE G. MARTIN</div>
                <div className="about-profile-stats">
                  <div className="about-stat-item">
                    <span className="about-stat-label">PROJECTS</span>
                    <span className="about-stat-value">5</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">DEAN'S LIST</span>
                    <span className="about-stat-value">2024 - Present</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">BSIT STUDENT</span>
                    <span className="about-stat-value">NU - MOA</span>
                  </div>
                </div>
                <div className="about-description">
                  <p>
                    I am an Information Technology student at National
                    University - MOA, specializing in Mobile and Web
                    Applications. I focus on developing responsive web and
                    mobile platforms, full-stack applications, and
                    database-driven systems. I also work with AI integration and
                    automation to build practical solutions for real-world
                    needs.
                  </p>
                  <p>
                    Want to know more about my experience?{" "}
                    <a
                      href="/resume/Martin_John_Mike.pdf"
                      className="about-resume-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download my resume
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
            {/* CURRENTLY + CARD STACK */}
            <div className="about-bottom-row">
              <div className="currently-strip">
                <div className="currently-strip-label">CURRENTLY</div>
                <div className="currently-strip-items">
                  {CURRENTLY.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div className="currently-item" key={item.label}>
                        <span className="currently-icon">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        <div className="currently-text">
                          <div className="currently-item-label">
                            {item.label}
                          </div>
                          <div className="currently-item-detail">
                            {item.detail}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-stack">
                <div
                  className="card-stack-container"
                  onClick={() =>
                    setCardIndex((prev) => (prev + 1) % CARDS.length)
                  }
                  onMouseEnter={() => setCardPaused(true)}
                  onMouseLeave={() => setCardPaused(false)}
                >
                  {CARDS.map((trait, i) => {
                    const offset =
                      (i - cardIndex + CARDS.length) % CARDS.length;
                    const isExiting = offset === CARDS.length - 1;
                    // Only the front 3 cards and the one that just got flicked away are rendered.
                    if (offset > 2 && !isExiting) return null;

                    const scatter = CARD_SCATTER[i];
                    let style;

                    if (isExiting) {
                      style = {
                        "--tx": `${scatter.x + 140}px`,
                        "--ty": `${scatter.y - 60}px`,
                        "--rot": `${scatter.rot + 40}deg`,
                        "--sc": 0.85,
                        "--op": 0,
                        zIndex: 5,
                      };
                    } else {
                      const depth = offset;
                      style = {
                        "--tx": `${scatter.x + depth * 10}px`,
                        "--ty": `${scatter.y + depth * 8}px`,
                        "--rot": `${scatter.rot + depth * (scatter.rot >= 0 ? 5 : -5)}deg`,
                        "--sc": 1 - depth * 0.045,
                        "--op": depth === 0 ? 1 : 0.55 + (2 - depth) * 0.15,
                        zIndex: 30 - depth * 10,
                      };
                    }

                    return (
                      <div
                        key={trait}
                        className={`card-stack-card${offset === 0 ? " card-stack-card-front" : ""}`}
                        style={style}
                      >
                        <div className="card-stack-label">TRAIT</div>
                        <div className="card-stack-value">{trait}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* AWARDS — self-contained inline styles; no globals.css changes required */}
      <section id="awards" className="section">
        <Reveal>
          <div className="section-label">Recognition</div>
          <TypewriterTitle text="Awards and Achievements" />
          <div className="section-desc">
            A collection of academic and professional recognitions that reflect
            my dedication to excellence.
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 24,
              maxWidth: 1100,
              margin: "40px auto 0",
            }}
          >
            <article
              style={{
                width: "100%",
                maxWidth: 360,
                minWidth: 0,
                overflow: "hidden",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--text)",
              }}
            >
              <img
                src="/certificates/MCSN_TESDA.jpeg"
                alt="MCSN TESDA certificate"
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  height: 240,
                  objectFit: "contain",
                  background: "#ffffff",
                }}
              />
              <div style={{ padding: 20 }}>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "var(--text)",
                  }}
                >
                  MCSN TESDA Certificate
                </h3>
                <p
                  style={{
                    margin: "0 0 20px",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    opacity: 0.7,
                    color: "var(--text)",
                  }}
                >
                  TESDA / MCSN
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCertificateZoom(100);
                    setCertificateModalOpen(true);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    background: "transparent",
                    color: "var(--text)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  View Certificate <ExternalLink size={14} />
                </button>
              </div>
            </article>
          </div>
        </Reveal>
      </section>
      {/* TESDA certificate viewer modal — all styles are inline */}
      {certificateModalOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget)
              setCertificateModalOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "12px" : "22px",
            background: "rgba(0, 0, 0, 0.82)",
            backdropFilter: "blur(7px)",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="MCSN TESDA Certificate"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "min(760px, 100%)",
              maxHeight: "min(820px, 94vh)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 14,
              background: "#15171b",
              boxShadow: "0 25px 90px rgba(0,0,0,0.6)",
              color: "#f1f3f5",
            }}
          >
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                padding: isMobile ? "16px" : "20px 22px",
                flexShrink: 0,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 7px",
                    fontSize: isMobile ? 17 : 21,
                    fontWeight: 700,
                  }}
                >
                  MCSN TESDA Certificate
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "#aeb4bd",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    fontWeight: 700,
                  }}
                >
                  TESDA / MCSN
                </p>
              </div>
              <button
                type="button"
                aria-label="Close certificate"
                onClick={() => setCertificateModalOpen(false)}
                style={{
                  width: 30,
                  height: 30,
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  border: "1px solid #393038",
                  background: "#252931",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <X size={17} />
              </button>
            </header>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "10px 14px",
                background: "#303033",
                color: "#f5f5f5",
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  marginRight: isMobile ? 0 : 15,
                  fontWeight: 650,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                MCSN_TESDA.jpeg
              </span>
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => setCertificateZoom((v) => Math.max(50, v - 25))}
                style={{
                  background: "transparent",
                  border: 0,
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 20,
                }}
              >
                −
              </button>
              <span
                style={{
                  minWidth: 44,
                  textAlign: "center",
                  background: "#202023",
                  padding: "5px 4px",
                }}
              >
                {certificateZoom}%
              </span>
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => setCertificateZoom((v) => Math.min(200, v + 25))}
                style={{
                  background: "transparent",
                  border: 0,
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 20,
                }}
              >
                +
              </button>
              <button
                type="button"
                aria-label="Reset zoom"
                onClick={() => setCertificateZoom(100)}
                style={{
                  border: "1px solid #59555b",
                  background: "transparent",
                  color: "#fff",
                  borderRadius: 5,
                  padding: "5px 8px",
                  cursor: "pointer",
                  fontSize: 11,
                }}
              >
                Fit
              </button>
            </div>
            <div
              style={{
                minHeight: 180,
                flex: "1 1 auto",
                overflow: "auto",
                background: "#27272a",
                padding: isMobile ? 12 : 25,
                textAlign: "center",
              }}
            >
              <img
                src="/certificates/MCSN_TESDA.jpeg"
                alt="MCSN TESDA Certificate enlarged preview"
                style={{
                  display: "block",
                  width: `${certificateZoom}%`,
                  maxWidth: "none",
                  height: "auto",
                  margin: "0 auto",
                  background: "white",
                  boxShadow: "0 5px 22px rgba(0,0,0,0.25)",
                }}
              />
            </div>
            <footer
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap",
                gap: 10,
                padding: "15px 20px",
                flexShrink: 0,
                background: "#15171b",
              }}
            >
              <a
                href="/certificates/MCSN_TESDA.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  border: "1px solid #854769",
                  borderRadius: 999,
                  padding: "10px 15px",
                  fontSize: 12,
                  fontWeight: 650,
                  color: "#f1f3f5",
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={14} /> Open in a New Tab
              </a>
              <a
                href="/certificates/MCSN_TESDA.jpeg"
                download="MCSN_TESDA.jpeg"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  borderRadius: 999,
                  padding: "10px 15px",
                  fontSize: 12,
                  fontWeight: 700,
                  background: "#e8ebef",
                  color: "#15171b",
                  textDecoration: "none",
                }}
              >
                Download Certificate
              </a>
            </footer>
          </div>
        </div>
      )}

      {/* LIVE GITHUB ACTIVITY */}
      <GitHubActivity />

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="contact-grid">
          <div className="contact-left">
            <Reveal>
              <div className="contact-eyebrow">GET IN TOUCH</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-headline">
                LET'S
                <br />
                <span className="contact-headline-accent">WORK</span>
                <br />
                TOGETHER
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="contact-description">
                Looking for the next problem worth solving.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="contact-secondary">
                I'm open to opportunities in web and mobile development, AI
                integration, building innovative digital solutions, and other IT
                related field.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a
                href="/resume/Martin_John_Mike.pdf"
                download="John_Mike_Martin_Resume.pdf"
                className="contact-resume-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOWNLOAD RESUME →
              </a>
            </Reveal>
          </div>

          <div className="contact-right">
            <div className="contact-cards">
              <Reveal delay={200}>
                <a
                  href="mailto:martinjohnmike@yahoo.com"
                  className="contact-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-card-number">01</span>
                  <div className="contact-card-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div
                      className="contact-card-label"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.14em",
                        fontWeight: 600,
                        marginBottom: "6px",
                      }}
                    >
                      EMAIL
                    </div>
                    <div
                      className="contact-card-value"
                      style={{
                        fontSize: "15px",
                        fontWeight: 550,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.45,
                        overflowWrap: "anywhere",
                      }}
                    >
                      martinjohnmike@yahoo.com
                    </div>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={280}>
                <a
                  href="https://github.com/JM-Mrtn"
                  className="contact-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-card-number">02</span>
                  <div className="contact-card-icon">
                    <Github size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div
                      className="contact-card-label"
                      style={{
                        fontFamily: "Inter, Arial, sans-serif",
                        fontSize: "17px",
                        fontWeight: 650,
                        letterSpacing: "0.025em",
                        lineHeight: 1.25,
                        color: "var(--text)",
                        marginBottom: 0,
                      }}
                    >
                      GITHUB
                    </div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
              <Reveal delay={360}>
                <a
                  href="https://www.linkedin.com/in/john-mike-martin-designer-and-engineer"
                  className="contact-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-card-number">03</span>
                  <div className="contact-card-icon">
                    <Linkedin size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div
                      className="contact-card-label"
                      style={{
                        fontFamily: "Inter, Arial, sans-serif",
                        fontSize: "17px",
                        fontWeight: 650,
                        letterSpacing: "0.025em",
                        lineHeight: 1.25,
                        color: "var(--text)",
                        marginBottom: 0,
                      }}
                    >
                      LINKEDIN
                    </div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
            </div>
            <Reveal delay={440}>
              <button
                className="contact-cta"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsModalMinimized(false);
                }}
              >
                SEND ME A MESSAGE →
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className={`contact-modal${isModalMinimized ? " contact-modal--minimized" : ""}`}
        >
          <div
            className="contact-modal-header"
            onClick={() => isModalMinimized && setIsModalMinimized(false)}
          >
            <h3 className="contact-modal-title">Send Me a Message</h3>
            <div className="contact-modal-controls">
              <button
                type="button"
                className="contact-modal-icon-btn contact-modal-minimize-btn"
                aria-label={isModalMinimized ? "Expand" : "Minimize"}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalMinimized((v) => !v);
                }}
              >
                <Minus size={16} />
              </button>
              <button
                type="button"
                className="contact-modal-icon-btn"
                aria-label="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isModalMinimized && (
            <div className="contact-modal-inner">
              <form
                className="contact-modal-form"
                action="https://formsubmit.co/martinjohnmike@yahoo.com"
                method="POST"
                target="_blank"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (formStatus === "submitting") return;
                  const form = e.currentTarget;
                  const name =
                    form.elements.namedItem("name")?.value?.trim() || "";
                  const email =
                    form.elements.namedItem("email")?.value?.trim() || "";
                  const message =
                    form.elements.namedItem("message")?.value?.trim() || "";
                  if (!name || !email || !message) {
                    setContactError(
                      "Please complete all fields before sending.",
                    );
                    setFormStatus("error");
                    return;
                  }

                  setContactError("");
                  setFormStatus("submitting");
                  try {
                    // FormSubmit requires one-time activation from the recipient's inbox.
                    // Only report success when its API explicitly accepts the submission.
                    const response = await fetch(
                      "https://formsubmit.co/ajax/martinjohnmike@yahoo.com",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                        body: JSON.stringify({
                          name,
                          email,
                          message,
                          _subject: "New portfolio message from " + name,
                          _replyto: email,
                          _honey:
                            form.elements.namedItem("website")?.value || "",
                        }),
                      },
                    );
                    const result = await response.json();
                    if (
                      !response.ok ||
                      String(result.success).toLowerCase() !== "true"
                    ) {
                      throw new Error(
                        result.message ||
                          "The email service did not accept this message.",
                      );
                    }
                    setFormStatus("success");
                    form.reset();
                    setIsModalOpen(false);
                    setShowSuccessModal(true);
                  } catch (error) {
                    console.error("Contact form submission failed:", error);
                    const reason =
                      error instanceof Error ? error.message : "Unknown error";
                    setContactError(
                      reason === "Failed to fetch"
                        ? "The email service could not be reached from your browser. You can use the browser submission option below."
                        : reason,
                    );
                    setFormStatus("error");
                  }
                }}
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New message from JM Martin Portfolio"
                />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />
                <div className="contact-modal-field">
                  <label className="contact-modal-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="contact-modal-input"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="contact-modal-field">
                  <label className="contact-modal-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="contact-modal-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="contact-modal-field contact-modal-field--grow">
                  <label className="contact-modal-label">Message</label>
                  <textarea
                    rows="6"
                    name="message"
                    className="contact-modal-input"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="contact-modal-submit"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting"
                    ? "SENDING..."
                    : formStatus === "success"
                      ? "MESSAGE SENT"
                      : "SEND MESSAGE →"}
                </button>

                {formStatus === "error" && (
                  <div className="contact-modal-error" role="alert">
                    <div>
                      {contactError ||
                        "The email service could not process your message."}
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        const form = event.currentTarget.closest("form");
                        if (!form || !form.reportValidity()) return;
                        // Use FormSubmit's standard HTML POST as an alternative to AJAX.
                        // This opens its activation / confirmation page in a new tab.
                        form.submit();
                      }}
                      style={{
                        marginTop: 12,
                        padding: "9px 14px",
                        border: "1px solid currentColor",
                        borderRadius: 18,
                        background: "transparent",
                        color: "inherit",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Open browser submission ↗
                    </button>
                    <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
                      On first use, check your Yahoo inbox or Spam folder for
                      FormSubmit's activation email. The browser page will show
                      whether FormSubmit accepted the request.
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      )}

      {showSuccessModal && (
        <div
          className="success-modal-overlay"
          onClick={() => setShowSuccessModal(false)}
        >
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="success-modal-close"
              onClick={() => setShowSuccessModal(false)}
            >
              <X size={20} />
            </button>
            <div className="success-modal-icon">✓</div>
            <h3 className="success-modal-title">Message Sent!</h3>
            <p className="success-modal-text">
              Thanks for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              className="success-modal-btn"
              onClick={() => setShowSuccessModal(false)}
            >
              CONTINUE BROWSING
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
