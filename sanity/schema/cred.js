export default {
  name: "cred",
  title: "Credential",
  type: "document",
  fields: [
    { name: "name", title: "Company Name", type: "string", validation: (Rule) => Rule.required() },
    { name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() },
  ],
  orderings: [{ title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] }],
};
