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
        <div className="page bg-gray-50 p-4 lg:p-16">
            <header>
                <nav>
                    {/* TODO: filtering */}
                </nav>
            </header>
            {/* <h2 className="text-lg text-gray-600">These are the projects</h2> */}
            <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
                {projectData && projectData.map((project: any, index: number) => {
                    const startDate = new Date(project.startDate);
                    return (
                        
                            
                            <article className="h-full max-w-screen lg:max-w-2xl bg-gray-100 border border-gray-200 hover:border-indigo-200 shadow-xl hover:shadow-2xl rounded-sm">
                                <a href={`${prefix}/projects/${project.slug?.current}`}
                                    className=""
                                    key={index}>
                                    <div className="px-2 pt-2 lg:px-4 lg:pt-4 space-y-4 flex flex-col h-full">
                                <header>
                                    <h3 className="bg-indigo-100 text-gray-800 px-2 inline-block text-2xl">{project.title}</h3>
                                </header>
                                <section className="px-2 prose text-gray-800 flex-grow">
                                    <BlockContent 
                                        blocks={project.summary} 
                                        projectId={process.env.REACT_APP_PROJECT_ID} 
                                        dataset="production" />
                                </section>
                                <footer className="flex justify-end">
                                    <div className="bg-indigo-200 inline-block mr-2 lg:mr-4 leading-6 px-2 justify-center text-gray-800">
                                        <span className="block text-sm text-center">{monthNames[startDate.getMonth()]}</span>
                                        <span className="block text-md font-bold text-center">{startDate.getFullYear()}</span>
                                    </div>
                                </footer>
                                </div>
                                </a>
                            </article>
                        
                        // <article className="flex flex-col rounded-sm shadow-xl bg-indigo-50 border border-indigo-500 p-8 space-y-4" key={index}>
                        //     <header>
                        //         <h3 className="text-gray-800">
                        //             <a href={`${prefix}/projects/${project.slug?.current}`} className="hover:text-indigo-500">{project.title}</a>
                        //         </h3>
                        //         <div className="text-gray-500 xl:text-xs space-x-4">
                        //             <span>
                        //                 <strong className="">{dateFormat(new Date(project.startDate))}</strong>
                        //             </span>
                        //         </div>
                        //     </header>
                        //     <section className="prose flex-grow">
                        //         <BlockContent blocks={project.summary} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                        //     </section>

                        //     <aside className="flex flex-row flex-wrap">
                        //             {project.tags.map((tag:string, index: number) => {
                        //             return (<div key={index} style={{ borderWidth: 1 }} className="p-1 mr-2 mb-2 text-xs rounded-sm border-gray-400 bg-gray-200 text-gray-800 inline-block" >{tag}</div>)
                        //         })}
                        //     </aside>
                        //     <footer className="flex justify-end">    
                        //         <a href={`${prefix}/projects/${project.slug?.current}`} className="text-indigo-600 font-bold hover:text-indigo-400">
                        //             View the write up <CgArrowRightR className="inline-block" />
                        //         </a>
                        //     </footer>
                        // </article>
                    );
                })}
            </main>

        </div>
    );
}

// target="_blank" rel="noopener noreferrer"