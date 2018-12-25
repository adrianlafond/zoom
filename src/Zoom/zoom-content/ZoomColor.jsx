import React from 'react';
import PropTypes from 'prop-types';
import ZoomBaseContent from './ZoomBaseContent';
import './ZoomColor.css';

class ZoomColor extends ZoomBaseContent {
  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    color: '#808080',
  }

  render() {
    const { color } = this.props;
    return <div style={{ background: color }} className="zoom__color" />;
  }
}

export default ZoomColor;
