import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';
import Singer from './container/singer';
import City from './container/city';
import Home from './container/home';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/singer" component={Singer} />
        <Route path="/city" component={City} />
      </Switch>
    </HashRouter>
  );
}

export default App;
