// Whitesands Schools Landing Page Data

export const whitesandsHero = {
  title: "Welcome to",
  highlight: "WHITESANDS Schools",
  subtitle: "AI Learning Hub",
  badge: "Powered by Lextorah AI",
  description:
    "This platform is the official academic support system for students and teachers at WHITESANDS Schools. Lextorah AI is an AI-supported learning system designed to assist teachers and improve student outcomes.",
  primaryButtonText: "Log In to Platform",
  primaryButtonHref: "#",
  secondaryButtonText: "Get Help",
  secondaryButtonHref: "#",
};

export const whitesandsForStudentsData = {
  title: "For Students",
  subtitle:
    "Use Lextorah AI to enhance your learning experience and achieve academic excellence.",
  benefits: [
    {
      title: "24/7 Academic Support",
      description: "Get help with classwork and homework anytime, anywhere",
    },
    {
      title: "Clear Explanations",
      description: "Understand difficult topics through step-by-step guidance",
    },
    {
      title: "Test Preparation",
      description: "Practise and revise effectively for tests and exams",
    },
    {
      title: "Progress Tracking",
      description: "Identify weak areas early and improve steadily",
    },
  ],
  image: "/images/whitesands/Whitesands-Students-learning.png",
};

export const whitesandsForTeachersData = {
  title: "For Teachers",
  subtitle:
    "Enhance your teaching effectiveness with AI-powered support tools.",
  benefits: [
    {
      title: "Extended Support",
      description: "Support students outside lesson hours effectively",
    },
    {
      title: "Early Intervention",
      description: "Identify learning gaps and struggling students early",
    },
    {
      title: "Resource Generation",
      description: "Generate quizzes, revision materials, and practice questions",
    },
    {
      title: "Reduced Workload",
      description: "Reduce repetitive explanations and marking workload",
    },
  ],
  image: "/images/whitesands/Whitesands-Teachers-teaching.png",
};

export const whitesandsLeadershipData = {
  title: "For School Leadership",
  description:
    "Lextorah AI provides academic visibility and insight to support leadership decisions",
  features: [
    {
      icon: "/images/whitesands/icons/performance.png",
      title: "Performance Tracking",
      description: "Class and subject-level performance tracking for informed decisions",
      color: "green",
    },
    {
      icon: "/images/whitesands/icons/warning.png",
      title: "Early Warning",
      description: "Early-warning indicators for at-risk students requiring intervention",
      color: "yellow",
    },
    {
      icon: "/images/whitesands/icons/cohort.png",
      title: "Cohort Analysis",
      description: "Cohort and term-level academic trends for strategic planning",
      color: "teal",
    },
    {
      icon: "/images/whitesands/icons/evidence.png",
      title: "Evidence-Based",
      description: "Evidence to support internal reviews and inspections",
      color: "red",
    },
  ],
};

export const whitesandsPlatformUsageData = {
  title: "How the Platform Is Used",
  subtitle:
    "Integrated seamlessly into the WHITESANDS Schools academic framework",
  features: [
    {
      icon: "/images/whitesands/icons/curriculum.png",
      title: "Curriculum Aligned",
      description:
        "Aligned with the school curriculum and exam pathways to ensure relevance and effectiveness",
    },
    {
      icon: "/images/whitesands/icons/learning.png",
      title: "Continuous Learning",
      description:
        "Used for homework support, revision, and continuous learning throughout the academic year",
    },
    {
      icon: "/images/whitesands/icons/progress.png",
      title: "Monitored Progress",
      description:
        "Monitored to support academic progress and improvement across all year groups",
    },
  ],
};

export const whitesandsIntegrityData = {
  title: "Academic Integrity & Responsible Use",
  points: [
    {
      icon: "/images/whitesands/icons/tool.png",
      text: "Lextorah AI is a learning support tool, not a shortcut",
    },
    {
      icon: "/images/whitesands/icons/honest.png",
      text: "Students are expected to engage honestly and responsibly",
    },
    {
      icon: "/images/whitesands/icons/oversight.png",
      text: "Teachers provide guidance and oversight on appropriate use",
    },
  ],
};

export const whitesandsSupportData = {
  title: "Need Support?",
  description:
    "If you have questions or need help using the platform, we're here to assist you",
  options: [
    {
      icon: "/images/whitesands/icons/subject.png",
      title: "Subject Teacher",
      description: "Contact your subject teacher for subject-specific queries",
    },
    {
      icon: "/images/whitesands/icons/class.png",
      title: "Class Teacher",
      description: "Speak to your class teacher or academic coordinator",
    },
    {
      icon: "/images/whitesands/icons/help.png",
      title: "Help Center",
      description: "Use the Get Help option for immediate assistance",
    },
  ],
  buttonText: "Get Help Now",
  buttonHref: "#",
};

export const whitesandsFooterData = {
  logo: "/images/whitesands/Whitesands-School-Logo.png",
  description:
    "This platform is part of WHITESANDS Schools' commitment to strong teaching, supported learning, and consistent academic progress.",
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Whitesands Schools Website", href: "#" },
      { label: "Login", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  poweredBy: {
    title: "Powered By",
    name: "Lextorah AI",
    description: "Advanced AI tutoring platform for academic excellence",
  },
  copyright: "© 2025 WHITESANDS Schools. All rights reserved.",
};

export const whitesandsNavbarData = {
  logo: "/images/whitesands/Whitesands-School-Logo.png",
  loginHref: "#",
  helpHref: "#",
};

// Combined data export for page consumption
export const whitesandsSchoolsData = {
  navbar: whitesandsNavbarData,
  hero: whitesandsHero,
  forStudents: whitesandsForStudentsData,
  forTeachers: whitesandsForTeachersData,
  leadership: whitesandsLeadershipData,
  platformUsage: whitesandsPlatformUsageData,
  integrity: {
    title: whitesandsIntegrityData.title,
    subtitle: "Students must engage responsibly with AI tools",
    items: whitesandsIntegrityData.points.map((p) => ({
      icon: p.icon,
      title: p.text.split(",")[0],
      description: p.text,
    })),
  },
  support: {
    title: whitesandsSupportData.title,
    subtitle: whitesandsSupportData.description,
    items: whitesandsSupportData.options.map((o) => ({
      icon: o.icon,
      title: o.title,
      description: o.description,
    })),
    ctaText: whitesandsSupportData.buttonText,
    ctaLink: whitesandsSupportData.buttonHref,
  },
  footer: {
    logo: whitesandsFooterData.logo,
    description: whitesandsFooterData.description,
    quickLinks: whitesandsFooterData.quickLinks.links,
    poweredByLogo: "/images/lextorah-logo.png",
    poweredByText: whitesandsFooterData.poweredBy,
    copyright: whitesandsFooterData.copyright,
  },
};
