export default {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: Rule => Rule.required()
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: "startDate",
            title: "Start date",
            type: "datetime",
            description: "When the project was undertaken",
            validation: Rule => Rule.required()
        },
        {
            name: "endDate",
            title: "End date",
            type: "datetime",
            description: "When the project was completed (leave blank for ongoing)"
        },
        {
            name: "place",
            title: "Place",
            type: "string"
        },
        {
            name: "summary",
            title: "Summary",
            type: 'blockContent',
            description: "A brief description of the project",
            validation: Rule => Rule.required()
        },
        {
            name: "description",
            title: "Project description",
            type: 'blockContent',
            description: "A thorough write up of the project"
        },
        {
            name: "projectType",
            title: "Project type",
            type: "string",
            options: {
                list: [
                    { value: "personal", title: "Personal" },
                    { value: "client", title: "Client" },
                ]
            }
        },
        {
            name: "link",
            type: "url",
        },
        {
            name: "tags",
            type: "array",
            of: [
                {
                    type: "string"
                }
            ],
            options: {
                layout: "tags",
            }
        },
        {
            name: 'disclaimer',
            title: 'Disclaimer',
            type: 'reference',
            to: {type: 'disclaimer'},
          }
    ]
}