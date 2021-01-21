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
import TypographyTestPage from "./TypographyTestPage";

export default function BlackboxHost() {
    const routePrefix = '/blackbox';
    return (
        <div className="min-h-screen flex flex-col w-full">
            <NavBar />
            <Switch>
                <Route component={Loading} path={`${routePrefix}/loading`} /> {/* TODO: remove this, testing only */}
                <Route component={TypographyTestPage} path={`${routePrefix}/typography`} /> {/* TODO: remove this, testing only */}
                <Route component={Project} path={`${routePrefix}/projects/:slug`} />
                <Route component={ProjectList} path={`${routePrefix}/projects`} />
                <Route component={BlogPost} path={`${routePrefix}/blog/:slug`} />
                <Route component={Blog} path={`${routePrefix}/blog`} exact />
                <Route component={About} path={`${routePrefix}/about`} />
                <Route component={Home} path={`${routePrefix}/`} />
            </Switch>
            <footer className="bg-gray-700">
                <div className="flex align-center justify-center">
                    <a href="https://github.com/brendenblack"
                        className="text-xl m-1 p-1 lg:p-2 text-white hover:bg-indigo-500 rounded-full transition-colors duration-300" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        <FaGithub />
                        <span className="sr-only">Github</span>
                    </a> 
                    <a href="https://www.linkedin.com/in/brendenblack"
                        className="text-xl m-1 p-1 lg:p-2 text-white hover:bg-indigo-500 rounded-full transition-colors duration-300" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        <FaLinkedin />
                        <span className="sr-only">LinkedIn</span>
                    </a> 
                </div>
            </footer>
        </div>
    );
}