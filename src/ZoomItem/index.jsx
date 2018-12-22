import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ZoomContext from '../ZoomContext';
import './index.css';

class ZoomItem extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    x: 0,
    y: 0,
    width: 640,
    height: 480,
  }

  static contextType = ZoomContext;

  render() {
    return this.isInViewport() && (
      <div className="zoom__item" style={this.getStyle()}>
        {this.props.children}
      </div>
    );
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
