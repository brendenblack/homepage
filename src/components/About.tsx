import { useEffect, useState } from "react";
import sanityClient from "../client";
import './About.css';
import BlockContent from '@sanity/block-content-to-react';

export default function About() {
    const [ aboutSections, setAboutSections ] = useState<[]>([]);
    
    useEffect(() => {
        sanityClient.fetch(`*[_type == "about"]{
            title,
            slug,
            content,
            orderWeight
        }`)
        .then((data) => {
            console.log('about sections', data);
            setAboutSections(data.sort((a: {orderWeight: number}, b: { orderWeight: number }) => a.orderWeight > b.orderWeight));
        })
        .catch(console.error);
    }, []);

    return (
        <div className="page bg-gray-200 pt-8">
            <div className="container mx-auto">
                <header>
                    <h1 className="text-5xl branding-text text-gray-700">About me &amp; thoughts</h1>
                </header>
                <div className=" flex flex-row">
                    <nav className="h-full sticky top-0 p-8 bg-indigo-50 border rounded-sm border-grey-500 shadow-xl flex flex-col mt-8 ">
                        <ol className="space-y-8">
                        {aboutSections.map((section: any, index: number) => {
                            return (
                                <li key={index}><a href={`#${section.slug.current}`} className="text-gray-800 hover:text-white font-mono font-bold">{section.title}</a></li>
                            );
                        })}
                        </ol>
                    </nav>
                    <main className="ml-16 mt-8 flex-grow space-y-12">
                        {aboutSections.map((section: any, index) => {
                            return (
                                <article id={section.slug.current} key={index}>
                                    <header>
                                        <h2 className="text-2xl text-gray-700 branding-text">{section.title}</h2>
                                    </header>
                                    <section className="prose max-w-3xl">
                                        <BlockContent blocks={section.content} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                                    </section>
                                </article>
                            );
                        })}
                    </main>
                </div>
            </div>
        </div>
    );    
}
