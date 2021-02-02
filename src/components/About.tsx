import { useEffect, useState } from "react";
import sanityClient from "../client";
import './About.css';
import BlockContent from '@sanity/block-content-to-react';

export default function About() {
    const [ aboutSections, setAboutSections ] = useState<[]>([]);
    const [ authorProfile, setAuthorProfile ] = useState<any>(null);
    const authorSlug = 'brenden';
    useEffect(() => {
        sanityClient.fetch(`*[_type == "about"]{
            title,
            slug,
            content,
            orderWeight
        }`)
        .then((data) => {
            console.log('about sections', data);
            setAboutSections(data.sort((a: {orderWeight: number}, b: { orderWeight: number }) => a.orderWeight <= b.orderWeight));
        })
        .catch(console.error);
    }, []);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "author" && slug.current == "${authorSlug}"]{
            _type,
            slug,
            bio
        }`)
        .then((data) => {
            console.log('author profile', data);
            if (data.length > 0) {
                setAuthorProfile(data[0]);
            }
        })
        .catch(console.error);
    }, []);

    return (
        <div className="page">
            {authorProfile && 
                <main className="bio w-full bg-indigo-50 p-8 lg:p-16">
                    <article className="prose lg:max-w-4xl xl:max-w-5xl mx-auto">
                        <BlockContent blocks={authorProfile.bio} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                    </article>
                </main>
            }

            {aboutSections &&
                <section className="mx-auto p-8 lg:p-16">
                    <header className="space-y-4 anchored-section lg:max-w-4xl xl:max-w-5xl lg:mx-auto">
                        <a id="top" className="anchor"> </a>
                        <h2 className="text-gray-700">Formative influences</h2>
                        <p className="text-gray-700">There are a number of concepts that have had a profound impact on the way that I think, and the way I approach work. 
                        Collected here are a few those concepts in bite size format.</p>
                        <nav>
                            <ol className="thoughts">
                                {aboutSections.map((section: any, index: number) => {
                                    return (
                                        <li key={index} className="inline-block"><a href={`#${section.slug.current}`} className="text-sm text-indigo-400 hover:underline font-secondary">{section.title}</a></li>
                                    );
                                })}
                            </ol>
                        </nav>
                    </header>
                    <div className="flex flex-row">
                        <section className="mt-8 flex-grow space-y-12 lg:max-w-4xl xl:max-w-5xl mx-auto">
                            {aboutSections.map((section: any, index) => {
                                return (
                                    <article key={index} className="anchored-section">
                                        <a id={section.slug.current} className="anchor"> </a>
                                        <header>
                                            <h3 className="text-gray-700">{section.title}</h3>
                                        </header>
                                        
                                        <section className="prose lg:max-w-4xl xl:max-w-5xl">
                                            <BlockContent blocks={section.content} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                                        </section>
                                        <footer className="mt-4 flex justify-end">
                                            <a href="#top" className="text-xs text-indigo-400">Back to top</a>
                                        </footer>
                                    </article>
                                );
                            })}
                        </section>
                    </div>
                </section>
            }
        </div>
    );    
}
