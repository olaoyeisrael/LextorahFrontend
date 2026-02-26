export const bookDemoData = {
  hero: {
    icon: "calendar",
    title: "Book a Demo",
    subtitle: "Institutional Demo Request",
    description:
      "Request a quick demo of Ms. Lexi, Lextorah's AI tutoring platform for learner support, personalised learning, and academic performance.",
  },
  form: {
    sections: [
      {
        number: 1,
        icon: "/icons/institution-2.png",
        title: "Institution",
        type: "mixed",
        fields: [
          {
            name: "institutionName",
            label: "Institution Name",
            type: "text",
            required: true,
            placeholder: "Enter institution name",
          },
          {
            name: "institutionType",
            label: "Institution Type",
            type: "checkbox-grid",
            required: true,
            options: [
              { value: "school", label: "School" },
              { value: "college-university", label: "College/University" },
              { value: "training-centre", label: "Training Centre" },
              { value: "organisation", label: "Organisation" },
              { value: "other", label: "Other" },
            ],
          },
          {
            name: "country",
            label: "Country",
            type: "text",
            required: true,
            placeholder: "Enter country",
          },
        ],
      },
      {
        number: 2,
        icon: "/icons/personal.png",
        title: "Contact Person",
        type: "fields",
        fields: [
          {
            name: "fullName",
            label: "Full Name",
            type: "text",
            required: true,
            placeholder: "Enter your full name",
          },
          {
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
            placeholder: "your.email@institution.edu",
          },
          {
            name: "phone",
            label: "Phone Number (WhatsApp)",
            type: "tel",
            required: true,
            placeholder: "+1 234 567 8900",
          },
        ],
      },
      {
        number: 3,
        icon: "/icons/focus.png",
        title: "Demo Focus",
        description: "Select all that apply:",
        type: "checkbox",
        name: "demoFocus",
        required: false,
        options: [
          { value: "ai-tutoring", label: "AI Tutoring for Learners" },
          { value: "exam-support", label: "Exam & Academic Support" },
          { value: "teacher-augmentation", label: "Tutor / Teacher Augmentation" },
          { value: "learning-analytics", label: "Learning Analytics" },
        ],
      },
      {
        number: 4,
        icon: "/icons/scale.png",
        title: "Learner Scale",
        description: "Approx. Number of Learners",
        type: "radio",
        name: "learnerScale",
        required: true,
        options: [
          { value: "under-100", label: "Under 100" },
          { value: "100-500", label: "100–500" },
          { value: "500-plus", label: "500+" },
        ],
      },
      {
        number: 5,
        icon: "/icons/format.png",
        title: "Preferred Demo Format",
        type: "radio",
        name: "demoFormat",
        required: true,
        options: [
          { value: "online", label: "Online" },
          { value: "in-person", label: "In-person (where available)" },
        ],
      },
      {
        number: 6,
        icon: "/icons/confirmation.png",
        title: "Consent",
        type: "consent",
        name: "consent",
        required: true,
        label:
          "I confirm that the information provided is accurate and consent to be contacted by Lextorah Education regarding this demo of Ms. Lexi.",
      },
    ],
    submitButton: "Book Demo",
  },
};