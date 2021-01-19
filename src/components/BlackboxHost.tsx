import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import NavBar from "./NavBar";
import Project from "./Project";
import ProjectList from "./ProjectList";
import Blog from "./Blog";
import BlogPost from "./BlogPost";

export default function BlackboxHost() {
    const routePrefix = '/blackbox';
    return (
        <div>
        <NavBar />
        <Switch>
            
            <Route component={Project} path={`${routePrefix}/projects/:slug`} />
            <Route component={ProjectList} path={`${routePrefix}/projects`} />
            <Route component={BlogPost} path={`${routePrefix}/blog/:slug`} />
            <Route component={Blog} path={`${routePrefix}/blog`} exact />
            <Route component={About} path={`${routePrefix}/about`} />
            <Route component={Home} path={`${routePrefix}/`} />
        </Switch>
        </div>
    );
}