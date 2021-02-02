import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BlackboxHost from './components/BlackboxHost';
import HomeContainer from './home/HomeContainer';

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route component={HomeContainer} path="/" />
      {/* <Route component={BlackboxHost} path="/blackbox" /> */}
    </Switch>
  </BrowserRouter>);
}

export default App;
