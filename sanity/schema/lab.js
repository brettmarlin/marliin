export default {
  name: "lab",
  title: "Lab Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "status", title: "Status", type: "string", validation: (Rule) => Rule.required() },
    { name: "desc", title: "Description", type: "text", validation: (Rule) => Rule.required() },
    { name: "cap", title: "Capabilities", type: "string" },
    { name: "link", title: "Link", type: "url" },
  ],
  orderings: [{ title: "Title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] }],
};
