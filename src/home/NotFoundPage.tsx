import fancy from '../images/fancymanandboss.svg';

export default function NotFoundPage() {
    return (
        <div className="page">
            <div className="container py-8 text-center">
                <img src={fancy} alt="Page not found" />
                <h1>Nothing was found at this address</h1>
            </div>
        </div>
    )
}