import React from 'react';
import { prefix } from './routes';
import BlockContent from '@sanity/block-content-to-react';

// https://www.sanity.io/guides/portable-text-internal-and-external-links

const serializers = {
    marks: {
        // @ts-ignore
        internalProjectLink: ({mark, children }) => {
            const {slug = {}} = mark;
            const href= `${prefix}/projects/${slug.current}`;
            return <a href={href}>{children}</a>
        },
        // @ts-ignore
        link: ({mark, children }) => {

            if (mark.blank) {
                return <a href={mark.href} target="_blank" rel="noopener noreferrer">{children}</a>
            } else {
                return <a href={mark.href}>{children}</a>
            }
        },
    },
    // types: {
    //     image: (props: any) => {
    //         console.log('image props', props);
    //         return <figure><img /></figure>
    //     }
    // }
}

const ProjectDescription = (props: any) => {
    console.log('blocks', props.blocks);
    return (
        <BlockContent blocks={props.blocks} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" serializers={serializers}  />
    );
}

export default ProjectDescription;