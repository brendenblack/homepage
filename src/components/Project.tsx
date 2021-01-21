import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import sanityClient from '../client';
import Loading from './Loading';
import { prefix } from './routes';
import ProjectDescription from './ProjectDescription';

export default function Project() {
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
            <div className="page pt-8 lg:pt-16 px-8 lg:px-32 bg-gray-200">
                <header className="">
                    <h1 className="text-4xl lg:text-6xl font-branding text-gray-800">{project.title}</h1>
                    <h2 className="text-2xl lg:text-3xl font-branding text-gray-600">{project.place}</h2>
                </header>
                <main className="max-w-4xl">
            
                    {project.disclaimer && 
                        <aside className="bg-blue-100 border-solid border-2 border-blue-200 rounded-sm p-2 my-4 text-gray-600 text-sm">
                            {project.disclaimer.description}
                        </aside>
                    }
                    <article className="prose max-w-4xl">
                        {/* <BlockContent blocks={project.description} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production"  /> */}
                        <ProjectDescription blocks={project.description} />
                    </article>
                    <footer className="flex justify-end">
                        <a href={`${prefix}/projects`} className="text-indigo-500 text-lg py-6 font-bold" >Return to projects</a>
                    </footer>
                </main>
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