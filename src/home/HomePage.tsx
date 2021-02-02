import sanityClient from "../client";
import { useState, useEffect } from "react";
import { prefix } from "./homeRoutes";
import Tag from "./Tag";
import BlockContent from '@sanity/block-content-to-react';
import office from '../images/office-5594741.svg';

const defaultPageData: any = { 
    heading: "Software is eating the world",
    summary: '',
};

export default function HomePage() {
    const [ pageData, setPageData ] = useState<any>(defaultPageData);
    const [ projectData, setProjectData ] = useState<any[]>([]);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "page" && title == "Home"]{
            heading,
            summary
        }`)
        .then((data) => {
            console.log('Page data', data[0]);
            setPageData(data[0])
        })
        .catch(console.error);
    }, []);

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
        <div className="page">
            <section className="hero bg-white py-8">
                <div className="container grid gap-4 grid-cols-1 md:grid-cols-2 ">
                    <span className="flex justify-center">
                        <img alt="logo" src={office} className="w-full h-full object-cover" />
                    </span>

                    <main className="p-8">
                        <h1 className="home-font-branding text-6xl text-gray-900">{pageData?.heading ?? ''}</h1>
                        <p className="home-font-branding text-xl text-gray-800">
                            <BlockContent blocks={pageData?.summary ?? []} projectId={process.env.REACT_APP_PROJECT_ID} dataset={process.env.REACT_APP_SANITY_DATASET} />
                        </p>
                    </main>
                </div>
            </section>

            <section className="bg-orange-400 py-16" style={{ minHeight: 128 }}>
                <div className="container flex flex-row">
                    <div className="pr-4 md:pr-16">
                        <a href={`${prefix}/projects`}><h2 className="text-white">Project write-ups</h2></a>
                    </div>
                    <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {projectData.map((project: any, index: number) => {
                            return (
                                <article key={index} className="border-l-2 border-transparent hover:border-white px-2">
                                    <a href={`${prefix}/projects/${project.slug}`} >
                                        <h3 className="text-white text-base md:text-lg">{project.title}</h3>
                                        <div className="flex flex-row flex-wrap">
                                            {project.tags.map((tag:string, index: number) => {
                                                return <Tag value={tag} inverted key={index} />
                                            })}
                                        </div>
                                    </a>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
            
            {/* <section className="bg-white" style={{ height: 200 }}>
                <div className="container">
                   
                </div>
            </section> */}
            
            {/* <section className="bg-gray-700" style={{ height: 200 }}>
                <div className="container">

                </div>
            </section> */}
            
        </div>
    )
}