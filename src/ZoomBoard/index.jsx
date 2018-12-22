import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ZoomContext from '../ZoomContext';
import './index.css';

class ZoomBoard extends Component {
  static propTypes = {
    zoom: PropTypes.number,
    margin: PropTypes.number,
  };

  static defaultProps = {
    zoom: 1,
    margin: 10,
  };

  prevClient = null;

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, dragging: false };
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.resetSize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.margin !== prevProps.margin ||
        this.props.children.length !== prevProps.children.length) {
      this.resetSize();
    }
  }

  resetSize() {
    const { margin, zoom } = this.props;
    const size = this.props.children.reduce((tmp, item) => {
      tmp.width = Math.max(tmp.width, item.props.x + item.props.width);
      tmp.height = Math.max(tmp.height, item.props.y + item.props.height);
      return tmp;
    }, { width: 0, height: 0 });
    size.width *= zoom;
    size.height *= zoom;
    size.width += margin;
    size.height += margin;
    this.setState(size);
  }

  render() {
    return (
      <ZoomContext.Provider value={this.getContext()}>
        <div
          className={this.getOuterClass()}
          tabIndex="0"
          onMouseDown={this.onStartDragMouse}
          onTouchStart={this.onStartDragTouch}
          ref={this.ref}>
          <div className="zoom__board-inner" style={this.getInnerStyle()}>
            {this.props.children}
          </div>
        </div>
      </ZoomContext.Provider>
    );
  }

  onStartDragMouse = (event) => {
    event.preventDefault();
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('mouseup', this.onStopDragMouse);
    this.onStartDrag(event);
  }

  onStartDragTouch = (event) => {
    window.addEventListener('touchmove', this.onDrag);
    window.addEventListener('touchend', this.onStopDragTouch);
    window.addEventListener('touchcancel', this.onStopDragTouch);
    this.onStartDrag(event);
  }

  onStartDrag = (event) => {
    this.setState({ dragging: true });
  }

  onDrag = (event) => {
    if (this.state.dragging) {
      const eventObj = event.touches ? event.touches[0] : event;
      if (this.prevClient) {
        this.ref.current.scrollLeft -= (eventObj.clientX - this.prevClient.x);
        this.ref.current.scrollTop -= eventObj.clientY - this.prevClient.y;
      }
      this.prevClient = { x: eventObj.clientX, y: eventObj.clientY };
    }
  }

  onStopDragMouse = (event) => {
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('mouseup', this.onStopDragMouse);
    this.onStopDrag(event);
  }

  onStopDragTouch = (event) => {
    window.removeEventListener('touchmove', this.onDrag);
    window.removeEventListener('touchend', this.onStopDragTouch);
    window.removeEventListener('touchcancel', this.onStopDragTouch);
    this.onStopDrag(event);
  }

  onStopDrag = (event) => {
    if (this.state.dragging) {
      this.prevClient = null;
      this.setState({ dragging: false });
    }
  }

  getContext() {
    const { zoom } = this.props;
    const { width, height } = this.state;
    return { zoom,
      viewport: {
        x: 0,
        y: 0,
        width: width / zoom,
        height: height / zoom,
      },
    };
  }

  getOuterClass() {
    return cx('zoom__board', {
      'zoom__board--dragging': this.state.dragging,
    });
  }

  getInnerStyle() {
    const { width, height } = this.state;
    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  }
}

export default ZoomBoard;
