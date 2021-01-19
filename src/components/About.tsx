import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import './About.css';
import image from "../blackbox.jpeg"; 
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import betOnBlack from "../betonblack.jpg";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

export default function About() {
    const [ author, setAuthor ] = useState<any | null>(null);
    useEffect(() => {
        sanityClient.fetch(`*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`)
        .then((data) => {
            console.log('data', data);
            setAuthor(data[0]);
            console.log('author',author);
        })
        .catch(console.error);
    }, []);
    const snipes = true;

    if (snipes) {
        return (
            <main className="w-full bg-black flex-grow flex justify-center"> 
                    <img src={betOnBlack} className="inline-block object-cover" style={{ width: 592, height: 333 }} />
            </main>
        )
    } else {
        

        if (!author) {
            return <div>Loading...</div>
        }

        return (
            <main className="flex-grow">
                <img src={image} alt="black box" className="absolute w-full" />
                <div className="p-10 lg:pt-48 container mx-auto relative">
                    <section className="bg-gray-700 rounded-lg shadow-2xl lg:flex p-20">
                        <img src={urlFor(author.authorImage).url() || undefined} className="ronded w-32 h-32 lg:w-64 lg:h-64" />
                        <div className="text-lg flex flex-col justify-center">
                            <h1 className="text-6xl text-indigo-400 mb-4">{author.name}</h1>
                            <div className="prose lg:prose-xl text-white">
                                <BlockContent blocks={author.bio} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
    
}