export default {
  name: "log",
  title: "Log Entry",
  type: "document",
  fields: [
    { name: "date", title: "Date", type: "string", validation: (Rule) => Rule.required() },
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "body", title: "Body", type: "text", validation: (Rule) => Rule.required() },
  ],
  orderings: [{ title: "Date Desc", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
};
