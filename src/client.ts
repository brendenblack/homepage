import sanityClient, { SanityClient } from '@sanity/client';


export default sanityClient({
    projectId: process.env.REACT_APP_PROJECT_ID ?? "",
    dataset: "production"
});


export class sanityService {
    constructor() {
        this.client = sanityClient({
            projectId: process.env.REACT_APP_PROJECT_ID ?? "",
            dataset: "production"
        });
    }

    client: SanityClient;
    

    getProjectSummaries(): Promise<ProjectSummary[]> {
        return this.client.fetch(`*[_type == "project"]{
            title,
            slug,
            date,
            place,
            projectType,
            tags
        }`); 
    }
}

export interface ProjectSummary {
    title: string,
    slug: string,
    date: Date,
    projectType: string;
    tags: string[]
}