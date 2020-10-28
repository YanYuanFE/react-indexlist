import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import BScroll from 'better-scroll';

const Scroll = forwardRef(({
                             probeType = 1, click = true, listenScroll = false,
                             data = [], pullup = false, beforeScroll = false, refreshDelay = 20,
                             children, className,
                             handleScroll, handleScrollToEnd, handleBeforeScroll
                           }, ref) => {
  const wrapperRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    _initScroll();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, refreshDelay)
  }, [data]);

  const _initScroll = () => {
    if (!wrapperRef.current) {
      return;
    }
    scrollRef.current = new BScroll(wrapperRef.current, {
      probeType,
      click
    })

    if (listenScroll) {
      scrollRef.current.on('scroll', (pos) => {
        handleScroll(pos);
      });
    }

    if (pullup) {
      scrollRef.current.on('scrollEnd', () => {
        if (scrollRef.current.y <= (scrollRef.current.maxScrollY + 50)) {
          handleScrollToEnd();
        }
      })
    }

    if (beforeScroll) {
      scrollRef.current.on('beforeScrollStart', () => {
        handleBeforeScroll();
      })
    }
  }

  const refresh = () => {
    scrollRef.current && scrollRef.current.refresh();
  }

  useImperativeHandle(ref, () => ({
    disable: () => {
      scrollRef.current && scrollRef.current.disable();
    },
    enable: () => {
      scrollRef.current && scrollRef.current.enable();
    },
    refresh,
    scrollTo: (...args) => {
      scrollRef.current && scrollRef.current.scrollTo.apply(scrollRef.current, args);
    },
    scrollToElement: (...args) => {
      scrollRef.current && scrollRef.current.scrollToElement.apply(scrollRef.current, args);
    }
  }));

  return (
      <div ref={wrapperRef} className={className}>
        { children }
      </div>
  );
});

export default Scroll;
