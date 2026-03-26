import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Macaamiisha (Reviews)', // Magaca aad Dashboard-ka ku arki doonto
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Magaca Qofka',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Shaqada/Darajada (Role)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Sawirka Qofka',
      type: 'image',
      options: {
        hotspot: true, // Tani waxay kuu sahlaysaa inaad sawirka qayb ka goyso (Crop)
      },
    }),
    defineField({
      name: 'quote_en',
      title: 'Hadalka (English)',
      type: 'text',
    }),
    defineField({
      name: 'quote_so',
      title: 'Hadalka (Somali)',
      type: 'text',
    }),
  ],
})