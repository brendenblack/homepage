import './Loading.css';

export default function Loading() {
    return (
        <div className="page bg-gray-200">
            <div className="flex w-full justify-center mt-8 lg:mt-24">          
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            </div>
        </div>
    );
}