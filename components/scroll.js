import React, { PureComponent } from 'react';
import BScroll from 'better-scroll';

class Scroll extends PureComponent {
  componentDidMount() {
    this._initScroll();
  }

  _initScroll() {
    const { probeType, click, listenScroll } = this.props;
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

      })
    }
  }
  render() {
    return (
      <div ref={ref => this.wrapper = ref}>
        { this.props.children }
      </div>
    );
  }
}

export default Scroll;
