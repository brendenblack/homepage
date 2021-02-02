
import HomePage from './HomePage';

// using prefix allowed me to isolate development of this portion of the site behind a route prefix,
// and when it's ready to launch i can change this to an empty string 
export const prefix = "";

const routes: { path: string, display: string, component: React.FunctionComponent}[] = [
    { path: `${prefix}/projects`, display: 'Projects', component: HomePage },
    { path: `${prefix}/thoughts`, display: 'Thoughts', component: HomePage },
    { path: `${prefix}/about`, display: 'About', component: HomePage },
];

export default routes;