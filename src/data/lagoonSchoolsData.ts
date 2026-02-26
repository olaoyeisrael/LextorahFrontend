// Lagoon Schools Landing Page Data

export const lagoonNavbarData = {
  logo: "/images/lagoon/Lagoon-Schools-Logo.png",
  brandName: "Lagoon Schools",
  loginHref: "#",
  helpHref: "#",
};

export const lagoonHeroData = {
  title: "Welcome to",
  highlight: "Lagoon Schools",
  subtitle: "AI Learning Hub",
  badge: "Powered by Lextorah AI",
  description:
    "This platform is the official academic support system for students and teachers at Lagoon Schools. Lextorah AI supports learning, teaching, and academic progress across subjects—inside and beyond the classroom.",
  primaryButtonText: "Log In to Platform",
  primaryButtonHref: "#",
  secondaryButtonText: "Get Help",
  secondaryButtonHref: "#",
  image: "/images/lagoon/Lagoon-Schools-hero.png",
  supportBadge: "24/7 Support",
};

export const lagoonForStudentsData = {
  badge: "For Students",
  title: "Your Personal Learning Assistant",
  subtitle:
    "Use Lextorah AI to enhance your learning experience and achieve academic excellence.",
  benefits: [
    {
      icon: "/images/lagoon/icons/reduce.png",
      title: "Get 24/7 help with classwork and homework",
    },
    {
      icon: "/images/lagoon/icons/explain.png",
      title: "Understand difficult topics through clear, step-by-step explanations",
    },
    {
      icon: "/images/lagoon/icons/practice.png",
      title: "Practise and revise for tests and exams",
    },
    {
      icon: "/images/lagoon/icons/progress.png",
      title: "Identify weak areas early and improve steadily",
    },
  ],
  image: "/images/lagoon/Lagoon-Schools-Student-Learning.png",
};

export const lagoonForTeachersData = {
  badge: "For Teachers",
  title: "Your Co-Teaching Support Tool",
  subtitle:
    "Enhance your teaching effectiveness with AI-powered support tools.",
  benefits: [
    {
      icon: "/images/lagoon/icons/support.png",
      title: "Support students outside lesson hours",
    },
    {
      icon: "/images/lagoon/icons/identify.png",
      title: "Identify learning gaps and struggling students early",
    },
    {
      icon: "/images/lagoon/icons/generate.png",
      title: "Generate quizzes, revision materials, and practice questions",
    },
    {
      icon: "/images/lagoon/icons/reduce.png",
      title: "Reduce repetitive explanations and marking workload",
    },
  ],
  image: "/images/lagoon/Lagoon-Schools-Teacher-Using-Technology.png",
};

export const lagoonLeadershipData = {
  badge: "For School Leadership",
  title: "Data-Informed Academic Oversight",
  description:
    "Lextorah AI provides academic visibility and insight to support leadership decisions",
  features: [
    {
      icon: "/images/lagoon/icons/performance.png",
      title: "Performance Tracking",
      description: "Class and subject-level performance tracking",
    },
    {
      icon: "/images/lagoon/icons/warning.png",
      title: "Early Warning",
      description: "Early-warning indicators for at-risk students",
    },
    {
      icon: "/images/lagoon/icons/trends.png",
      title: "Academic Trends",
      description: "Cohort and term-level academic trends",
    },
    {
      icon: "/images/lagoon/icons/evidence.png",
      title: "Evidence-Based",
      description: "Evidence to support internal reviews and inspections",
    },
  ],
};

export const lagoonPlatformUsageData = {
  badge: "How the Platform Is Used",
  title: "Integrated Into Your Learning Journey",
  features: [
    {
      icon: "/images/lagoon/icons/curriculum.png",
      title: "Curriculum Aligned",
      description: "Aligned with the school curriculum and exam pathways",
    },
    {
      icon: "/images/lagoon/icons/learning.png",
      title: "Continuous Learning",
      description: "Used for homework support, revision, and continuous learning",
    },
    {
      icon: "/images/lagoon/icons/monitoring.png",
      title: "Progress Monitoring",
      description: "Monitored to support academic progress and improvement",
    },
  ],
};

export const lagoonIntegrityData = {
  title: "Academic Integrity & Responsible Use",
  subtitle: "Using AI as a learning support tool, not a shortcut",
  items: [
    {
      icon: "/images/lagoon/icons/tool.png",
      description: "Lextorah AI is a learning support tool, not a shortcut",
    },
    {
      icon: "/images/lagoon/icons/honest.png",
      description: "Students are expected to engage honestly and responsibly",
    },
    {
      icon: "/images/lagoon/icons/oversight.png",
      description: "Teachers provide guidance and oversight on appropriate use",
    },
  ],
};

export const lagoonSupportData = {
  badge: "Need Support?",
  title: "We're Here to Help",
  subtitle: "If you have questions or need help using the platform:",
  items: [
    {
      icon: "/images/lagoon/icons/subject.png",
      title: "Subject Teacher",
      description: "Contact your subject teacher",
    },
    {
      icon: "/images/lagoon/icons/class.png",
      title: "Class Teacher",
      description: "Speak to your class teacher or academic coordinator",
    },
    {
      icon: "/images/lagoon/icons/help.png",
      title: "Get Help",
      description: "Use the Get Help button above",
    },
  ],
  footerText:
    `This platform is part of <strong>Lagoon Schools'</strong> commitment to strong teaching, supported learning, and consistent academic progress.`,
};

export const lagoonFooterData = {
  logo: "/images/lagoon/Lagoon-Schools-Logo.png",
  description:
    "This platform is part of Lagoon Schools' commitment to strong teaching, supported learning, and consistent academic progress.",
  quickLinks: [
    { label: "Lagoon Schools Website", href: "#" },
    { label: "Support", href: "#" },
    { label: "Login", href: "#" },
  ],
  poweredBy: {
      title: "Powered By",
      name: "Lextorah AI",
      description: "Advanced AI tutoring platform for academic excellence",
    },
  copyright: "© 2025 Lagoon Schools. All rights reserved.",
};

// Combined data export for page consumption
export const lagoonSchoolsData = {
  navbar: lagoonNavbarData,
  hero: lagoonHeroData,
  forStudents: lagoonForStudentsData,
  forTeachers: lagoonForTeachersData,
  leadership: lagoonLeadershipData,
  platformUsage: lagoonPlatformUsageData,
  integrity: lagoonIntegrityData,
  support: lagoonSupportData,
  footer: lagoonFooterData,
};
