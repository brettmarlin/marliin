export default {
  name: 'heroWords',
  title: 'Hero Rotating Words',
  type: 'document',
  fields: [
    {
      name: 'words',
      title: 'Words',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Words that rotate in the hero headline. Drag to reorder.',
    },
  ],
}
