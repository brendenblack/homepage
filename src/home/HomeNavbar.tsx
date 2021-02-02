import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import routes, { prefix } from "./homeRoutes";


export default function HomeNavbar() {
    const [ isExpanded, setExpanded ] = useState(false);
    

    return (
        <header className="bg-white w-full z-50 transition-all duration-200 border-gray-200 border-b shadow-sm fixed" style={{ height: 60 }}>
            <div className="container flex flex-wrap items-center pt-4 md:pt-0">
                <div className="flex items-center justify-between flex-1">
                    <a href={`${prefix}/`} className="">
                        {/* <img src={hole} alt="hole" style={{ height: 40, width: 40 }} className="inline-block" /> */}
                        <span className="home-font-branding text-3xl my-2">Brenden Black</span>
                        {/* <img src="data:image/svg+xml;base64,CjxpbWcgc3R5bGU9IndpZHRoOiAxMDAlOyBoZWlnaHQ6IGF1dG87IGZsb2F0OiBsZWZ0O2JhY2tncm91bmQtaW1hZ2U6IG5vbmU7IiBzcmM9Ii8vY2RuLm9ubGluZXdlYmZvbnRzLmNvbS9zdmcvaW1nXzU0OTU3NC5wbmciIGFsdD0iUm91bGV0dGUiPgogIA==" width="32" height="32"></img> */}
                    </a>
                </div>

                <button className="block pointer-cursor lg:hidden" onClick={() => setExpanded(!isExpanded) }>
                    <span className="block relative w-6 h-px rounded-sm bg-gray-800 hover:bg-gray-500"></span>
                    <span className="block relative w-6 h-px rounded-sm bg-gray-800 hover:bg-gray-500 mt-1"></span>
                    <span className="block relative w-6 h-px rounded-sm bg-gray-800 hover:bg-gray-500 mt-1"></span>
                </button>

                <div className={"w-full lg:flex lg:items-center lg:w-auto" + (isExpanded ? "" : " hidden")} id="menu">
                    <nav>
                        <ul className="items-center justify-between text-base md:flex pt-3 -mx-8 px-8 md:px-0 md:mx-0 md:pt-0 home-font-branding border-b border-gray-200 md:border-transparent">
                            {routes.map((route, index) => {
                                return (
                                    <li key={index} className="bg-white">
                                        <NavLink 
                                            activeClassName="text-orange-400 border-orange-400"
                                            className="block px-0 py-3 border-b-2 text-gray-800 border-transparent lg:p-4 hover:text-gray-500 hover:border-gray-500 transition-all duration-200"
                                            to={route.path}
                                            onClick={() => setExpanded(false)}>{route.display}</NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>      
        </header>  
    );
}