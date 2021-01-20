import React from "react";
import { FaLinkedin, FaGithub, FaBox } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-screen p-2">
    <div className="flex align-center justify-center">
      <a className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-800 hover:bg-gray-800 rounded-full hover:text-white transition-colors duration-300" href="https://github.com/brendenblack">
        <FaGithub />
        <span className="sr-only">Github</span>
      </a> 
      <a className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-800 hover:bg-gray-800 rounded-full hover:text-white transition-colors duration-300" href="https://www.linkedin.com/in/brendenblack">
        <FaLinkedin />
        <span className="sr-only">LinkedIn</span>
      </a> 
      <a className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-200 hover:text-black" href="/blackbox">
        <div className="flex flex-row">
          <FaBox /> <span className="text-xs italic pl-4">it's a secret to everybody</span>
          <span className="sr-only">Blackbox</span>
        </div>
      </a> 
    </div>
  </footer>
    );
}