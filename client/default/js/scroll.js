window.SuperScroll = function(element, options) {

  // return immediately if element doesn't exist
  if (!element) return null;

  var _this = this;

  // retreive options
  this.options = options || {};
  this.index = this.options.startSlide || 0;
  this.speed = this.options.speed || 300;
  this.callback = this.options.callback || function() {};
  this.delay = this.options.auto || 0;
  this.xScrollBar = this.options.xScrollBar || null;
  this.yScrollBar = this.options.yScrollBar || null;

  this.offset = {
    x: 0,
    y: 0
  };

  // reference dom elements
  this.element = element; // the slide pane
  this.container = element.parentElement;

  // static css
  this.container.style.overflow = 'hidden';
  this.element.style.listStyle = 'none';

  this.width = this.element.getBoundingClientRect().width;

  // add event listeners
  if (this.element.addEventListener) {
    this.element.addEventListener('mousedown', this, false);
    this.element.addEventListener('touchstart', this, false);

    this.element.addEventListener('mousemove', this, false);
    this.element.addEventListener('touchmove', this, false);

    document.addEventListener('mouseup', this, false);
    document.addEventListener('touchend', this, false);

    this.element.addEventListener('webkitTransitionEnd', this, false);
    this.element.addEventListener('msTransitionEnd', this, false);
    this.element.addEventListener('oTransitionEnd', this, false);
    this.element.addEventListener('transitionend', this, false);

    document.addEventListener('selectstart', this, false);

    window.addEventListener('resize', this, false);
  }

};

SuperScroll.prototype = {

  scrollTo: function(x, y) {

    var style = this.element.style;


    // fallback to default speed
    duration = this.speed;

    // set duration speed (0 represents 1-to-1 scrolling)
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';

    // translate to given index position
    style.MozTransform = style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px,0)';

    if(this.yScrollBar) {
      style = this.yScrollBar.style;
      style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
      style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';
    }
    if(this.xScrollBar) {
      style = this.xScrollBar.style; 
      style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
      style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';
    }

  },

  handleEvent: function(e) {
    switch (e.type) {
      case 'mousedown':
      case 'touchstart': this.onTouchStart(e); break;

      case 'mousemove':
      case 'touchmove': this.onTouchMove(e); break;

      case 'mouseup':
      case 'touchend': this.onTouchEnd(e); break;

      case 'webkitTransitionEnd':
      case 'msTransitionEnd':
      case 'oTransitionEnd':
      case 'transitionend': this.transitionEnd(e); break;

      case 'selectstart': e.preventDefault(); break;

      //case 'resize': this.setup(); break;
    }
  },

  transitionEnd: function(e) {
    
    if (this.delay) this.begin();

    this.callback(e, this.index, this.element);

  },

  onTouchStart: function(e) {
    
    this.scrolling = true;

    var pageX = e.pageX,
      pageY = e.pageY,
      outerBox = this.container.getBoundingClientRect(),
      box = this.element.getBoundingClientRect();

    this.offset.x = pageX - (box.left - outerBox.left);
    this.offset.y = pageY - (box.top - outerBox.top);

    this.element.style.webkitTransitionDuration = 0;
    if(this.yScrollBar) this.yScrollBar.style.webkitTransitionDuration = 0;
    if(this.xScrollBar) this.xScrollBar.style.webkitTransitionDuration = 0;
  },

  onTouchMove: function(e) {

    // ensure swiping with one touch and not pinching
    if(this.scrolling) {

      var pageX = e.pageX,
        pageY = e.pageY;
      
      this.deltaX = (pageX - this.offset.x);
      this.deltaY = (pageY - this.offset.y);

      this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(' + this.deltaX + 'px,' + this.deltaY + 'px,0)';
      if(this.yScrollBar) {
        this.yScrollBar.style.webkitTransform = 'translate3d(0,' + this.deltaY + 'px,0)';
      }
      if(this.xScrollBar) {
        this.xScrollBar.style.webkitTransform = 'translate3d(' + this.deltaX + 'px,0,0)';
      }
    }
  },

  onTouchEnd: function(e) {

    if(this.scrolling) {

      var outerBox = this.container.getBoundingClientRect(),
        innerBox = this.element.getBoundingClientRect(),
        x = this.deltaX,
        y = this.deltaY;

      if(innerBox.right > outerBox.right) {
        x = 0;
      }
      if(innerBox.width < outerBox.width || innerBox.left < outerBox.left) {
        x = 0;
      }
      if(innerBox.bottom < outerBox.bottom) {
        y = (outerBox.bottom - innerBox.height) - outerBox.top;
      }

      this.scrollTo(x, y);

      this.scrolling = false;

    }
  }

};
