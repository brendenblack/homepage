import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Redirect, Route, Switch } from "react-router-dom";
import AboutPage from "./AboutPage";
import HomeNavbar from "./HomeNavbar";
import HomePage from "./HomePage";
import ProjectDetailsPage from "./ProjectDetailsPage";
import ProjectsPage from "./ProjectsPage";
import { prefix } from "./homeRoutes";
import ThoughtsPage from "./ThoughtsPage";
import NotFoundPage from "./NotFoundPage";


export default function HomeContainer() {
    return (
            <div className="min-h-screen flex flex-col w-full">
            <HomeNavbar />

            <Switch>
                <Route path={`${prefix}/projects/:slug`} component={ProjectDetailsPage} />
                <Route path={`${prefix}/projects`} component={ProjectsPage} /> 
                <Route path={`${prefix}/thoughts`} component={ThoughtsPage} /> 
                <Route path={`${prefix}/about`} component={AboutPage} /> 
                <Route path={`${prefix}/`} component={HomePage} exact />
                
                <Route path="/404" component={NotFoundPage} />
                <Redirect to="/404" />
            </Switch>
            
            <footer className="bg-gray-700">
                <div className="flex align-center justify-center">
                    <a href="https://github.com/brendenblack"
                        className="text-xl m-1 p-1 lg:p-2 text-white hover:bg-orange-400 rounded-full transition-colors duration-300" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        <FaGithub />
                        <span className="sr-only">Github</span>
                    </a> 
                    <a href="https://www.linkedin.com/in/brendenblack"
                        className="text-xl m-1 p-1 lg:p-2 text-white hover:bg-orange-400 rounded-full transition-colors duration-300" 
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