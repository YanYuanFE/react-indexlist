"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _scroll = _interopRequireDefault(require("../scroll/scroll"));

var _utils = require("../../utils/");

require("./index.less");

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var TITLE_HEIGHT = 30;
var ANCHOR_HEIGHT = 18;

var IndexList =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(IndexList, _PureComponent);

  function IndexList(props) {
    var _this;

    (0, _classCallCheck2.default)(this, IndexList);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(IndexList).call(this, props));

    _this.onShortcutTouchStart = function (e) {
      var anchorIndex = (0, _utils.getData)(e.target, 'index');
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
      var anchorIndex = parseInt(_this.touch.anchorIndex) + delta;

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
          console.log(_this.state.currentIndex, i);

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
      console.log(fixedTitle);

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
    console.log(props.data.map(function (group) {
      return group.title.substr(0, 1);
    }));
    _this.diff = -1;
    _this.scrollY = -1;
    _this.probeType = 3;
    _this.listenScroll = true;
    _this.touch = {};
    _this.listHeight = [];
    _this.listGroup = [];
    return _this;
  }

  (0, _createClass2.default)(IndexList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.data !== this.props.data) {
        this.setState({
          shortcutList: nextProps.data.map(function (group) {
            return group.title.substr(0, 1);
          })
        });
        setTimeout(function () {
          _this2._calculateHeight();
        }, 20);
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
      var _this3 = this;

      var data = this.props.data;
      var _this$state = this.state,
          shortcutList = _this$state.shortcutList,
          fixedTitle = _this$state.fixedTitle,
          currentIndex = _this$state.currentIndex;
      console.log(fixedTitle);
      return _react.default.createElement(_scroll.default, {
        className: "listview",
        data: data,
        probeType: this.probeType,
        listenScroll: this.listenScroll,
        handleScroll: this.scroll,
        ref: function ref(_ref2) {
          return _this3.listview = _ref2;
        }
      }, _react.default.createElement("ul", null, data.map(function (group, index) {
        return _react.default.createElement("li", {
          className: "list-group",
          ref: function ref(listGroup) {
            return _this3.listGroup[index] = listGroup;
          },
          key: index
        }, _react.default.createElement("h2", {
          className: "list-group-title"
        }, group.title), _react.default.createElement("ul", null, group.items.map(function (item, key) {
          return _react.default.createElement("li", {
            className: "list-group-item",
            key: key,
            onClick: _this3.selectItem(item)
          }, item.avatar ? _react.default.createElement("img", {
            src: item.avatar,
            alt: "",
            className: "avatar"
          }) : null, _react.default.createElement("span", {
            className: "name"
          }, item.name));
        })));
      })), _react.default.createElement("div", {
        className: "list-shortcut",
        onTouchStart: this.onShortcutTouchStart,
        onTouchMove: this.onShortcutTouchMove
      }, _react.default.createElement("ul", null, shortcutList.map(function (item, index) {
        return _react.default.createElement("li", {
          key: item,
          className: (0, _classnames.default)('item', {
            current: currentIndex === index
          })
        }, item);
      }))), _react.default.createElement("div", {
        className: "list-fixed",
        ref: function ref(_ref) {
          return _this3.fixed = _ref;
        }
      }, fixedTitle ? _react.default.createElement("div", {
        className: "fixed-title"
      }, fixedTitle) : null));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);
  return IndexList;
}(_react.PureComponent);

IndexList.defaultProps = {
  data: []
};
IndexList.propTypes = {
  data: _propTypes.default.array,
  onSelect: _propTypes.default.func
};
var _default = IndexList;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TITLE_HEIGHT, "TITLE_HEIGHT", "E:\\Github\\react-indexlist\\src\\components\\indexlist\\IndexList.js");
  reactHotLoader.register(ANCHOR_HEIGHT, "ANCHOR_HEIGHT", "E:\\Github\\react-indexlist\\src\\components\\indexlist\\IndexList.js");
  reactHotLoader.register(IndexList, "IndexList", "E:\\Github\\react-indexlist\\src\\components\\indexlist\\IndexList.js");
  reactHotLoader.register(_default, "default", "E:\\Github\\react-indexlist\\src\\components\\indexlist\\IndexList.js");
  leaveModule(module);
})();

;