import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import Singer from './../singer';
import City from './../city';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/singer">歌手</Link>
        <Link to="/city">城市</Link>
        <Route path="/singer" component={Singer} />
        <Route path="/city" component={City} />
      </div>
    );
  }
}

export default Home;
