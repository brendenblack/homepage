import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from "../client";


export default function Blog() {

    const [ postData, setPostData ] = useState<any | null>(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "post"]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                }
            }`)
            .then((data) => {
                console.log(data);
                setPostData(data);
            });
    }, []);

    return (
        <main className="bg-gray-200 min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center">Blost posts page</h1>
                <h2 className="text-lg text-gray-600 flex justify-center mb-12">These are blog posts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postData && postData.map((post: any, index: number) => {
                        console.log(`post ${post.slug.current}`);
                        return (<article>
                            <Link to={`/blackbox/blog/${post.slug.current}`} key={post.slug.current}>
                                <span className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-indigo-400" key={index}>
                                    <img
                                        src={post.mainImage.asset.url}
                                        alt={post.mainImage.alt}
                                        className="w-full h-full rounded-r object-cover absolute" 
                                    />
                                    <span className="relative h-full flex justify-end items-end pr-4 pb-4 ">
                                        <h3 className="text-gray-800 text-lg font-bold px-3 py-4 bg-indigo-400 rounded bg-opacity-50">{post.title}</h3>
                                    </span>
                                </span>
                            </Link>
                        </article>);
                    })
                }
                </div>
            </section>
        </main>
    );
}