import React, { useEffect, useState } from 'react';
import { cities } from '../../data';
import IndexList from '../../components/indexlist';


const City = () => {
  const [cityArr, setCityArr] = useState([]);

  useEffect(() => {
    const cityArr = format(cities.content.cities);
    setCityArr(cityArr);
  }, []);

  const format = (cities) => {
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

  const handleSelect = (item) => {
    console.log(item);
  }

  return (
    <div className="scroll">
      <IndexList data={cityArr} onSelect={this.handleSelect} className="city-list" />
    </div>
  );
}

export default City;
