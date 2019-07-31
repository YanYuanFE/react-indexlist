import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var Scroll =
/*#__PURE__*/
function (_PureComponent) {
  inherits(Scroll, _PureComponent);

  function Scroll() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck(this, Scroll);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Scroll)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _this._initScroll = function () {
      var _this$props = _this.props,
          probeType = _this$props.probeType,
          click = _this$props.click,
          listenScroll = _this$props.listenScroll,
          pullup = _this$props.pullup,
          beforeScroll = _this$props.beforeScroll,
          handleScroll = _this$props.handleScroll,
          handleScrollToEnd = _this$props.handleScrollToEnd,
          handleBeforeScroll = _this$props.handleBeforeScroll;

      if (!_this.wrapper) {
        return;
      }

      _this.scroll = new BScroll(_this.wrapper, {
        probeType: probeType,
        click: click
      });

      if (listenScroll) {
        var me = assertThisInitialized(_this);

        _this.scroll.on('scroll', function (pos) {
          handleScroll(pos);
        });
      }

      if (pullup) {
        _this.scroll.on('scrollEnd', function () {
          if (_this.scroll.y <= _this.scroll.maxScrollY + 50) {
            handleScrollToEnd();
          }
        });
      }

      if (beforeScroll) {
        _this.scroll.on('beforeScrollStart', function () {
          handleBeforeScroll();
        });
      }
    };

    _this.disable = function () {
      _this.scroll && _this.scroll.disable();
    };

    _this.enable = function () {
      _this.scroll && _this.scroll.enable();
    };

    _this.refresh = function () {
      _this.scroll && _this.scroll.refresh();
    };

    _this.scrollTo = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this.scroll && _this.scroll.scrollTo.apply(_this.scroll, args);
    };

    _this.scrollToElement = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _this.scroll && _this.scroll.scrollToElement.apply(_this.scroll, args);
    };

    return _this;
  }

  createClass(Scroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._initScroll();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.data !== this.props.data) {
        setTimeout(function () {
          _this2.refresh();
        }, this.props.refreshDelay);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className;
      return React.createElement("div", {
        ref: function ref(_ref) {
          return _this3.wrapper = _ref;
        },
        className: className
      }, children);
    }
  }]);

  return Scroll;
}(PureComponent);

Scroll.defaultProps = {
  probeType: 1,
  click: true,
  listenScroll: false,
  data: [],
  pullup: false,
  beforeScroll: false,
  refreshDelay: 20
};
Scroll.propTypes = {
  probeType: PropTypes.number,
  click: PropTypes.bool,
  listenScroll: PropTypes.bool,
  data: PropTypes.array,
  pullup: PropTypes.bool,
  beforeScroll: PropTypes.bool,
  refreshDelay: PropTypes.number
};

var getData = function getData(el, name, val) {
  var prefix = 'data-';

  if (val) {
    return el.setAttribute(prefix + name, val);
  }

  return el.getAttribute(prefix + name);
};

var TITLE_HEIGHT = 30;
var ANCHOR_HEIGHT = 18;

var IndexList =
/*#__PURE__*/
function (_PureComponent) {
  inherits(IndexList, _PureComponent);

  function IndexList(props) {
    var _this;

    classCallCheck(this, IndexList);

    _this = possibleConstructorReturn(this, getPrototypeOf(IndexList).call(this, props));

    _this.onShortcutTouchStart = function (e) {
      var anchorIndex = getData(e.target, 'index');
      var firstTouch = e.touches[0];
      _this.touch.y1 = firstTouch.pageY;
      _this.touch.anchorIndex = anchorIndex;

      _this._scrollTo(anchorIndex);
    };

    _this.onShortcutTouchMove = function (e) {
      e.preventDefault();
      var firstTouch = e.touches[0];
      _this.touch.y2 = firstTouch.pageY;
      var delta = (_this.touch.y2 - _this.touch.y1) / ANCHOR_HEIGHT | 0;
      var anchorIndex = parseInt(_this.touch.anchorIndex, 10) + delta;

      _this._scrollTo(anchorIndex);
    };

    _this.refresh = function () {
      _this.listView.refresh();
    };

    _this.scroll = function (pos) {
      _this.scrollY = pos.y;

      _this.handleScrollYChange(pos.y);
    };

    _this.handleScrollYChange = function (newY) {
      var listHeight = _this.listHeight;
      var currentIndex = _this.state.currentIndex;

      if (newY > 0) {
        _this.setState({
          currentIndex: 0
        }, _this.changeTitle);

        return;
      }

      for (var i = 0; i < listHeight.length - 1; i++) {
        var height1 = listHeight[i];
        var height2 = listHeight[i + 1];

        if (-newY >= height1 && -newY < height2) {
          if (currentIndex !== i) {
            _this.setState({
              currentIndex: i
            }, _this.changeTitle);
          }

          _this.diff = height2 + newY;

          _this.handleDiffChange();

          return;
        }
      }

      _this.setState({
        currentIndex: listHeight.length - 2
      }, _this.changeTitle);
    };

    _this.changeTitle = function () {
      var data = _this.props.data;
      var currentIndex = _this.state.currentIndex;

      if (_this.scrollY > 0) {
        _this.setState({
          fixedTitle: ''
        });

        return;
      }

      var fixedTitle = data[currentIndex] ? data[currentIndex].title : '';

      _this.setState({
        fixedTitle: fixedTitle
      });
    };

    _this.handleDiffChange = function () {
      var diff = _this.diff;
      var fixedTop = diff > 0 && diff < TITLE_HEIGHT ? diff - TITLE_HEIGHT : 0;

      if (_this.fixedTop === fixedTop) {
        return;
      }

      _this.fixedTop = fixedTop;
      _this.fixed.style.transform = "translate3d(0,".concat(fixedTop, "px,0)");
    };

    _this._calculateHeight = function () {
      _this.listHeight = [];
      var list = _this.listGroup;
      var height = 0;

      _this.listHeight.push(height);

      list.forEach(function (item, index) {
        if (!item) {
          return;
        }

        height += item.clientHeight;

        _this.listHeight.push(height);
      });
    };

    _this._scrollTo = function (index) {
      if (!index && index !== 0) {
        return;
      }

      if (index < 0) {
        index = 0;
      } else if (index > _this.listHeight.length - 2) {
        index = _this.listHeight.length - 2;
      }

      _this.scrollY = -_this.listHeight[index];

      _this.handleScrollYChange(_this.scrollY);

      _this.listView.scrollToElement(_this.listGroup[index], 0);
    };

    _this.selectItem = function (item) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(item);
    };

    _this.state = {
      currentIndex: 0,
      fixedTitle: '',
      shortcutList: props.data.map(function (group) {
        return group.title.substr(0, 1);
      })
    };
    _this.diff = -1;
    _this.scrollY = -1;
    _this.probeType = 3;
    _this.listenScroll = true;
    _this.touch = {};
    _this.listHeight = [];
    _this.listGroup = [];
    return _this;
  }

  createClass(IndexList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data !== this.props.data) {
        this.setState({
          shortcutList: nextProps.data.map(function (group) {
            return group.title.substr(0, 1);
          })
        }, this._calculateHeight);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._calculateHeight();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          data = _this$props.data,
          renderItem = _this$props.renderItem,
          className = _this$props.className;
      var _this$state = this.state,
          shortcutList = _this$state.shortcutList,
          fixedTitle = _this$state.fixedTitle,
          currentIndex = _this$state.currentIndex;
      return React.createElement(Scroll, {
        className: "listview ".concat(className),
        data: data,
        probeType: this.probeType,
        listenScroll: this.listenScroll,
        handleScroll: this.scroll,
        ref: function ref(_ref2) {
          return _this2.listView = _ref2;
        }
      }, React.createElement("ul", null, data.map(function (group, index) {
        return React.createElement("li", {
          className: "list-group",
          ref: function ref(listGroup) {
            return _this2.listGroup[index] = listGroup;
          },
          key: index
        }, React.createElement("h2", {
          className: "list-group-title"
        }, group.title), React.createElement("ul", null, group.items.map(function (item, key) {
          return React.createElement("li", {
            className: "list-group-item",
            key: key,
            onClick: function onClick() {
              return _this2.selectItem(item);
            }
          }, renderItem ? renderItem(item) : React.createElement("span", {
            className: "name"
          }, item.name));
        })));
      })), React.createElement("div", {
        className: "list-shortcut",
        onTouchStart: this.onShortcutTouchStart,
        onTouchMove: this.onShortcutTouchMove
      }, React.createElement("ul", null, shortcutList.map(function (item, index) {
        var ItemCls = currentIndex === index ? 'item current' : 'item';
        return React.createElement("li", {
          key: item,
          "data-index": index,
          className: ItemCls
        }, item);
      }))), React.createElement("div", {
        className: "list-fixed",
        ref: function ref(_ref) {
          return _this2.fixed = _ref;
        }
      }, fixedTitle ? React.createElement("div", {
        className: "fixed-title"
      }, fixedTitle) : null));
    }
  }]);

  return IndexList;
}(PureComponent);

IndexList.defaultProps = {
  data: []
};
IndexList.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  className: PropTypes.string
};

export default IndexList;
