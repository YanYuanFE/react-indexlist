import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Scroll from './scroll';
import { getData } from "./utils";
import "./index.scss";

const TITLE_HEIGHT = 30;
const ANCHOR_HEIGHT = 18;

class IndexList extends PureComponent {
  static defaultProps = {
    data: [],
  };
  static propTypes = {
    data: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {
      scrollY: -1,
      currentIndex: 0,
      diff: -1,
      fixedTitle: '',
      shortcutList: props.data.map((group) => group.title.substr(0, 1)),
    }

    this.probeType = 3;
    this.listenScroll = true;
    this.touch = {};
    this.listHeight = [];
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      setTimeout(() => {
        this._calculateHeight();
      }, 20)
    }
  }

  onShortcutTouchStart = (e) => {
    let anchorIndex = getData(e.target, 'index');
    let firstTouch = e.touches[0];
    this.touch.y1 = firstTouch.pageY;
    this.touch.anchorIndex = anchorIndex;

    this._scrollTo(anchorIndex);
  }

  onShortcutTouchMove = (e) => {
    let firstTouch = e.touches[0];
    this.touch.y2 = firstTouch.pageY;
    let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
    let anchorIndex = parseInt(this.touch.anchorIndex) + delta;

    this._scrollTo(anchorIndex);
  }

  refresh = () => {
    this.listView.refresh();
  }

  scroll = (pos) => {
    this.setState({scrollY: pos.y}, this.handleScrollYChange(pos.y))
  }

  handleScrollYChange = (newY) => {
    const listHeight = this.listHeight;

    if (newY > 0) {
      this.setState({currentIndex: 0});
      return;
    }

    for(let i = 0; i < listHeight.length -1; i++) {
      let height1 = listHeight[i];
      let height2 = listHeight[2];
      if (-newY >= height1 && -newY < height2) {
        this.setState({
          currentIndex: i,
          diff: height2 + newY
        }, this.diff);
        return;

      }
    }
    this.setState({
      currentIndex: listHeight.length - 2,
    });
  }

  diff = (newVal) => {
    let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
    if (this.fixedTop === fixedTop) {
      return
    }
    this.fixedTop = fixedTop
    this.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
  }

  _calculateHeight = () => {
    this.listHeight = [];
    const list = this.listGroup;
    let height = 0;
    this.listHeight.push(height);
    list.forEach((item, index) => {
      this.listHeight.push(height);
    })
  }

  _scrollTo = (index) => {
    if (!index && index !== 0) {
      return;
    }
    if (index < 0) {
      index = 0;
    } else if (index > this.listHeight.length - 2) {
      index = this.listHeight.length - 2
    }
    this.scrollY = -this.listHeight[index]
    this.listView.scrollToElement(this.listGroup[index], 0)
  }

  render() {
    const { data } = this.props;
    const { shortcutList, fixedTitle, currentIndex } = this.state;
    return (
      <Scroll
        className="listview"
        data={data}
        probeType={this.probeType}
        listenScroll={this.listenScroll}
        handleScroll={this.scroll}
        ref={(ref) => this.listview = ref}
      >
        <ul>
          {
            data.map((group, index) => {
              return <li className="list-group" ref={(listGroup) => this.listGroup = listGroup}>
                <h2 className="list-group-title">{group.title}</h2>
                <ul>
                  {
                    group.items.map((item, key) => (<li className="list-group-item">
                      <img src={item.avatar} alt="" className="avatar"/>
                      <span className="name">{item.name}</span>
                    </li>))
                  }
                </ul>
              </li>
            })
          }
        </ul>
        <div className="list-shortcut">
          <ul>
            {
              shortcutList.map((item, index) => <li className={classNames('item', {current: currentIndex === index})}>{item}</li>)
            }
          </ul>
        </div>
        {
          fixedTitle ? <div className="list-fixed" ref={(ref) => this.fixed = ref}>
            <div className="fixed-title">{fixedTitle}</div>
          </div> :null
        }
      </Scroll>
    );
  }
}

export default IndexList;
