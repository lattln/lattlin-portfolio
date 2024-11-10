import project1 from "../assets/project1.webp";
import project2 from "../assets/project2.webp";
import project3 from "../assets/project3.webp";
import project4 from "../assets/project4.webp";
import { RiGithubFill, RiLinkedinFill } from '@remixicon/react'


export const LINKS = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
];

export const HERO_CONTENT = {
    greeting: "Hey there! 🖐️",
    introduction:
        "I’m Lin Latt, a creative frontend developer, crafting immersive and intuitive web experiences.",
    description:
        "I’m currently helping businesses bring their visions to life through interactive digital solutions.",
    resumeLinkText: "Download Resume",
    resumeLink: "/resume.pdf",
};

export const PROJECTS = [
    {
        name: "Macro and Me (WIP)",
        description: "Track your meals and calories with smart AI suggestions",
        image: project1,
        link: "https://github.com/lattln",
    },
    {
        name: "Electronic Health Record Dashboard (WIP)",
        description: "FHIR Compliance Dashboard with clinical & Patient views",
        image: project2,
        link: "https://github.com/lattln",
    },
    {
        name: "MIE Form Builder",
        description: "FHIR Compliance form builder for creating & Editing questionnaire",
        image: project3,
        link: "https://github.com/lattln",
    },
    {
        name: "Form Builder Packages",
        description:
            "Multiple NPM package for editorjs, Devdependencies for FHIR Questionnaire Builder",
        image: project4,
        link: "https://github.com/lattln",
    },
];

export const ABOUT_CONTENT = {
    paragraphs: [
        "I'm a passionate full-stack developer with experience in building responsive and scalable web applications. I enjoy working with modern technologies and continuously learning to improve my skills.",
        "I specialize in using technologies like React, Next.js, and Tailwind CSS to create responsive and scalable interfaces. My focus is on writing clean, maintainable code while collaborating with cross-functional teams to deliver projects that meet both business goals and user needs. I thrive in environments that challenge me to continuously learn and grow.",
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
    headline: "LET'S WORK ON SOMETHING GREAT",
    description:
        "I'm excited to collaborate on projects that push boundaries and create meaningful impact. Let's build something innovative and exceptional together.",
    email: "lattln.tech@gmail.com",
    socialLinks: [
        {
            platform: "GitHub",
            url: "https://github.com/lattln",
            ariaLabel: "View my GitHub profile",
            icon: RiGithubFill,
        },
        {
            platform: "LinkedIn",
            url: "https://www.linkedin.com/in/lin-latt/",
            ariaLabel: "Connect with me on LinkedIn",
            icon: RiLinkedinFill,
        },
    ],
    footerText: `© ${new Date().getFullYear()} Lin Latt. All rights reserved.`,
};
