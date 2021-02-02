import { useEffect, useState } from "react";
import sanityClient from '../client';
import BlockContent from '@sanity/block-content-to-react';
import computer from '../images/1520814921.svg';

const authorSlug = 'brenden';

export default function AboutPage() {
    const [ authorProfile, setAuthorProfile ] = useState<any>(null);
    
    useEffect(() => {
        sanityClient.fetch(`*[_type == "author" && slug.current == "${authorSlug}"]{
            _type,
            slug,
            bio,
            "bioImage": image.asset->url
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
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className=" h-full py-8 items-center justify-center">
                        <img src={computer}  className="m-auto bg-white p-8" />
                        {/* <img src={authorProfile.bioImage}  className="m-auto rounded-full" /> */}
                    
                </div>
                <div className="">
                    {authorProfile && 
                        <main className="bio w-full p-8 lg:p-16" >
                            <article className="prose lg:max-w-4xl xl:max-w-5xl mx-auto">
                                <BlockContent blocks={authorProfile.bio} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
                            </article>
                        </main>
                    }
                </div>
            </div>
        </div>
    );
}