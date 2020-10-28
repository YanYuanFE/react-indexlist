import React, { Fragment, useState } from 'react';
import { singers, cities } from '../../data';
import IndexList from '../../components/indexlist';
// import IndexList from '../../../es/index';


const Singer = () => {
  const [data, setData] = useState(singers)

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
  return (
    <div className="scroll">
      <IndexList
        onSelect={() => {
          const cityArr = format(cities.content.cities);
          setData(cityArr);
        }}
        data={data}
        renderItem={(item) => <Fragment><img src={item.avatar} alt="" className="avatar"/><span className="name">{item.name}</span></Fragment>} />
    </div>
  );
}

export default Singer;
