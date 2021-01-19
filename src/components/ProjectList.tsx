import React, { useState, useEffect} from 'react';
import sanityClient from '../client';

export default function ProjectList() {
    const [ projectData, setProjectData ] = useState<any | null>(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
            title,
            date,
            place,
            description,
            projectType,
            link,
            tags
        }`).then((data) => setProjectData(data))
        .catch(console.error);
    }, []);

    return (
        <main className="bg-gray-100 min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center">Projects</h1>
                <h2 className="text-lg text-gray-600 flex justify-center">These are the projects</h2>
                <section className="grid grid-cols-2 gap-8 mt-6">
                    {projectData && projectData.map((project: any, index: number) => {
                        return (
                            <article className="relative rounded-lg shadow-xl bg-white p-16">
                                <h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-indigo-400">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a></h3>
                                <div className="text-gray-500 text-xs space-x-4">
                                    <span>
                                        <strong className="font-bold">Finished on: </strong>{new Date(project.date).toLocaleDateString()}
                                    </span>
                                    <span>
                                        <strong className="font-bold">Company: </strong>{project.place}
                                    </span>
                                    <span>
                                        <strong className="font-bold">Type: </strong>{project.projectType}
                                    </span>
                                    <p className="my-6 text-lg text-gray-700 leading-relaxed">
                                        {project.description}
                                    </p>
                                    
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-bold hover:underline hover:text-indigo-300">
                                        View the project <span role="img" aria-label="right pointer" className="">&gt;</span>
                                    </a>
                                </div>
                            </article>);
                    })}
                </section>
            </section>
        </main>
    );
}