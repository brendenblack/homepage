import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { prefix } from './routes';

export default function NavBar() {

    const [ isExpanded, setExpanded ] = useState(false);

    const routes: { path: string, display: string}[] = [
        { path: '/projects', display: 'Projects' },
        // { path: '/blog', display: 'Blog' },
        { path: '/about', display: 'About' },
    ]

    return (
        <header className="text-gray-300 px-6 lg:px-24 py-3 lg:py-0 bg-gray-800 flex flex-wrap items-center fixed w-full z-50 transition-all duration-200"  >      
            <div className="flex items-center justify-between flex-1">
                <a href={prefix} className="">
                    {/* <img src={graphLogo} alt="" style={{ height: 40, width: 40 }} className="bg-gray-300 hover:bg-gray-100 rounded-md my-2 inline-block" /> */}
                    <span className="font-branding pl-4 text-3xl my-2">Brenden Black</span>
                    {/* <img src="data:image/svg+xml;base64,CjxpbWcgc3R5bGU9IndpZHRoOiAxMDAlOyBoZWlnaHQ6IGF1dG87IGZsb2F0OiBsZWZ0O2JhY2tncm91bmQtaW1hZ2U6IG5vbmU7IiBzcmM9Ii8vY2RuLm9ubGluZXdlYmZvbnRzLmNvbS9zdmcvaW1nXzU0OTU3NC5wbmciIGFsdD0iUm91bGV0dGUiPgogIA==" width="32" height="32"></img> */}
                </a>
            </div>

            <button className="block pointer-cursor lg:hidden" onClick={() => setExpanded(!isExpanded) }>
                <span className="block relative w-6 h-px rounded-sm bg-gray-200 hover:bg-white"></span>
                <span className="block relative w-6 h-px rounded-sm bg-gray-200 hover:bg-white mt-1"></span>
                <span className="block relative w-6 h-px rounded-sm bg-gray-200 hover:bg-white mt-1"></span>
            </button>

            <div className={"w-full lg:flex lg:items-center lg:w-auto" + (isExpanded ? "" : " hidden")} id="menu">
                <nav>
                    <ul className="items-center justify-between pt-4 text-base lg:flex lg:pt-0 font-branding">
                        {routes.map((route, index) => {
                            return (
                                <li key={index}>
                                    <NavLink 
                                        activeClassName="text-indigo-400 border-indigo-400"
                                        className="block px-0 py-3 border-b-2 text-gray-300 border-transparent lg:p-4 hover:text-indigo-200 hover:border-indigo-200 transition-all duration-200"
                                        to={`${prefix}${route.path}`}
                                        onClick={() => setExpanded(false)}>{route.display}</NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>  
    );

}
