import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
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
        <div className="zoom__board">
          <div className="zoom__board-inner" style={this.getInnerStyle()}>
            {this.props.children}
          </div>
        </div>
      </ZoomContext.Provider>
    );
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
      }
    };
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
