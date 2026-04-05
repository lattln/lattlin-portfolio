import { RiGithubFill, RiLinkedinFill } from "@remixicon/react";
import macroAndMeImg from "../assets/images/macroAndMe.png";
import ehrDashboardImg from "../assets/images/ehrDashboard.png";
import eSheetImg from "../assets/images/eSheet.png";

const GITHUB_URL = "https://github.com/lattln";
const LINKEDIN_URL = "https://www.linkedin.com/in/lin-latt/";
const CURRENT_YEAR = new Date().getFullYear();

export const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const HERO_CONTENT = {
  greeting: "Hi! 👋",
  introduction:
    "I design and build structured digital systems that turn complex ideas into clean, usable products.",
  description:
    "Full-stack developer focused on data-driven applications, intuitive interfaces, and scalable product architecture.",
  resumeLinkText: "Download Resume",
  resumeLink: "/resume.pdf",
};

export const PROJECTS = [
  {
    name: "eSheet",
    tagline: "Schema-driven infrastructure for structured data.",
    description: "Build, render, and manage complex data workflows through a unified form system.",
    points: [
      "Define once with schema, reuse across systems.",
      "Enforce data consistency at the source.",
      "Power downstream workflows with structured input.",
    ],
    image: eSheetImg,
    link: "https://github.com/lattln/eSheet",
    renderScale: "max-w-lg",
    type: "system",
    visualType: "isometric-chibi",
    accent: {
      section: "from-background-primary via-surface-secondary to-surface-primary",
      glowA: "bg-accent-soft/70",
      glowB: "bg-accent/20",
      badge: "bg-accent-soft text-accent-active",
      button: "bg-accent hover:bg-accent-hover focus-visible:ring-accent-active",
      bullet: "text-accent",
    },
  },
  {
    name: "Macro & Me",
    tagline: "Personal nutrition tracking that actually makes sense.",
    description: "A focused, user-first macro tracker designed for clarity, speed, and consistency.",
    points: [
      "Instant macro visibility with clean visual summaries.",
      "Fast logging flow that reduces friction.",
      "Designed to build long-term habits, not overwhelm.",
    ],
    image: macroAndMeImg,
    link: "https://github.com/lattln/macro-and-me",
    renderScale: "max-w-lg",
    type: "consumer",
    visualType: "isometric-chibi",
    accent: {
      section: "from-background-primary via-surface-secondary to-surface-primary",
      glowA: "bg-accent-soft/70",
      glowB: "bg-accent/20",
      badge: "bg-accent-soft text-accent-active",
      button: "bg-accent hover:bg-accent-hover focus-visible:ring-accent-active",
      bullet: "text-accent",
    },
  },
  {
    name: "EHR Dashboard",
    tagline: "Clinical data, simplified for real-time decisions.",
    description: "A modern dashboard for navigating complex patient data with speed and clarity.",
    points: [
      "Surface critical patient signals instantly.",
      "Reduce cognitive load with structured layouts.",
      "Support care decisions with clean, actionable data.",
    ],
    image: ehrDashboardImg,
    link: "https://github.com/lattln/EHR-Dashboard",
    renderScale: "max-w-lg",
    type: "clinical",
    visualType: "isometric-chibi",
    accent: {
      section: "from-background-primary via-surface-secondary to-surface-primary",
      glowA: "bg-accent-soft/70",
      glowB: "bg-accent/20",
      badge: "bg-accent-soft text-accent-active",
      button: "bg-accent hover:bg-accent-hover focus-visible:ring-accent-active",
      bullet: "text-accent",
    },
  },
];

export const ABOUT_CONTENT = {
  paragraphs: [
    "I build systems that simplify complexity—turning structured data and workflows into interfaces people can actually use.",
    "My focus is clarity: clear data, clear UI, and clear outcomes. Ship fast, measure impact, and iterate with purpose.",
  ],
};

export const EXPERIENCES = [
    {
        yearRange: "Jan 2024 — Present",
        title: "Software Developer, Intern",
        location: "Fort Wayne, IN",
        description: [
            "Developing a FHIR-Compliant form builder in React and Editor.js to streamline data translation between Editorjs BlockBase Data to FHIR.",
            "Implemented a drag-and-drop UI with FHIR-compliant import/export for efficient, mobile-friendly form managament.",
            "Collaborating with healthcare professional to allign UI/UX with clinical workflows using react Hooks and advances javascript.",
        ],
    },
    {
        yearRange: "July 2020 — Present",
        title: "Signal Operation Support Specialist",
        location: "indianapolis, IN",
        description: [
            "Maintained singal support system and devices.",
            "provided technical support for computer system and networks, performing maintenance on devices and equipement.",
            "Managed network operations, maintained satallite & antenna solutions, enforced signal polices, and conducted retransmission operations.",
        ],
    },
    {
        yearRange: "Aug 2023 - Dec 2024",
        title: "Project Manager, Co-Op",
        location: "Fort Wayne, IN",
        description: [
            "Directed the migration of the SMC backend from airtable to BaseRow, optimizing database management and reducing operational costs by 30%.",
            "Managed project timelines with weekly sprints, Trello and Slack, while conducting bi-weekly stakeholder meetings for progress updates.",
            "Oversaw a team of 5, coordinating tasks, facilitating communication, and ensuring efficient workflow to meet project milestones on time.",
        ],
    },
];


export const CONTACT_CONTENT = {
  headline: "Let's Build Something Clean and Scalable",
  description:
    "Have an idea or product to build? I focus on creating fast, reliable systems that users understand and trust.",
  email: "lattln.tech@gmail.com",
  socialLinks: [
    {
      platform: "GitHub",
      url: GITHUB_URL,
      ariaLabel: "View my GitHub profile",
      icon: RiGithubFill,
    },
    {
      platform: "LinkedIn",
      url: LINKEDIN_URL,
      ariaLabel: "Connect with me on LinkedIn",
      icon: RiLinkedinFill,
    },
  ],
  footerText: `© ${CURRENT_YEAR} Lin Latt. All rights reserved.`,
};
