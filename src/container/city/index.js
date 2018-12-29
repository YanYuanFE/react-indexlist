import React, { Component } from 'react';
import { cities } from "../../data";
import IndexList from '../../components/indexlist';


class City extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityArr: []
    }
  }

  componentDidMount() {
    const cityArr = this.format(cities.content.cities);
    this.setState({cityArr});
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

  handleSelect = (item) => {
    console.log(item);
  }

  render() {
    const { cityArr } = this.state;
    console.log(cityArr);
    return (
      <div className="scroll">
        <IndexList data={cityArr} onSelect={this.handleSelect} />
      </div>
    );
  }
}

export default City;
