import sanityClient from '../client';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from '../components/Loading';
import ProjectDescription from '../components/ProjectDescription';
import { prefix } from './homeRoutes';


export default function ProjectDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const [ project, setProject ] = useState<any|null|undefined>(null);
    const [ isLoading, setLoading ] = useState(false);
    const [ error, setError ] = useState<Error | null>(null);
    
    useEffect(() => {
        setLoading(true);
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            place,
            description[]{
                ...,
                markDefs[]{
                    ...,
                    _type == "internalProjectLink" => {
                        "slug": @.reference->slug
                    }
                }
            },
            disclaimer->{
                description
            },
        }`)
        .then((data) => {
            console.log('data', data);
            if (data.length > 0) {
                setProject(data[0]);
            } else {
                throw new Error(`No project with a slug of ${slug} was found`);
            }
        })
        .catch((e: Error) => {
            console.error(e);
            setError(e);
        })
        .finally(() => setLoading(false));
    }, [ slug ]);

    if (isLoading) {
        return <Loading />
    } else if (project) {
        return (
            <div className="page">
                <div className="container py-8">
                <header className="">
                    <h1 className="text-4xl lg:text-6xl home-font-branding text-gray-800">{project.title}</h1>
                    <h2 className="text-2xl lg:text-3xl home-font-branding text-gray-600">{project.place}</h2>
                </header>
                <main className="">
                    {project.disclaimer && 
                        <aside className="bg-blue-50 border-solid border-2 border-blue-100 rounded-sm p-2 mt-4 text-gray-700 text-sm md:text-base">
                            {project.disclaimer.description}
                        </aside>
                    }
                    <article className="prose max-w-3xl mx-auto">
                        {/* <BlockContent blocks={project.description} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production"  /> */}
                        <ProjectDescription blocks={project.description} />
                    </article>
                    <footer className="flex justify-end">
                        <a href={`${prefix}/projects`} className="text-orange-400 py-6 home-font-brand" >Return to projects</a>
                    </footer>
                </main>
                </div>
            </div>
        );
    } else if (error) {
        return (
            <div className="page bg-red-400">
                <main className="container mx-auto mt-16 text-gray-900 space-y-4">
                    <h2 className="text-4xl font-bold">I've made a huge mistake</h2>
                    <p className="text-lg">No project with slug <span className="font-mono font-bold">{slug}</span> was found.</p>
                    <p className="text-md text-gray-800">{error.message}</p>
                    <p><a href={`${prefix}/projects`} className="text-gray-200 hover:underline">Go back to projects</a></p>
                </main>
                <footer></footer>
            </div>
        );
    } else {
        // TODO: I'm not really sure why this condition ever happens
        return <div className="page bg-gray-200"></div>
    }
}