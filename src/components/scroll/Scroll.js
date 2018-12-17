import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';

class Scroll extends PureComponent {
  static defaultProps = {
    probeType: 1,
    click: true,
    listenScroll: false,
    data: [],
    pullup: false,
    beforeScroll: false,
    refreshDelay: 20,
  };
  static propTypes = {
    probeType: PropTypes.number,
    click: PropTypes.bool,
    listenScroll: PropTypes.bool,
    data: PropTypes.array,
    pullup: PropTypes.bool,
    beforeScroll: PropTypes.bool,
    refreshDelay: PropTypes.number,
  };
  componentDidMount() {
    setTimeout(() => {
      this._initScroll();
    }, 50);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      setTimeout(() => {
        this.refresh();
      }, this.props.refreshDelay);
    }
  }

  _initScroll = () => {
    const { probeType, click, listenScroll, pullup, beforeScroll, handleScroll, handleScrollToEnd, handleBeforeScroll } = this.props;
    if (!this.wrapper) {
      return;
    }
    this.scroll = new BScroll(this.wrapper, {
      probeType,
      click
    })

    if (listenScroll) {
      let me = this;
      this.scroll.on('scroll', (pos) => {
        handleScroll(pos);
      });
    }

    if (pullup) {
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          handleScrollToEnd();
        }
      })
    }

    if (beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        handleBeforeScroll();
      })
    }
  }

  disable() {
    this.scroll && this.scroll.disable();
  }

  enable() {
    this.scroll && this.scroll.enable();
  }

  refresh() {
    this.scroll && this.scroll.refresh();
  }

  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }

  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }

  render() {
    return (
      <div ref={ref => this.wrapper = ref} className={this.props.className}>
        { this.props.children }
      </div>
    );
  }
}

export default Scroll;
