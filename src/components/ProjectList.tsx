import React, { useState, useEffect} from 'react';
import sanityClient from '../client';
import { prefix } from './routes';
import BlockContent from '@sanity/block-content-to-react';
import { CgArrowRightR } from "react-icons/cg";

function dateFormat(date: Date): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

    if (date) {
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    } else {
        return "";
    }
}

export default function ProjectList() {
    const [ projectData, setProjectData ] = useState<any[]>([]);
    useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
            title,
            slug,
            startDate,
            summary,
            place,
            projectType,
            tags
        }`)
        .then((data) => {
            console.debug(data);
            setProjectData(data?.sort((a: {startDate: string},b: {startDate: string}) => Date.parse(b.startDate) - Date.parse(a.startDate)) ?? []);
        })
        .catch(console.error);
    }, []);

    return (
        <div className="page bg-gray-50 pt-8 px-4">
            <div className="container mx-auto">
                <header>
                    <h1 className="text-gray-700">Projects</h1>
                    <nav>
                        {/* TODO: filtering */}
                    </nav>
                    {/* <p className="text-base text-gray-700">A collection of projects</p> */}
                </header>
                {/* <h2 className="text-lg text-gray-600">These are the projects</h2> */}
                <main className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-6">
                    {projectData && projectData.map((project: any, index: number) => {
                        return (
                            <article className="flex flex-col rounded-sm shadow-xl bg-indigo-50 border border-indigo-500 p-8 space-y-4" key={index}>
                                <header>
                                    <h3 className="text-gray-800 text-xl lg:text-2xl mb-2 font-secondary">
                                        <a href={`${prefix}/projects/${project.slug?.current}`} className="hover:text-indigo-500">{project.title}</a>
                                    </h3>
                                    <div className="text-gray-500 xl:text-xs space-x-4">
                                        <span>
                                            <strong className="font-bold">{dateFormat(new Date(project.startDate))}</strong>
                                        </span>
                                    </div>
                                </header>
                                <section className="prose flex-grow">
                                    <BlockContent blocks={project.summary} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                                </section>

                                <aside className="flex flex-row flex-wrap">
                                        {project.tags.map((tag:string, index: number) => {
                                        return (<div key={index} style={{ borderWidth: 1 }} className="p-1 mr-2 mb-2 text-xs rounded-sm border-gray-400 bg-gray-200 text-gray-800 inline-block" >{tag}</div>)
                                    })}
                                </aside>
                                <footer className="flex justify-end">    
                                    <a href={`${prefix}/projects/${project.slug?.current}`} className="text-indigo-600 font-bold hover:text-indigo-400">
                                        View the write up <CgArrowRightR className="inline-block" />
                                    </a>
                                </footer>
                            </article>);
                    })}
                </main>
            </div>
        </div>
    );
}

// target="_blank" rel="noopener noreferrer"