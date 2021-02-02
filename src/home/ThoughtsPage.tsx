import { useEffect, useState } from "react";
import sanityClient from "../client";
import BlockContent from '@sanity/block-content-to-react';

export default function ThoughtsPage() {
    
    const [ thoughts, setThoughts ] = useState<[]>([]);
    const [ loading, setLoading ] = useState(false);


    useEffect(() => {
        setLoading(true);

        sanityClient.fetch(`*[_type == "about"]{
            title,
            slug,
            content,
            orderWeight
        }`)
        .then((data) => {
            // console.log('about sections', data);
            setThoughts(data.sort((a: {orderWeight: number}, b: { orderWeight: number }) => a.orderWeight <= b.orderWeight));
        })
        .catch(console.error)
        .finally(() => {
            setLoading(false);
        })
    }, []);

    return (
    <div className="page">
        {thoughts &&
                <section className="mx-auto p-8 lg:px-16">
                    <header className="space-y-4 anchored-section lg:max-w-4xl xl:max-w-5xl lg:mx-auto">
                        <a id="top" className="anchor"> </a>
                        <h1 className="text-gray-900">Thoughts</h1>
                        <p className="text-gray-700">
                            This is a collection of concepts that have had a profound impact on the way that I think and approach work.
                            They're collected and published here to let you see in my brain, but mostly to catalogue for my own reference.
                        </p>

                        <nav>
                            <ol className="thoughts">
                                {thoughts.map((section: any, index: number) => {
                                    return (
                                        <li key={index} className="inline-block"><a href={`#${section.slug.current}`} className="text-orange-400 hover:underline font-secondary">{section.title}</a></li>
                                    );
                                })}
                            </ol>
                        </nav>
                    </header>

                    <div className="flex flex-row">
                        <section className="mt-8 flex-grow space-y-12 lg:max-w-4xl xl:max-w-5xl mx-auto">
                            {thoughts.map((section: any, index) => {
                                return (
                                    <article key={index} className="anchored-section">
                                        <a id={section.slug.current} className="anchor"> </a>
                                        <header>
                                            <h2 className="text-gray-700">{section.title}</h2>
                                        </header>
                                        
                                        <section className="prose lg:max-w-4xl xl:max-w-5xl">
                                            <BlockContent blocks={section.content} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                                        </section>
                                        <footer className="mt-4 flex justify-end">
                                            <a href="#top" className="text-sm text-orange-400">Back to top</a>
                                        </footer>
                                    </article>
                                );
                            })}
                        </section>
                    </div>
                </section>
            }
    </div>);
}