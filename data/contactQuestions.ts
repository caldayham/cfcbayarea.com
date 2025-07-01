const contactQuestions = [
  {
    id: "location",
    type: "choice",
    question: "Are you located in Palo Alto or the Bay Area?",
    options: ["yes", "no"]
  },
  {
    id: "project",
    type: "textarea",
    question: "Tell us about your project",
    placeholder: "Ex: Large redwood garden box for side yard, maybe 8 feet long."
  },
  {
    id: "name",
    type: "text",
    question: "Tell us about you",
    fields: [
      { id: "name", label: "Name", type: "text" },
      { id: "phone", label: "Phone", type: "tel" }
    ]
  }
];

export default contactQuestions;
