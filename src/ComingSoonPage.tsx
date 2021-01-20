import React from 'react';
import './App.css';
import Footer from './Footer';

export default function ComingSoonPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 flex-col">
      {/* <Header /> */}
      <main className="container flex-grow mt-24">
        <div className="bg-white rounded-sm shadow-lg p-5 md:p-20 mx-2">
          <div className="text-center">
            <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-500 sm:text-5xl sm:leading-none md:text-6xl">
              Brenden<span className="text-gray-900">Black</span>
            </h2>
            <h3 className='text-xl md:text-3xl mt-10 text-gray-500'>Coming Soon</h3>
          </div>
          <div className="flex flex-wrap mt-10 justify-center">
            <div className="m-3">
              <a href="https://github.com/brendenblack" title="Blackbox on GitHub"
                className="md:w-32 bg-gray-100 tracking-wide text-gray-800 font-bold rounded border-2 border-gray-800 hover:border-gray-800 hover:bg-gray-800 hover:text-gray-100 shadow-md py-2 px-6 inline-flex items-center">
                <span className="mx-auto">GitHub</span>
              </a>
            </div>
            <div className="m-3">
              <a href="https://www.linkedin.com/in/brendenblack" title="Brenden on LinkedIn"
                className="md:w-32 bg-gray-100 tracking-wide text-blue-600 font-bold rounded border-2 border-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-gray-100 shadow-md py-2 px-6 inline-flex items-center">
                <span className="mx-auto">LinkedIn</span>
              </a>
            </div>
      </div>
    </div>
  </main>
  <Footer />
</div>

//  #24292e
  );
}
