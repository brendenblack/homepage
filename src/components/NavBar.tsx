import React from "react";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

export default function NavBar() {
    const routePrefix = '/blackbox';

    const linkClasses = "inline-flex items-center py-3 px-3 my-6 text-grey-300 hover:text-white border-transparent border-b-2 hover:border-indigo-400";
    const activeLinkClasses = "text-indigo-400 border-indigo-400";

    return (
        <header className="bg-gray-900">
            <div className="container mx-auto flex justify-between text-gray-300">
                <nav>
                    <NavLink to={`${routePrefix}`} 
                        className="inline-flex items-center py-6 px-3 mr-4 hover:text-white text-4xl font-bold tracking-widest">Blackbox</NavLink>
                    <NavLink 
                        to={`${routePrefix}/projects`} 
                        className={linkClasses}
                        activeClassName={activeLinkClasses}>Projects</NavLink>
                    <NavLink 
                        to={`${routePrefix}/blog`} 
                        className={linkClasses}
                        activeClassName={activeLinkClasses}>Blog</NavLink>
                    <NavLink 
                        to={`${routePrefix}/about`} 
                        className={linkClasses}
                        activeClassName={activeLinkClasses}>About</NavLink>
                </nav>
                <div className=" inline-flex py-3 px-3 my-6">
                    <SocialIcon url="https://github.com/brendenblack" className="mr-4" target="_blank" fgColor="#fff" style={{ height: 35, width: 35 }} />
                    <SocialIcon url="https://www.linkedin.com/in/brendenblack" className="mr-4" target="_blank" fgColor="#fff" style={{ height: 35, width: 35 }} />
                </div>
            </div>
           
        </header>
    )
}