import React, { Component } from 'react';
import {singers} from "../../data";
import IndexList from '../../components/indexlist';


class Singer extends Component {
  render() {
    return (
      <div className="scroll">
        <IndexList data={singers}/>
      </div>
    );
  }
}

export default Singer;
