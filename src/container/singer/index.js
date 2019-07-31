import React, { Component, Fragment } from 'react';
import { singers, cities } from '../../data';
// import IndexList from '../../components/indexlist';
import IndexList from '../../../es/index';


class Singer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singers: singers
    }
  }
  format = (cities) => {
    let cityArr = [];
    let cacheTitle = [];
    let cityList = {};
    cities.forEach((city) => {
      const letter = city.pinyin && city.pinyin[0].toUpperCase();

      if (!cityList[letter]) {
        cityList[letter] = [];
      }

      cityList[letter].push(city);
    });
    Object.keys(cityList).sort().forEach((title) => {
      const city = {
        title,
        items: cityList[title]
      }
      cityArr.push(city);
    })
    return cityArr;
  }
  render() {
    const { singers } = this.state;
    return (
      <div className="scroll">
        <IndexList
          onSelect={() => {
            const cityArr = this.format(cities.content.cities);
            this.setState({singers: cityArr});
          }}
          data={singers} 
          renderItem={(item) => <Fragment><img src={item.avatar} alt="" className="avatar"/><span className="name">{item.name}</span></Fragment>} />
      </div>
    );
  }
}

export default Singer;
