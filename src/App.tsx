import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ComingSoonPage from './ComingSoonPage';
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
