const alleasa = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898197/alleasa_fhd71c.jpg";
const certificate = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898207/certificate_epq1xa.png";
const certiv = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898208/certiv_irbaxr.png";
const hindulive = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898210/hindulive_unpf97.png";
const kg1 = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784899415/kg1_yzw7bu.jpg";
const kg2 = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784899419/kg2_jvmwgn.jpg";
const kg3 = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784899419/kg3_b2fjuo.jpg";
const letter = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898219/letter_rnzqzt.png";
const letternew = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898221/letternew_xxapw2.png";
const std1 = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898209/std1_f7lvlf.jpg";
const std2 = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898210/std2_aqrmog.jpg";
const threeinkg = "https://res.cloudinary.com/odxzrb9z/image/upload/v1784898210/threeinkg_vi09xz.jpg";

export const IMG = {
  alleasa,
  certificate,
  certiv,
  hindulive,
  kg1,
  kg2,
  kg3,
  letter,
  letternew,
  std1,
  std2,
  threeinkg,
  allinkg: kg1,
};

export type WorkSection =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string };

export type Work = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  thumbnail: string;
  hero: string;
  gallery: string[];
  stats: { label: string; value: string }[];
  sections: WorkSection[];
  metaDescription: string;
};

export const works: Work[] = [
  {
    slug: "hackathon-mentors",
    title: "Hackathon Mentors",
    subtitle: "Inspiring the Next Generation of Innovators",
    category: "Mentorship",
    thumbnail: IMG.threeinkg,
    hero: IMG.threeinkg,
    gallery: [IMG.kg2, IMG.kg3, IMG.certiv, IMG.threeinkg],
    stats: [
      { label: "Hackathon", value: "30hr" },
      { label: "Level", value: "National" },
      { label: "Recognition", value: "Certified" },
      { label: "Host", value: "KGiSL" },
    ],
    metaDescription:
      "CANZO mentored students at KGiSL's KreativeGenesis 2026 National-Level Hackathon, guiding ideation, product thinking and execution.",
    sections: [
      {
        kind: "paragraph",
        text: "CANZO was honored to be invited as mentors at the National-Level Hackathon hosted by KG College of Arts & Science, Coimbatore. The event brought together talented students from diverse disciplines to develop innovative solutions for real-world challenges.",
      },
      {
        kind: "paragraph",
        text: "Throughout the hackathon, the CANZO team actively mentored participants, helping them refine their ideas, validate problem statements, and transform concepts into practical and scalable solutions.",
      },
      { kind: "heading", text: "What We Guided Students On" },
      {
        kind: "list",
        items: [
          "Startup Ideation & Validation",
          "Product Thinking & User Experience",
          "Problem-Solving Approaches",
          "Execution & Growth Strategies",
          "Innovation & Technology Trends",
          "Building Sustainable Business Models",
        ],
      },
      { kind: "heading", text: "Our Impact" },
      {
        kind: "paragraph",
        text: "By sharing industry insights and startup experiences, we empowered aspiring innovators to think beyond the classroom and build solutions that create real-world value. Through one-on-one mentoring sessions, team discussions, and project reviews, students gained practical knowledge on turning ideas into successful products.",
      },
      { kind: "quote", text: "Innovation begins when great ideas meet the right guidance." },
      {
        kind: "paragraph",
        text: "At CANZO, we believe in nurturing student entrepreneurship and helping young minds transform their creativity into impactful solutions for the future.",
      },
    ],
  },
  {
    slug: "campus-expansion",
    title: "Campus Expansion",
    subtitle: "First Live Multi-Canteen Campus Deployment",
    category: "Deployment",
    thumbnail: IMG.hindulive,
    hero: IMG.hindulive,
    gallery: [IMG.hindulive],
    stats: [
      { label: "Colleges Live", value: "1" },
      { label: "Active Partners", value: "2" },
      { label: "In Pipeline", value: "10+" },
      { label: "Region", value: "Tamil Nadu" },
    ],
    metaDescription:
      "CANZO went live at Hindusthan College with multiple canteens — one platform, faster ordering, better campus dining.",
    sections: [
      {
        kind: "paragraph",
        text: "CANZO successfully launched its campus food ecosystem at Hindusthan College of Arts & Science, enabling students to order from multiple canteens through a single platform.\nHindusthan College of Arts & Science has a total of 9 campus canteens. As part of the initial launch phase, 2 canteens are now live on the CANZO platform, with plans to onboard additional food partners and expand the ecosystem across the campus.",
      },
      { kind: "heading", text: "Active Food Partners" },
      {
        kind: "list",
        items: [
          "Polar Coffee — Hindusthan College of Arts & Science (Live on CANZO)",
          "Urban Eatery — Hindusthan College of Arts & Science (Live on CANZO)",
        ],
      },
      { kind: "heading", text: "What This Means" },
      {
        kind: "paragraph",
        text: "Students can browse menus, place orders, skip long queues, and enjoy a seamless campus dining experience directly from their smartphones. Both food partners are now connected through the CANZO ecosystem, creating a faster and more convenient food ordering experience across the campus.",
      },
      { kind: "heading", text: "Vision" },
      {
        kind: "paragraph",
        text: "CANZO is building Tamil Nadu's largest smart campus food network, connecting students, colleges, and food partners through a single digital platform.",
      },
      { kind: "quote", text: "One Platform. Multiple Canteens. Better Campus Dining." },
    ],
  },
  {
    slug: "institutional-recognition",
    title: "Institutional Recognition & Support",
    subtitle: "Official Recognition from Hindusthan College of Arts & Science",
    category: "Recognition",
    thumbnail: IMG.letternew,
    hero: IMG.letternew,
    gallery: [IMG.letter],
    stats: [
      { label: "Recognition", value: "Principal" },
      { label: "Document", value: "Official Letter" },
      { label: "Support", value: "Institutional" },
      { label: "Focus", value: "Student-First" },
    ],
    metaDescription:
      "CANZO received an official Letter of Appreciation from Dr. A. Ponnusamy, Principal of Hindusthan College of Arts & Science.",
    sections: [
      {
        kind: "paragraph",
        text: "CANZO received formal recognition and encouragement from Dr. A. Ponnusamy, Principal of Hindusthan College of Arts & Science, Coimbatore, for its vision of transforming campus food operations through technology.",
      },
      {
        kind: "paragraph",
        text: "After reviewing the platform and its potential impact on students and campus canteens, the institution acknowledged CANZO's innovative approach toward creating a smarter, more efficient campus ecosystem.",
      },
      { kind: "heading", text: "Letter of Appreciation & Acceptance" },
      {
        kind: "paragraph",
        text: "As a mark of support and confidence in the platform, Dr. A. Ponnusamy issued an official Letter of Appreciation and Acceptance of Software Donation on behalf of Hindusthan College of Arts & Science.",
      },
      {
        kind: "list",
        items: [
          "Student-Centric Innovation",
          "Smart Campus Transformation",
          "Digital Food Ordering & Management",
          "Improved Campus Convenience",
          "Technology-Driven Student Solutions",
        ],
      },
      { kind: "heading", text: "A Milestone for CANZO" },
      {
        kind: "paragraph",
        text: "Receiving official recognition from the Principal and college administration validated CANZO's mission and strengthened our commitment to building innovative solutions for students and educational institutions. This support became an important milestone in CANZO's journey toward creating Tamil Nadu's largest smart campus network.",
      },
      {
        kind: "quote",
        text: "The recognition and encouragement from Dr. A. Ponnusamy and Hindusthan College became a strong foundation for CANZO's campus journey.",
      },
    ],
  },
  {
    slug: "first-campus-launch",
    title: "First Campus Launch",
    subtitle: "Building the Foundation of a Student Innovation Ecosystem",
    category: "Launch",
    thumbnail: IMG.alleasa,
    hero: IMG.alleasa,
    gallery: [IMG.alleasa],
    stats: [
      { label: "Students Engaged", value: "50+" },
      { label: "College", value: "EASA" },
      { label: "Format", value: "Orientation" },
      { label: "Outcome", value: "Inspired" },
    ],
    metaDescription:
      "CANZO's first campus orientation at EASA College engaged 50+ students with startup ideation and career-readiness sessions.",
    sections: [
      {
        kind: "paragraph",
        text: "EASA College of Engineering & Technology became one of the first campuses to welcome CANZO's student-focused initiative. This orientation program introduced students to startup culture, industry expectations, and real-world opportunities beyond traditional classroom learning.",
      },
      {
        kind: "paragraph",
        text: "More than 50 students from the 1st and 2nd year actively participated in interactive sessions designed to bridge the gap between academics and practical experience.",
      },
      { kind: "heading", text: "Program Highlights" },
      {
        kind: "list",
        items: [
          "Introduction to Startup Ecosystems",
          "Campus Operations & Leadership Opportunities",
          "Skill Development and Industry Exposure",
          "Real-World Project Experience",
          "Team Collaboration & Communication",
          "Career Readiness and Professional Growth",
        ],
      },
      { kind: "heading", text: "Impact Created" },
      {
        kind: "paragraph",
        text: "The session encouraged students to think beyond theory and explore innovation, entrepreneurship, and problem-solving. Participants gained valuable insights into how startups operate, how products are built, and how young talent can contribute to meaningful projects while still pursuing their education.",
      },
      {
        kind: "quote",
        text: "Empowering students with skills, exposure, and opportunities to thrive in the modern world.",
      },
    ],
  },
  {
    slug: "internship-opportunities",
    title: "Internship Opportunities Created",
    subtitle: "From Orientation to Real-World Experience",
    category: "Internships",
    thumbnail: IMG.std1,
    hero: IMG.std1,
    gallery: [IMG.std1, IMG.std2],
    stats: [
      { label: "Students Selected", value: "12+" },
      { label: "Duration", value: "1 Month" },
      { label: "Cost", value: "Free" },
      { label: "Type", value: "Hands-On" },
    ],
    metaDescription:
      "12+ EASA students selected for CANZO's one-month free internship — real startup experience and mentorship.",
    sections: [
      {
        kind: "paragraph",
        text: "One of the most impactful outcomes of our collaboration with EASA College of Engineering & Technology was the creation of internship opportunities for students.",
      },
      {
        kind: "paragraph",
        text: "Following the orientation and engagement sessions, 12+ students were selected for a one-month internship program at CANZO, completely free of cost. The internship provided students with practical industry exposure, hands-on project experience, and an opportunity to work alongside a growing startup ecosystem.",
      },
      { kind: "heading", text: "What Students Gained" },
      {
        kind: "list",
        items: [
          "Real-World Project Experience",
          "Startup Work Culture Exposure",
          "Team Collaboration & Communication Skills",
          "Product Development Knowledge",
          "Industry Mentorship & Guidance",
          "Career Development Opportunities",
        ],
      },
      {
        kind: "paragraph",
        text: "The internship program helped bridge the gap between classroom learning and industry expectations, enabling students to apply their skills in real projects while gaining valuable professional experience.",
      },
      {
        kind: "quote",
        text: "What started as a campus orientation evolved into an opportunity for students to gain real industry experience through CANZO.",
      },
    ],
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
export const getAdjacent = (slug: string) => {
  const i = works.findIndex((w) => w.slug === slug);
  return {
    prev: i > 0 ? works[i - 1] : works[works.length - 1],
    next: i < works.length - 1 ? works[i + 1] : works[0],
  };
};
