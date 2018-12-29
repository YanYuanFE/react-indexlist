# react-indexlist

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

    // class of component
    className: PropTypes.string,

    // Array of list
    data: PropTypes.array.isRequired, // Default: []

    // render item by self
    renderItem: PropTypes.func,

    // onClick item callback
    onSelect: PropTypes.func,
}

```

#### License

[MIT][mit-license]

[mit-license]: ./LICENSE
