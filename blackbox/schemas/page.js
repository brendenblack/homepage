export default {
    name: 'page',
    title: 'Page basics',
    type: "document",
    fields: [
        {
            name: 'title',
            title: 'Page title',
            description: 'The page that this content should be displayed on',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'heading',
            title: 'Page heading',
            description: 'The H1 content of the page',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'A unique identifier',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: "summary",
            title: "Summary",
            description: "The summary of the page",
            type: 'blockContent',
        }
    ]
}