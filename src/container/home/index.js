import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import Singer from './../singer';
import logo from '../../logo.svg';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/singer">歌手</Link>
        <Route path="/singer" component={Singer} />
      </div>
    );
  }
}

export default Home;
