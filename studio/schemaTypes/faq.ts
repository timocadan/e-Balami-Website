import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'Su\'aalaha (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question_en',
      title: 'Su\'aasha (English)',
      type: 'string',
    }),
    defineField({
      name: 'answer_en',
      title: 'Jawaabta (English)',
      type: 'text',
    }),
    defineField({
      name: 'question_so',
      title: 'Su\'aasha (Somali)',
      type: 'string',
    }),
    defineField({
      name: 'answer_so',
      title: 'Jawaabta (Somali)',
      type: 'text',
    }),
  ],
})