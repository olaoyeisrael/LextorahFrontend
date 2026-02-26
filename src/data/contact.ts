// Contact Hero
export const contactHeroContent = {
  title: "Get in Touch with Lextorah Education",
  subtitle:
    "We're here to support your learning journey and answer any questions about our programmes, pathways, and partnerships.",
};

// Contact Cards
export const contactCards = [
  {
    icon: "/icons/mail.png",
    title: "General Enquiries",
    description: "For questions about our programmes, admissions, or services.",
    contacts: [
      { icon: "/icons/mail-2.png", type: "email", value: "admin@lextorah.com" },
      { icon: "/icons/phone.png", type: "phone", value: "+234 913 488 9722" },
      { icon: "/icons/whatsapp.png", type: "phone", value: "+234 903 063 8306" },
      { icon: "/icons/period.png", type: "hours", value: "Monday – Friday\n9:00 AM – 5:00 PM (WAT)" },
    ],
  },
  {
    icon: "/icons/admissions.png",
    title: "Admissions & Pathway Programmes",
    description:
      "For enquiries related to language programmes, exam preparation, academic curricula, and pathway programmes.",
    contacts: [{ icon: "/icons/mail-2.png", type: "email", value: "admissions@lextorah.com" }],
  },
  {
    icon: "/icons/partnerships.png",
    title: "Partnerships & Institutional Collaboration",
    description:
      "For universities, accreditation bodies, organisations, and strategic partners.",
    contacts: [{ icon: "/icons/mail-2.png", type: "email", value: "partnerships@lextorah.com" }],
  },
  {
    icon: "/icons/support.png",
    title: "Learning Technology & Platform Support",
    description: "For technical assistance or platform-related questions.",
    contacts: [{ icon: "/icons/mail-2.png", type: "email", value: "support@lextorah.com" }],
  },
  {
    icon: "/icons/location.png",
    title: "Visit Us",
    description: "",
    contacts: [
      {
        type: "address",
        label: "Lextorah Education",
        value: "4th Floor, 47 Montgomery Road, Yaba,\nLagos, Nigeria",
      },
      { type: "note", value: "(Visits by appointment only)" },
    ],
  },
];

// Contact Form
export const contactFormData = {
  title: "Send Us a Message",
  subtitle:
    "Have a question or request? Please complete the contact form below and a member of our team will respond as soon as possible.",
  fields: {
    fullName: { label: "Full Name", placeholder: "Enter your full name", required: true },
    email: { label: "Email Address", placeholder: "your.email@example.com", required: true },
    phone: { label: "Phone Number", placeholder: "+234 XXX XXX XXXX", required: true },
    areaOfInterest: {
      label: "Area of Interest",
      placeholder: "Select an option",
      required: true,
      options: [
        "Language Programmes",
        "Exam Preparation",
        "Academic Curricula",
        "Pathway Programmes",
        "Partnerships",
        "Technical Support",
        "Other",
      ],
    },
    message: {
      label: "Message",
      placeholder: "Please share your question or message here (max 500 characters)",
      required: true,
      maxLength: 500,
    },
  },
  submitButton: "Send Message",
};

// Stay Connected
export const stayConnectedData = {
  title: "Stay Connected",
  subtitle: "Follow Lextorah Education for updates, insights, and announcements",
  socialLinks: [
    { name: "LinkedIn", href: "https://linkedin.com/company/lextorah", icon: "linkedin" },
    { name: "Instagram", href: "https://instagram.com/lextorah", icon: "instagram" },
    { name: "X (Twitter)", href: "https://x.com/lextorah", icon: "twitter" },
    { name: "Facebook", href: "https://facebook.com/lextorah", icon: "facebook" },
  ],
};

// Brand Banner
export const brandBannerData = {
  title: "Lextorah Education",
  tagline: "Education Built for Global Access.",
};