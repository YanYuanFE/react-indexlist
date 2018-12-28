import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Scroll from '../scroll/scroll';
import { getData } from '../../utils/index.js';
import './index.less';

const TITLE_HEIGHT = 30;
const ANCHOR_HEIGHT = 18;

class IndexList extends PureComponent {
  static defaultProps = {
    data: [],
  };
  static propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      fixedTitle: '',
      shortcutList: props.data.map((group) => group.title.substr(0, 1)),
    }
    console.log(props.data.map((group) => group.title.substr(0, 1)));

    this.diff = -1;
    this.scrollY = -1;
    this.probeType = 3;
    this.listenScroll = true;
    this.touch = {};
    this.listHeight = [];
    this.listGroup = [];
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      this.setState({shortcutList: nextProps.data.map((group) => group.title.substr(0, 1))})
      setTimeout(() => {
        this._calculateHeight();
      }, 20)
    }
  }

  componentDidMount() {
    this._calculateHeight();
  }

  onShortcutTouchStart = (e) => {
    let anchorIndex = getData(e.target, 'index');
    let firstTouch = e.touches[0];
    this.touch.y1 = firstTouch.pageY;
    this.touch.anchorIndex = anchorIndex;

    this._scrollTo(anchorIndex);
  }

  onShortcutTouchMove = (e) => {
    e.preventDefault();
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
    this.scrollY = pos.y;
    this.handleScrollYChange(pos.y);
  }

  handleScrollYChange = (newY) => {
    const listHeight = this.listHeight;
    const { currentIndex } = this.state;

    if (newY > 0) {
      this.setState({currentIndex: 0}, this.changeTitle);
      return;
    }

    for(let i = 0; i < listHeight.length -1; i++) {
      let height1 = listHeight[i];
      let height2 = listHeight[i + 1];
      if (-newY >= height1 && -newY < height2) {
        console.log(this.state.currentIndex, i);
        if (currentIndex !== i) {
          this.setState({
            currentIndex: i,
          }, this.changeTitle);
        }
        this.diff = height2 + newY;
        this.handleDiffChange();
        return;

      }
    }
    this.setState({
      currentIndex: listHeight.length - 2,
    }, this.changeTitle);
  }

  changeTitle = () => {
    const { data } = this.props;
    const { currentIndex } = this.state;
    if (this.scrollY > 0) {
      this.setState({fixedTitle: ''});
      return;
    }
    const fixedTitle = data[currentIndex] ? data[currentIndex].title : '';
    console.log(fixedTitle);
    this.setState({fixedTitle});
  }

  handleDiffChange = () => {
    const diff = this.diff;
    let fixedTop = (diff > 0 && diff < TITLE_HEIGHT) ? diff - TITLE_HEIGHT : 0;
    if (this.fixedTop === fixedTop) {
      return;
    }
    this.fixedTop = fixedTop;
    this.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
  }

  _calculateHeight = () => {
    this.listHeight = [];
    const list = this.listGroup;

    let height = 0;
    this.listHeight.push(height);
    list.forEach((item, index) => {
      height += item.clientHeight;
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

  selectItem = (item) => {
    const { onSelect } = this.props;

    onSelect && onSelect(item);
  }

  render() {
    const { data } = this.props;
    const { shortcutList, fixedTitle, currentIndex } = this.state;
    console.log(fixedTitle);

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
              return <li className="list-group" ref={(listGroup) => this.listGroup[index] = listGroup} key={index}>
                <h2 className="list-group-title">{group.title}</h2>
                <ul>
                  {
                    group.items.map((item, key) => (
                      <li className="list-group-item" key={key} onClick={this.selectItem(item)}>
                        {
                          item.avatar ?
                            <img src={item.avatar} alt="" className="avatar"/> : null
                        }
                        <span className="name">{item.name}</span>
                      </li>
                      )
                    )
                  }
                </ul>
              </li>
            })
          }
        </ul>
        <div
          className="list-shortcut"
          onTouchStart={this.onShortcutTouchStart}
          onTouchMove={this.onShortcutTouchMove}
        >
          <ul>
            {
              shortcutList.map((item, index) => <li key={item} className={classNames('item', {current: currentIndex === index})}>{item}</li>)
            }
          </ul>
        </div>
        <div className="list-fixed" ref={(ref) => this.fixed = ref}>
          {
            fixedTitle ? <div className="fixed-title">{fixedTitle}</div> : null
          }
        </div>
      </Scroll>
    );
  }
}

export default IndexList;
