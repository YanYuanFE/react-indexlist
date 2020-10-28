import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react';
import BScroll from 'better-scroll';

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var Scroll = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$probeType = _ref.probeType,
      probeType = _ref$probeType === void 0 ? 1 : _ref$probeType,
      _ref$click = _ref.click,
      click = _ref$click === void 0 ? true : _ref$click,
      _ref$listenScroll = _ref.listenScroll,
      listenScroll = _ref$listenScroll === void 0 ? false : _ref$listenScroll,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$pullup = _ref.pullup,
      pullup = _ref$pullup === void 0 ? false : _ref$pullup,
      _ref$beforeScroll = _ref.beforeScroll,
      beforeScroll = _ref$beforeScroll === void 0 ? false : _ref$beforeScroll,
      _ref$refreshDelay = _ref.refreshDelay,
      refreshDelay = _ref$refreshDelay === void 0 ? 20 : _ref$refreshDelay,
      children = _ref.children,
      className = _ref.className,
      handleScroll = _ref.handleScroll,
      handleScrollToEnd = _ref.handleScrollToEnd,
      handleBeforeScroll = _ref.handleBeforeScroll;
  var wrapperRef = useRef();
  var scrollRef = useRef();
  useEffect(function () {
    _initScroll();
  }, []);
  useEffect(function () {
    setTimeout(function () {
      refresh();
    }, refreshDelay);
  }, [data]);

  var _initScroll = function _initScroll() {
    if (!wrapperRef.current) {
      return;
    }

    scrollRef.current = new BScroll(wrapperRef.current, {
      probeType: probeType,
      click: click
    });

    if (listenScroll) {
      scrollRef.current.on('scroll', function (pos) {
        handleScroll(pos);
      });
    }

    if (pullup) {
      scrollRef.current.on('scrollEnd', function () {
        if (scrollRef.current.y <= scrollRef.current.maxScrollY + 50) {
          handleScrollToEnd();
        }
      });
    }

    if (beforeScroll) {
      scrollRef.current.on('beforeScrollStart', function () {
        handleBeforeScroll();
      });
    }
  };

  var refresh = function refresh() {
    scrollRef.current && scrollRef.current.refresh();
  };

  useImperativeHandle(ref, function () {
    return {
      disable: function disable() {
        scrollRef.current && scrollRef.current.disable();
      },
      enable: function enable() {
        scrollRef.current && scrollRef.current.enable();
      },
      refresh: refresh,
      scrollTo: function scrollTo() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        scrollRef.current && scrollRef.current.scrollTo.apply(scrollRef.current, args);
      },
      scrollToElement: function scrollToElement() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        scrollRef.current && scrollRef.current.scrollToElement.apply(scrollRef.current, args);
      }
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapperRef,
    className: className
  }, children);
});

var getData = function getData(el, name, val) {
  var prefix = 'data-';

  if (val) {
    return el.setAttribute(prefix + name, val);
  }

  return el.getAttribute(prefix + name);
};

var TITLE_HEIGHT = 30;
var ANCHOR_HEIGHT = 18;

var IndexList = function IndexList(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      onSelect = _ref.onSelect,
      renderItem = _ref.renderItem,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className;

  var _useState = useState(0),
      _useState2 = slicedToArray(_useState, 2),
      currentIndex = _useState2[0],
      setIndex = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = slicedToArray(_useState3, 2),
      fixedTitle = _useState4[0],
      setTitle = _useState4[1];

  var _useState5 = useState(function () {
    return data.map(function (group) {
      return group.title.substr(0, 1);
    });
  }),
      _useState6 = slicedToArray(_useState5, 2),
      shortcutList = _useState6[0],
      setList = _useState6[1];

  var listViewRef = useRef();
  var fixedRef = useRef();
  var probeType = 3;
  var listenScroll = true;
  var ctxRef = useRef({
    touch: {},
    listGroup: [],
    listHeight: [],
    scrollY: -1,
    diff: -1,
    fixedTop: 0
  });
  useEffect(function () {
    setList(data.map(function (group) {
      return group.title.substr(0, 1);
    }));

    _calculateHeight();
  }, [data]);
  useEffect(function () {
    changeTitle();
  }, [currentIndex]);

  var onShortcutTouchStart = function onShortcutTouchStart(e) {
    var anchorIndex = getData(e.target, 'index');
    var firstTouch = e.touches[0];
    ctxRef.current.touch.y1 = firstTouch.pageY;
    ctxRef.current.touch.anchorIndex = anchorIndex;

    _scrollTo(anchorIndex);
  };

  var onShortcutTouchMove = function onShortcutTouchMove(e) {
    e.preventDefault();
    var firstTouch = e.touches[0];
    ctxRef.current.touch.y2 = firstTouch.pageY;
    var delta = (ctxRef.current.touch.y2 - ctxRef.current.touch.y1) / ANCHOR_HEIGHT | 0;
    var anchorIndex = parseInt(ctxRef.current.touch.anchorIndex, 10) + delta;

    _scrollTo(anchorIndex);
  };

  var onScroll = function onScroll(pos) {
    ctxRef.current.scrollY = pos.y;
    handleScrollYChange(pos.y);
  };

  var handleScrollYChange = function handleScrollYChange(newY) {
    var listHeight = ctxRef.current.listHeight;

    if (newY > 0) {
      setIndex(0);
      return;
    }

    for (var i = 0; i < listHeight.length - 1; i++) {
      var height1 = listHeight[i];
      var height2 = listHeight[i + 1];

      if (-newY >= height1 && -newY < height2) {
        if (currentIndex !== i) {
          setIndex(i);
        }

        ctxRef.current.diff = height2 + newY;
        handleDiffChange();
        return;
      }
    }

    setIndex(listHeight.length - 2);
  };

  var changeTitle = function changeTitle() {
    if (ctxRef.current.scrollY > 0) {
      setTitle('');
      return;
    }

    var fixedTitle = data[currentIndex] ? data[currentIndex].title : '';
    setTitle(fixedTitle);
  };

  var handleDiffChange = function handleDiffChange() {
    var diff = ctxRef.current.diff;
    var fixedTop = diff > 0 && diff < TITLE_HEIGHT ? diff - TITLE_HEIGHT : 0;

    if (ctxRef.current.fixedTop === fixedTop) {
      return;
    }

    ctxRef.current.fixedTop = fixedTop;
    fixedRef.current.style.transform = "translate3d(0,".concat(fixedTop, "px,0)");
  };

  var _calculateHeight = function _calculateHeight() {
    ctxRef.current.listHeight = [];
    var list = ctxRef.current.listGroup;
    var height = 0;
    var listHeight = [height];
    list.forEach(function (item, index) {
      if (!item) {
        return;
      }

      height += item.clientHeight;
      listHeight.push(height);
    });
    ctxRef.current.listHeight = listHeight;
  };

  var _scrollTo = function _scrollTo(index) {
    var _ctxRef$current = ctxRef.current,
        listHeight = _ctxRef$current.listHeight,
        listGroup = _ctxRef$current.listGroup;

    if (!index && index !== 0) {
      return;
    }

    if (index < 0) {
      index = 0;
    } else if (index > listHeight.length - 2) {
      index = listHeight.length - 2;
    }

    ctxRef.current.scrollY = -listHeight[index];
    handleScrollYChange(ctxRef.current.scrollY);
    listViewRef.current.scrollToElement(listGroup[index], 0);
  };

  var selectItem = function selectItem(item) {
    onSelect && onSelect(item);
  };

  return /*#__PURE__*/React.createElement(Scroll, {
    className: "listview ".concat(className),
    data: data,
    probeType: probeType,
    listenScroll: listenScroll,
    handleScroll: onScroll,
    ref: listViewRef
  }, /*#__PURE__*/React.createElement("ul", null, data.map(function (group, index) {
    return /*#__PURE__*/React.createElement("li", {
      className: "list-group",
      ref: function ref(ele) {
        return ctxRef.current.listGroup[index] = ele;
      },
      key: index
    }, /*#__PURE__*/React.createElement("h2", {
      className: "list-group-title"
    }, group.title), /*#__PURE__*/React.createElement("ul", null, group.items.map(function (item, key) {
      return /*#__PURE__*/React.createElement("li", {
        className: "list-group-item",
        key: key,
        onClick: function onClick() {
          return selectItem(item);
        }
      }, renderItem ? renderItem(item) : /*#__PURE__*/React.createElement("span", {
        className: "name"
      }, item.name));
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: "list-shortcut",
    onTouchStart: onShortcutTouchStart,
    onTouchMove: onShortcutTouchMove
  }, /*#__PURE__*/React.createElement("ul", null, shortcutList.map(function (item, index) {
    var ItemCls = currentIndex === index ? 'item current' : 'item';
    return /*#__PURE__*/React.createElement("li", {
      key: item,
      "data-index": index,
      className: ItemCls
    }, item);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "list-fixed",
    ref: fixedRef
  }, fixedTitle ? /*#__PURE__*/React.createElement("div", {
    className: "fixed-title"
  }, fixedTitle) : null));
};

export default IndexList;
