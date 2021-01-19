import React from 'react';
import logo from './logo.svg';
import Footer from './Footer';
import Header from './Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ComingSoonPage from './ComingSoonPage';
import About from './components/About';
import Home from './components/Home';
import Project from './components/Project';
import ProjectList from './components/ProjectList';
import BlackboxHost from './components/BlackboxHost';

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route component={ComingSoonPage} path="/" exact />
      <Route component={BlackboxHost} path="/blackbox" />
    </Switch>
  </BrowserRouter>);
  

//  #24292e

}

export default App;
