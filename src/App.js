import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Singer from './container/singer';
import City from './container/city';
import Home from './container/home';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/singer" component={Singer} />
          <Route path="/city" component={City} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
