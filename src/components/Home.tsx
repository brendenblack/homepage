import image from "../blackbox.jpeg";

export default function Home() {
    return (
    <main>
        <img src={image} alt="A black box" className="absolute object-cover w-full h-full" />
        <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
            <h1 className="text-6xl text-white font-bold leading-none lg:leading-snug home-name">Demystify the black box</h1>
        </section>
    </main>
    );
}