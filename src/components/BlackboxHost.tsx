import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import NavBar from "./NavBar";
import Project from "./Project";
import ProjectList from "./ProjectList";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import Loading from "./Loading";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function BlackboxHost() {
    const routePrefix = '/blackbox';
    return (
        <div className="min-h-screen flex flex-col w-full">
            <NavBar />
            <Switch>
                <Route component={Loading} path={`${routePrefix}/loading`} /> {/* TODO: remove this, testing only */}
                <Route component={Project} path={`${routePrefix}/projects/:slug`} />
                <Route component={ProjectList} path={`${routePrefix}/projects`} />
                <Route component={BlogPost} path={`${routePrefix}/blog/:slug`} />
                <Route component={Blog} path={`${routePrefix}/blog`} exact />
                <Route component={About} path={`${routePrefix}/about`} />
                <Route component={Home} path={`${routePrefix}/`} />
            </Switch>
            <footer className="bg-gray-800">
                <div className="flex align-center justify-center">
                    <a className="sm:text-4xl lg:text-lg m-1 p-1 sm:m-2 sm:p-2 text-gray-300 hover:bg-indigo-500 rounded-full hover:text-white transition-colors duration-300" href="https://github.com/brendenblack">
                        <FaGithub />
                        <span className="sr-only">Github</span>
                    </a> 
                    <a className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-300 hover:bg-indigo-500 rounded-full hover:text-white transition-colors duration-300" href="https://www.linkedin.com/in/brendenblack">
                        <FaLinkedin />
                        <span className="sr-only">LinkedIn</span>
                    </a> 
                </div>
            </footer>
        </div>
    );
}