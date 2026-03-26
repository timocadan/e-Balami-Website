import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Adeegyada (Services)',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Ciwaanka (English)',
      type: 'string',
    }),
    defineField({
      name: 'title_so',
      title: 'Ciwaanka (Somali)',
      type: 'string',
    }),
    defineField({
      name: 'description_en',
      title: 'Faahfaahin (English)',
      type: 'text',
    }),
    defineField({
      name: 'description_so',
      title: 'Faahfaahin (Somali)',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Nooca Ikon-ka (Dooro)',
      type: 'string',
      options: {
        list: [
          { title: 'Medical (Diyaarad/Plane)', value: 'plane' },
          { title: 'Technical (Fure/Wrench)', value: 'wrench' },
          { title: 'Events (Jadwal/Calendar)', value: 'calendar' },
          { title: 'Car Rental (Gaari/Car)', value: 'car' },
          { title: 'Mobile App (Smartphone)', value: 'phone' },
        ],
      },
    }),
    defineField({
      name: 'comingSoon',
      title: 'Miyaa la sugayaa? (Coming Soon Mode)',
      type: 'boolean', // Kani waa switch (On/Off)
      initialValue: false,
    }),
  ],
})