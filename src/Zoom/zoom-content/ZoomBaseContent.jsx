import { Component } from 'react';
import ZoomContext from '../ZoomContext';

class ZoomBaseContent extends Component {
  static contextType = ZoomContext;

  render() {
    return null;
  }
}

export default ZoomBaseContent;
