import React from 'react';
import PropTypes from 'prop-types';
import ZoomBaseContent from './ZoomBaseContent';
import './ZoomImage.css';

class ZoomImage extends ZoomBaseContent {
  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
  }

  static defaultProps = {
    src: '',
    alt: '',
  }

  render() {
    const { src, alt } = this.props;
    return <img
      src={src}
      alt={alt || src}
      style={this.getStyle()}
      className="zoom__image"
    />;
  }

  onPreventDefault(event) {
    event.preventDefault();
  }

  getStyle() {
    const { zoom } = this.context;
    return { transform: `scale(${zoom})` };
  }
}

export default ZoomImage;
