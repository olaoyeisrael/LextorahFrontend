// Grange Schools Landing Page Data

export const grangeNavbarData = {
  logo: "/images/grange/Grange-School-Logo.png",
  loginHref: "#",
  helpHref: "#",
};

export const grangeHeroData = {
  title: "Welcome to",
  highlight: "GRANGE Schools",
  subtitle: "AI Learning Hub",
  badge: "Powered by Lextorah AI",
  description:
    "This platform is the official academic support system for students and teachers at GRANGE Schools. Lextorah AI is an AI-supported learning system designed to assist teachers and improve student outcomes.",
  primaryButtonText: "Log In to Platform",
  primaryButtonHref: "#",
  secondaryButtonText: "Get Help",
  secondaryButtonHref: "#",
};

export const grangeForStudentsData = {
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
  image: "/images/grange/Grange-Students-learning.png",
};

export const grangeForTeachersData = {
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
  image: "/images/grange/Grange-Teachers-teaching.png",
};

export const grangeLeadershipData = {
  title: "For School Leadership",
  description:
    "Lextorah AI provides academic visibility and insight to support leadership decisions",
  features: [
    {
      icon: "/images/grange/icons/performance.png",
      title: "Performance Tracking",
      description: "Class and subject-level performance tracking for informed decisions",
      color: "darkBlue",
    },
    {
      icon: "/images/grange/icons/warning.png",
      title: "Early Warning",
      description: "Early-warning indicators for at-risk students requiring intervention",
      color: "mediumBlue",
    },
    {
      icon: "/images/grange/icons/cohort.png",
      title: "Cohort Analysis",
      description: "Cohort and term-level academic trends for strategic planning",
      color: "lightBlue",
    },
    {
      icon: "/images/grange/icons/evidence.png",
      title: "Evidence-Based",
      description: "Evidence to support internal reviews and inspections",
      color: "blue",
    },
  ],
};

export const grangePlatformUsageData = {
  title: "How the Platform Is Used",
  subtitle:
    "Integrated seamlessly into the WHITESANDS Schools academic framework",
  features: [
    {
      icon: "/images/grange/icons/curriculum.png",
      title: "Curriculum Aligned",
      description:
        "Aligned with the school curriculum and exam pathways to ensure relevance and effectiveness",
    },
    {
      icon: "/images/grange/icons/learning.png",
      title: "Continuous Learning",
      description:
        "Used for homework support, revision, and continuous learning throughout the academic year",
    },
    {
      icon: "/images/grange/icons/progress.png",
      title: "Monitored Progress",
      description:
        "Monitored to support academic progress and improvement across all year groups",
    },
  ],
};

export const grangeIntegrityData = {
  title: "Academic Integrity & Responsible Use",
  items: [
    {
      icon: "/images/grange/icons/tool.png",
      title: "Learning Support Tool",
      description: "Lextorah AI is a learning support tool, not a shortcut",
    },
    {
      icon: "/images/grange/icons/honest.png",
      title: "Honest Engagement",
      description: "Students are expected to engage honestly and responsibly",
    },
    {
      icon: "/images/grange/icons/oversight.png",
      title: "Teacher Oversight",
      description: "Teachers provide guidance and oversight on appropriate use",
    },
  ],
};

export const grangeSupportData = {
  title: "Need Support?",
  subtitle:
    "If you have questions or need help using the platform, we're here to assist you",
  items: [
    {
      icon: "/images/grange/icons/subject.png",
      title: "Subject Teacher",
      description: "Contact your subject teacher for subject-specific queries",
    },
    {
      icon: "/images/grange/icons/class.png",
      title: "Class Teacher",
      description: "Speak to your class teacher or academic coordinator",
    },
    {
      icon: "/images/grange/icons/help.png",
      title: "Help Center",
      description: "Use the Get Help option for immediate assistance",
    },
  ],
  ctaText: "Get Help Now",
  ctaLink: "#",
};

export const grangeFooterData = {
  logo: "/images/grange/logo.png",
  description:
    "This platform is part of GRANGE Schools' commitment to strong teaching, supported learning, and consistent academic progress.",
  quickLinks: [
    { label: "Grange Schools Website", href: "#" },
    { label: "Login", href: "#" },
    { label: "Support", href: "#" },
  ],
  poweredBy: {
    title: "Powered By",
    name: "Lextorah AI",
    description: "Advanced AI tutoring platform for academic excellence",
  },
  copyright: "© 2025 GRANGE Schools. All rights reserved.",
};

// Combined data export for page consumption
export const grangeSchoolsData = {
  navbar: grangeNavbarData,
  hero: grangeHeroData,
  forStudents: grangeForStudentsData,
  forTeachers: grangeForTeachersData,
  leadership: grangeLeadershipData,
  platformUsage: grangePlatformUsageData,
  integrity: grangeIntegrityData,
  support: grangeSupportData,
  footer: grangeFooterData,
};
