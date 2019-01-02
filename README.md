# react-indexlist

[![](https://img.shields.io/npm/l/react-indexlist.svg?style=flat-square)](https://github.com/YanYuanFE/react-indexlist)
[![](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://github.com/YanYuanFE/react-indexlist)

### Description
Indexlist component based better-scroll for react。

### Quick Start

#### Install

``` bash
npm install react-indexlist --save

or yarn add react-indexlist
```


#### Usage

``` js
import IndexList from 'react-indexlist';
import 'react-indexlist/dist/index.css';
```

``` js
handleSelect = (item) => {
    console.log(item);
}

<IndexList data={arr} onSelect={this.handleSelect} className="my-indexlist" />
```

#### Example

![indexlist](http://img.yanyuanfe.cn/indexlist1.png)

![indexlist](http://img.yanyuanfe.cn/indexlist2.png)

![indexlist](http://img.yanyuanfe.cn/indexlist.gif)


#### Prop types

``` js
propTypes: {

    // className of component
    className: PropTypes.string,

    // Array of list
    data: PropTypes.array.isRequired, // Default: Array<{ title: string, items: array<{ name: string }> }>

    // render item by self, return ReactNode
    renderItem: PropTypes.func, // function (item)

    // onClick item callback
    onSelect: PropTypes.func, // function (item)
}

```

#### License

[MIT][mit-license]

[mit-license]: ./LICENSE
