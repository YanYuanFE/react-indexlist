import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import Singer from './../singer';
import City from './../city';

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React IndexList</h1>
      </header>
      <p className="App-intro">
        <Link to="/singer">歌手Example</Link>
      </p>
      <p className="App-intro">
        <Link to="/city">城市Example</Link>
      </p>
      <Route path="/singer" component={Singer} />
      <Route path="/city" component={City} />
    </div>
  );
}

export default Home;
