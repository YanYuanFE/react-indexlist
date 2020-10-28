import React, { useRef, useEffect, useState } from 'react';
import Scroll from '../scroll/scroll';
import { getData } from '../../utils/index.js';
import './index.less';

const TITLE_HEIGHT = 30;
const ANCHOR_HEIGHT = 18;

const IndexList = ({data=[], onSelect, renderItem, className = ''}) => {
  const [currentIndex, setIndex] = useState(0);
  const [fixedTitle, setTitle] = useState('');
  const [shortcutList, setList] = useState(() => data.map((group) => group.title.substr(0, 1)));
  const listViewRef = useRef();
  const fixedRef = useRef();
  const probeType = 3;
  const listenScroll = true;
  const ctxRef = useRef({
    touch: {},
    listGroup: [],
    listHeight: [],
    scrollY: -1,
    diff: -1,
    fixedTop: 0,
  });

  useEffect(() => {
    setList(data.map((group) => group.title.substr(0, 1)));
    _calculateHeight();
  }, [data]);

  useEffect(() => {
    changeTitle();
  }, [currentIndex]);

  const onShortcutTouchStart = (e) => {
    let anchorIndex = getData(e.target, 'index');
    let firstTouch = e.touches[0];
    ctxRef.current.touch.y1 = firstTouch.pageY;
    ctxRef.current.touch.anchorIndex = anchorIndex;

    _scrollTo(anchorIndex);
  }

  const onShortcutTouchMove = (e) => {
    e.preventDefault();
    let firstTouch = e.touches[0];
    ctxRef.current.touch.y2 = firstTouch.pageY;
    let delta = (ctxRef.current.touch.y2 - ctxRef.current.touch.y1) / ANCHOR_HEIGHT | 0;
    let anchorIndex = parseInt(ctxRef.current.touch.anchorIndex, 10) + delta;

    _scrollTo(anchorIndex);
  }

  const refresh = () => {
    listViewRef.current.refresh();
  }

  const onScroll = (pos) => {
    ctxRef.current.scrollY = pos.y;
    handleScrollYChange(pos.y);
  }

  const handleScrollYChange = (newY) => {
    const listHeight = ctxRef.current.listHeight;

    if (newY > 0) {
      setIndex(0);
      return;
    }

    for(let i = 0; i < listHeight.length -1; i++) {
      let height1 = listHeight[i];
      let height2 = listHeight[i + 1];
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
  }

  const changeTitle = () => {
    if (ctxRef.current.scrollY > 0) {
      setTitle('');
      return;
    }
    const fixedTitle = data[currentIndex] ? data[currentIndex].title : '';
    setTitle(fixedTitle);
  }

  const handleDiffChange = () => {
    const diff = ctxRef.current.diff;
    let fixedTop = (diff > 0 && diff < TITLE_HEIGHT) ? diff - TITLE_HEIGHT : 0;
    if (ctxRef.current.fixedTop === fixedTop) {
      return;
    }
    ctxRef.current.fixedTop = fixedTop;
    fixedRef.current.style.transform = `translate3d(0,${fixedTop}px,0)`;
  }

  const _calculateHeight = () => {
    ctxRef.current.listHeight = [];
    const list = ctxRef.current.listGroup;

    let height = 0;
    const listHeight = [height];
    list.forEach((item, index) => {
      if (!item) {
        return;
      }
      height += item.clientHeight;
      listHeight.push(height);
    });
    ctxRef.current.listHeight = listHeight;
  }

  const _scrollTo = (index) => {
    const {listHeight, listGroup} = ctxRef.current;
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
  }

  const selectItem = (item) => {
    onSelect && onSelect(item);
  }

  return (
    <Scroll
      className={`listview ${className}`}
      data={data}
      probeType={probeType}
      listenScroll={listenScroll}
      handleScroll={onScroll}
      ref={listViewRef}
    >
      <ul>
        {
          data.map((group, index) => {
            return (
              <li className="list-group" ref={(ele) => ctxRef.current.listGroup[index] = ele} key={index}>
                <h2 className="list-group-title">{group.title}</h2>
                <ul>
                  {
                    group.items.map((item, key) => (
                      <li className="list-group-item" key={key} onClick={() => selectItem(item)}>
                        {
                          renderItem ? renderItem(item) : <span className="name">{item.name}</span>
                        }
                      </li>
                      )
                    )
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
      <div
        className="list-shortcut"
        onTouchStart={onShortcutTouchStart}
        onTouchMove={onShortcutTouchMove}
      >
        <ul>
          {
            shortcutList.map((item, index) => {
              const ItemCls = currentIndex === index ? 'item current' : 'item';
              return <li key={item} data-index={index} className={ItemCls}>{item}</li>;
            })
          }
        </ul>
      </div>
      <div className="list-fixed" ref={fixedRef}>
        {
          fixedTitle ? <div className="fixed-title">{fixedTitle}</div> : null
        }
      </div>
    </Scroll>
  );
}

export default IndexList;
