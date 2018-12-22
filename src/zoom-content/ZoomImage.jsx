import React from 'react';
import PropTypes from 'prop-types';
import ZoomBaseContent from './ZoomBaseContent';

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
    return <img src={src} alt={alt || src} style={this.getStyle()}/>;
  }

  getStyle() {
    const { zoom } = this.context;
    return {
      transform: `scale(${zoom})`,
      transformOrigin: '0 0',
    };
  }
}

export default ZoomImage;
