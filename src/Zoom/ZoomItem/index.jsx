import React, { Component } from 'react';
import ZoomContext from '../ZoomContext';
import { MOUSE, TOUCH } from '../constants';
import { propTypes, defaultProps } from './props';
import './index.css';

class ZoomItem extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextType = ZoomContext;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return this.isInViewport() && (
      <div
        ref={this.ref}
        className="zoom__item"
        style={this.getStyle()}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        >
        {this.props.children}
      </div>
    );
  }

  onMouseDown = (event) => {
    this.props.onDrag(event, this.props.uid, MOUSE);
  }

  onTouchStart = (event) => {
    this.props.onDrag(event, this.props.uid, TOUCH);
  }

  isInViewport() {
    const { x, y, width, height } = this.props;
    const { viewport: v } = this.context;
    return x + width > v.x && x < v.x + v.width && y + height > v.y && y < v.y + v.height;
  }

  getStyle() {
    const { x, y, width, height } = this.props;
    const { zoom } = this.context;
    return {
      left: `${x * zoom}px`,
      top: `${y * zoom}px`,
      width: `${width * zoom}px`,
      height: `${height * zoom}px`,
    };
  }
}

export default ZoomItem;
