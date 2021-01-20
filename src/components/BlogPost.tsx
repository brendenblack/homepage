import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import sanityClient from '../client';
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import BlockContent from '@sanity/block-content-to-react';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

export default function BlogPost() {
    const [ post, setPost ] = useState<any|null>(null);
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image
            
        }`)
        .then((data) => setPost(data[0]))
        .catch(console.error);
    }, [ slug ]);

    if (!post) {
        return <div>Loading...</div>;
    }


    return (
        <main className="bg-gray-200 min-h-screen p-12">
            <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg">
                <header className="relative">
                    <div className="absolute h-full w-full flex items-center justify-center p-8">
                        <div className="bg-white bg-opacity-75 rounded p-12">
                            <h1 className="text-3xl lg:text-6xl mb-4">{post.title}</h1>
                            <div className="flex justify-center text-gray-800">
                                <img src={urlFor(post.authorImage).url() || undefined}
                                    alt={post.name}
                                    className="w-10 h-10 rounded-full" />
                                <p className="flex items-center pl-2 text-2xl">{post.name}</p>    
                            </div>
                            
                        </div>
                    </div>
                    <img src={post.mainImage.asset.url} alt={post.title} className="w-full object-cover rounded-t" style={{ height: 400 }} />
                </header>
                <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                    <BlockContent blocks={post.body} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                </div>
            </article>
        </main>
    );
}