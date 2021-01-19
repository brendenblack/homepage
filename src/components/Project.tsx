import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import sanityClient from '../client';
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

export default function Project() {
    const [ project, setProject ] = useState<any|null>(null);
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"{
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
            
        }`)
        .then((data) => setProject(data))
        .catch(console.error);
    }, []);

    return (
        <main>

        </main>
    );
}