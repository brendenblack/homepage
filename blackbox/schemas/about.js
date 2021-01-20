export default {
    name: 'about',
    title: 'About',
    type: "document",
    fields: [
        {
            name: 'title',
            title: 'About section title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'For creating on-page anchor links',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: "content",
            title: "Content",
            type: 'blockContent',
        },
        {
            name: 'orderWeight',
            title: 'Ordering weight',
            description: 'Sections with higher weights will sort towards the bottom, ties are sorted alphabetically by title',
            type: 'number'
        }
    ]
}