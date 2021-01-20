import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import sanityClient from '../client';
import Loading from './Loading';
import BlockContent from '@sanity/block-content-to-react';
import { prefix } from './routes';

export default function Project() {
    const { slug } = useParams<{ slug: string }>();
    const [ project, setProject ] = useState<any|null|undefined>(null);
    const [ isLoading, setLoading ] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            place,
            description,
            disclaimer->{
                description
            },
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body
        }`)
        .then((data) => {
            console.log('data', data);
            if (data.length > 0) {
                setProject(data[0]);
            } else {
                throw new Error(`No project with a slug of ${slug} was found`);
            }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, [ slug ]);

    if (isLoading) {
        return <Loading />
    } else if (project) {
        return (
            <div className="page pt-8 lg:pt-16 px-8 lg:px-32 bg-gray-200">
                <header className="">
                    <h1 className="text-4xl lg:text-6xl branding-text text-gray-800">{project.title}</h1>
                    <h2 className="text-2xl lg:text-3xl branding-text text-gray-600">{project.place}</h2>
                </header>
            
            {project.disclaimer && 
                <aside className="bg-blue-100 border-solid border-2 border-blue-200 rounded-sm p-2 my-4 text-gray-600 text-sm">
                    {project.disclaimer.description}
                </aside>
            }
            <section className="prose max-w-none">
                <BlockContent blocks={project.description} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
            </section>
            </div>
        );
    } else {
        return (
            <div className="page bg-red-400">
                <main className="container mx-auto mt-16 text-gray-900 space-y-4">
                    <h2 className="text-4xl font-bold">Not found</h2>
                    <p className="text-lg">No project with slug <span className="font-mono font-bold">{slug}</span> was found.</p>
                    <p><a href={`${prefix}/projects`} className="text-gray-200 hover:underline">Go back to projects</a></p>
                </main>
                
            </div>
        );
    }

    
}