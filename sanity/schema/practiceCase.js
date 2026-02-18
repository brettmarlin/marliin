export default {
  name: "practiceCase",
  title: "Practice Case",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "desc", title: "Description", type: "text", validation: (Rule) => Rule.required() },
  ],
  orderings: [{ title: "Title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] }],
};
