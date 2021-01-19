import React, { useState, useEffect } from 'react';
import image from "../blackbox.jpeg"; 
import roulette from "../gambling-2001079_1920.jpg";

type LayoutStyle = "blackbox" | "roulette"

export default function Home() {
    const [ style, setStyle ] = useState<LayoutStyle>("blackbox");
    
    if (style === "blackbox") {
        return (
            <main className="">
                <img src={image} alt="A black box" className="absolute object-cover w-full h-full" />
                <section className="relative flex pt-12 lg:pt-24 px-8 lg:px-16">
                    <h1 className="text-6xl text-white font-bold leading-none lg:leading-snug home-name">See inside<br />the <span className="text-black">black box</span></h1>
                </section>
            </main>
        );
    } else if (style === "roulette") {
        return (
            <main className="">
                <img src={roulette} alt="A black box" className="absolute object-cover w-full h-full" />
                <section className="relative flex pt-12 lg:pt-24 px-8 lg:px-24 bg-gray-100 bg-opacity-10">
                    <h1 className="text-6xl text-red-700 font-bold leading-none lg:leading-snug home-name stroke-1">Always<br /> bet on<br /> <span className="text-black">Black</span></h1>
                </section>
            </main>
        );
    } else {
        return (<h1>hello world</h1>);
    }
}