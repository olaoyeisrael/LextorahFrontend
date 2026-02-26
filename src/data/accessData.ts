export const requestAccessData = {
  hero: {
    title: "Request Institutional Access",
    subtitle:
      "Use this form to request institutional access to Lextorah Education as a Learner or Tutor",
  },
  form: {
    sections: [
      {
        number: 1,
        icon: "/icons/access-role.png",
        title: "Access Role",
        description: "I am applying as:",
        type: "radio",
        name: "accessRole",
        required: true,
        options: [
          { value: "learner", label: "Learner" },
          { value: "tutor", label: "Tutor" },
        ],
      },
      {
        number: 2,
        icon: "/icons/institution-2.png",
        title: "Institution Details",
        type: "mixed",
        fields: [
          {
            name: "institutionName",
            label: "Institution/School Name",
            type: "text",
            required: true,
            placeholder: "",
          },
          {
            name: "institutionType",
            label: "Institution Type",
            type: "radio",
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
            placeholder: "",
          },
        ],
      },
      {
        number: 3,
        icon: "/icons/personal.png",
        title: "Personal Details",
        type: "fields",
        fields: [
          {
            name: "fullName",
            label: "Full Name",
            type: "text",
            required: true,
            placeholder: "",
          },
          {
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
            placeholder: "",
          },
          {
            name: "phone",
            label: "Phone Number (WhatsApp)",
            type: "tel",
            required: true,
            placeholder: "",
          },
        ],
      },
      {
        number: 4,
        icon: "/icons/purpose.png",
        title: "Purpose of Access",
        description: "Select all that apply:",
        type: "checkbox",
        name: "purposeOfAccess",
        required: false,
        options: [
          { value: "language-programmes", label: "Language Programmes" },
          { value: "exam-preparation", label: "Exam Preparation" },
          { value: "academic-curriculum", label: "Academic Curriculum" },
          { value: "pathway-programmes", label: "Pathway Programmes" },
        ],
      },
      {
        number: 5,
        icon: "/icons/confirmation.png",
        title: "Institutional Confirmation",
        description: "Institution aware of this request?",
        type: "radio",
        name: "institutionAware",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "pending", label: "Pending" },
        ],
      },
      {
        number: 6,
        icon: "/icons/consent.png",
        title: "Consent",
        type: "consent",
        name: "consent",
        required: true,
        label:
          "I confirm the information provided is accurate and consent to be contacted.",
      },
    ],
    submitButton: "Request Access",
  },
};