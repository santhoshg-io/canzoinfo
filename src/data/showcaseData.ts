export interface ShowcaseOverview {
  description: string;
  objectives: string[];
  duration: string;
  skillsLearned: string[];
  technologiesUsed: string[];
  outcomes: string[];
  skillsTitle?: string;
  skillsSubtitle?: string;
}

export interface TopPerformer {
  name: string;
  role: string;
  photoUrl: string;
  award?: string;
  recognition?: string;
  achievementPoster?: string;
}

export interface ProjectBuilt {
  name: string;
  description: string;
  image: string;
  technologies: string[];
  projectUrl?: string;
}

export interface GalleryItem {
  url: string;
  caption: string;
  category: "certificate" | "event" | "group" | "individual";
}

export interface TimelineJourney {
  step: string;
  title: string;
  description: string;
}

export interface CollegeMilestone {
  date: string;
  title: string;
  description: string;
}

export interface SuccessStory {
  studentName: string;
  quote: string;
  photoUrl?: string;
}

export interface ShowcaseHighlights {
  events: { title: string; description: string; date?: string; imageUrl?: string }[];
  achievements: { title: string; description: string }[];
  journey: TimelineJourney[];
  milestones: CollegeMilestone[];
  successStories: SuccessStory[];
}

export interface CollegeShowcase {
  id: string;
  collegeName: string;
  internshipTitle: string;
  shortDescription: string;
  coverImage: string;
  overview: ShowcaseOverview;
  topPerformers: TopPerformer[];
  projects: ProjectBuilt[];
  gallery: GalleryItem[];
  highlights?: ShowcaseHighlights;
}

export const showcaseData: Record<string, CollegeShowcase> = {
  easa: {
    id: "easa",
    collegeName: "EASA College of Engineering and Technology",
    internshipTitle: "Full Stack and Product Development Intern",
    shortDescription: "Empowering next-generation developers through intensive hands-on training, industry-standard toolkits, and end-to-end web applications built from scratch.",
    coverImage: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907129/WhatsApp_Image_2026-08-04_at_10.48.10_AM_tkykhi.jpg",
    overview: {
      description: "During this intensive internship program, students from EASA College of Engineering and Technology worked directly on building and enhancing product features. The program focuses on bridging the gap between theoretical computer science concepts and practical modern software development methodologies.",
      skillsTitle: "Skills & Areas Worked On",
      skillsSubtitle: "Students successfully worked on:",
      objectives: [
        "UI Design",
        "Website Development",
        "Product Planning",
        "Documentation",
        "Testing",
        "Business Research"
      ],
      duration: "30 Working Days (June 8, 2026 - July 20, 2026)",
      skillsLearned: [
        "UI Design",
        "Website Development",
        "Product Planning",
        "Documentation",
        "Testing",
        "Business Research"
      ],
      technologiesUsed: [
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Vite",
        "Framer Motion"
      ],
      outcomes: [
        "Successfully developed and deployed feature-rich web applications.",
        "Acquired official industry-grade internship certification.",
        "Built professional portfolios ready for campus and corporate placements."
      ]
    },
    topPerformers: [
      {
        name: "Ganesh V",
        role: "Full Stack and Product Development Intern",
        photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907611/WhatsApp_Image_2026-08-05_at_9.03.37_AM_r1d0qh.jpg",
        award: "Outstanding Project Leadership Award",
        recognition: "Outstanding coordination, product planning, and system integration leadership.",
      },
      {
        name: "Santhosh G",
        role: "Full Stack and Product Development Intern",
        photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907619/WhatsApp_Image_2026-08-05_at_9.03.38_AM_hrvgvp.jpg",
        award: "Technical Excellence & Leadership Award",
        recognition: "Exemplary technical skills, product development leadership, and full stack orchestration.",
      },
      {
        name: "Prabu S",
        role: "Full Stack and Product Development Intern",
        photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907612/WhatsApp_Image_2026-08-05_at_9.03.38_AM_1_fjjk63.jpg",
        award: "Excellence in Professionalism Award",
        recognition: "Exceptional professional dedication, quality delivery, and state management contribution.",
      }
    ],
    projects: [
      {
        name: "The Fuel Box",
        description: "Smart Nutrition Startup. A full product built from concept to launch, covering:",
        image: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785900309/WhatsApp_Image_2026-08-04_at_10.48.10_AM_ofobaw.jpg",
        technologies: ["UI Design", "Product Planning", "Business Research"],
        projectUrl: "#"
      },
      {
        name: "CANZO info Website",
        description: "Official Company Website Development. End-to-end website development including:",
        image: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785900309/WhatsApp_Image_2026-08-04_at_10.48.10_AM_ofobaw.jpg",
        technologies: ["Design", "Development", "Testing", "Documentation"],
        projectUrl: "#"
      }
    ],
    gallery: [
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907126/WhatsApp_Image_2026-08-04_at_10.48.11_AM_nzb76u.jpg",
        caption: "Internship Certificate Handover Ceremony",
        category: "certificate"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907126/WhatsApp_Image_2026-08-04_at_10.48.07_AM_hd9xwn.jpg",
        caption: "Group Photo with Mentors & College Faculty",
        category: "group"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907129/WhatsApp_Image_2026-08-04_at_10.48.08_AM_hcv6jj.jpg",
        caption: "Interns Group Discussion & Technical Onboarding",
        category: "event"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907124/WhatsApp_Image_2026-08-04_at_10.48.10_AM_1_yau9gb.jpg",
        caption: "Individual Project Review & Feedback Session",
        category: "individual"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907125/WhatsApp_Image_2026-08-04_at_10.48.08_AM_1_v2vodv.jpg",
        caption: "Technical Workshop and System Architecture Briefing",
        category: "event"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907125/WhatsApp_Image_2026-08-04_at_10.48.11_AM_1_hgrg0a.jpg",
        caption: "Student Intern Certificate Handover Celebration",
        category: "certificate"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907119/WhatsApp_Image_2026-08-04_at_10.48.09_AM_1_x6kpjo.jpg",
        caption: "Product Planning & Wireframing Review",
        category: "individual"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907119/WhatsApp_Image_2026-08-04_at_10.48.06_AM_1_puzktf.jpg",
        caption: "Interns Group Photo at Campus Inauguration",
        category: "group"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907116/WhatsApp_Image_2026-08-04_at_10.48.07_AM_1_rmgpui.jpg",
        caption: "Active Collaboration Session & Peer Code Reviews",
        category: "event"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907119/WhatsApp_Image_2026-08-04_at_10.48.06_AM_p5wcp8.jpg",
        caption: "Opening Speeches by College Principal & Mentors",
        category: "event"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907123/WhatsApp_Image_2026-08-04_at_10.48.09_AM_2_nt8ymb.jpg",
        caption: "Individual Presentation & Product Walkthrough",
        category: "individual"
      },
      {
        url: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785907121/WhatsApp_Image_2026-08-04_at_10.48.09_AM_e4exp0.jpg",
        caption: "Technical Q&A Session & Practical Demos",
        category: "event"
      }
    ]
  }
};
