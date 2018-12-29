import React, { Component, Fragment } from 'react';
import { singers } from '../../data';
import IndexList from 'react-indexlist';
import 'react-indexlist/dist/index.css';


class Singer extends Component {
  render() {
    return (
      <div className="scroll">
        <IndexList data={singers} renderItem={(item) => <Fragment><img src={item.avatar} alt="" className="avatar"/><span className="name">{item.name}</span></Fragment>} />
      </div>
    );
  }
}

export default Singer;
