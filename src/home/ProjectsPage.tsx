import React, { useState, useEffect } from "react";
import sanityClient from '../client';
import BlockContent from '@sanity/block-content-to-react';
import { prefix } from "./homeRoutes";
import Tag from "./Tag";

const monthNames = [ 
    "January", 
    "February", 
    "March", 
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December" 
];

export default function ProjectsPage() {
    const [ projectData, setProjectData ] = useState<any[]>([]);
    useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
            title,
            slug,
            startDate,
            summary,
            place,
            projectType,
            tags,
            "image": icon.asset->url
        }`)
        .then((data) => {
            console.debug(data);
            setProjectData(data?.sort((a: {startDate: string},b: {startDate: string}) => Date.parse(b.startDate) - Date.parse(a.startDate)) ?? []);
        })
        .catch(console.error);
    }, []);
    
    return (
        <div className="page">
            <div className="container">
                <header className="py-8">
                    <h1>Project write-ups</h1>
                </header>
            <main className="space-y-8">
                {projectData && projectData.map((project: any, index: number) => {
                    const startDate = new Date(project.startDate);
                    return (          
                        <article key={index}>
                            <a href={`${prefix}/projects/${project.slug?.current}`} className="flex flex-row group">
                                <div className="mr-4 hidden md:block">
                                    <img src={project.image} className="h-32" alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <div className=""><h2 className="group-hover:text-orange-400">{project.title}</h2></div>
                                    <div className="flex-grow prose">
                                        <BlockContent 
                                                blocks={project.summary} 
                                                projectId={process.env.REACT_APP_PROJECT_ID} 
                                                dataset="production" />
                                    </div>


                                    <section className="space-x-2 mt-2">
                                        {project.tags.map((tag: string, index: number) => {
                                            return <Tag value={tag} key={index} />
                                        })}
                                    </section>
                                </div>
                            </a>
                        </article>                  
                        // <article className="h-full max-w-screen lg:max-w-2xl border border-gray-200 hover:border-orange-400 shadow-xl hover:shadow-2xl rounded-sm" key={index}>
                        //     <a href={`${prefix}/projects/${project.slug?.current}`}
                        //         className=""
                        //         key={index}>
                        //         <div className="px-2 pt-2 lg:px-4 lg:pt-4 space-y-4 flex flex-col h-full">
                        //     <header>
                        //         <h3 className="bg-orange-400 text-gray-900 px-2 inline-block text-xl home-font-branding">{project.title}</h3>
                        //     </header>
                        //     <section className="px-2 prose text-gray-800 flex-grow">
                        //         <BlockContent 
                        //             blocks={project.summary} 
                        //             projectId={process.env.REACT_APP_PROJECT_ID} 
                        //             dataset="production" />
                        //     </section>
                        //     <section className="space-x-2">
                        //         {project.tags.map((tag: string, index: number) => {
                        //             return <div className="inline-block text-xs border rounded-sm px-1 border-orange-400 text-orange-400">{tag}</div>
                        //         })}
                        //     </section>
                        //     <footer className="flex justify-end" style={{ marginBottom: '-1px' }}>
                        //         <div className="bg-orange-400 inline-block mr-2 lg:mr-4 leading-6 px-2 justify-center text-gray-800 home-font-branding rounded-t-sm">
                        //             <span className="block text-sm text-center">{monthNames[startDate.getMonth()]}</span>
                        //             <span className="block text-md font-bold text-center">{startDate.getFullYear()}</span>
                        //         </div>
                        //     </footer>
                        //     </div>
                        //     </a>
                        // </article>
                    );
                })}
            </main>
            </div>
        </div>
    );
}