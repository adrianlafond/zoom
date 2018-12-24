import React, { Component } from 'react';
import classnames from 'classnames';
import { propTypes, defaultProps } from './props';
import Zoom from './Zoom';
import Layout from './Layout';
import Size from './Size';
import Pan from './Pan';
import * as keys from './keys';
import ZoomContext from '../ZoomContext';
import ZoomItem from '../ZoomItem';
import './index.css';

const SELECTOR = 'zoom__board';

class ZoomBoard extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  utils = null;
  children = null;

  constructor(props) {
    super(props);
    const { zoom } = props;
    this.createUtils();
    this.utils.layout.generate();
    const { width, height } = this.utils.size.reset(zoom);
    this.state = {
      width,
      height,
      zoom,
      panning: false,
      panningApproved: true,
    };
    this.ref = React.createRef();
  }

  createUtils() {
    this.utils = {
      layout: new Layout(this),
      size: new Size(this),
      pan: new Pan(this),
      zoom: new Zoom(this),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.zoom !== prevProps.zoom && this.props.zoom !== this.state.zoom) {
      this.setState({ zoom: this.props.zoom });
    }
    this.autoLayoutChange();
    if (this.props.margin !== prevProps.margin ||
        this.props.children.length !== prevProps.children.length) {
      this.setState(this.utils.size.reset());
    }
  }

  render() {
    return (
      <ZoomContext.Provider value={this.getContext()}>
        <div
          className={this.getOuterClass()}
          tabIndex="0"
          onMouseDown={this.utils.pan.startMouse}
          onTouchStart={this.utils.pan.startTouch}
          onDoubleClick={this.utils.zoom.toggle}
          onKeyDown={this.utils.zoom.keyboard}
          ref={this.ref}>
          <div className="zoom__board-inner" style={this.getInnerStyle()}>
            {this.renderChildren()}
          </div>
        </div>
      </ZoomContext.Provider>
    );
  }

  renderChildren() {
    let zoomIndex = 0;
    const layout = this.utils.layout.data;
    this.children = this.allChildren.map((item, index) => {
      if (item.type === ZoomItem) {
        const { x, y, width, height, children } = item.props;
        const useX = layout ? layout[zoomIndex].x : x;
        const useY = layout ? layout[zoomIndex].y : y;
        const key = item.key || `item-${index}`;
        zoomIndex += 1;
        return (
          <ZoomItem x={useX} y={useY} width={width} height={height} key={key}>
            {children}
          </ZoomItem>
        );
      }
      return item;
    });
    this.utils.layout.destroy();
    return this.children;
  }

  get allChildren() {
    return this.children || this.props.children;
  }

  get zoomChildren() {
    return this.allChildren.filter(item => item.type === ZoomItem);
  }

  onKeyDown = (event) => {
    if (event.keyCode === keys.SPACE) {
      this.setState({ panningApproved: true });
      event.preventDefault();
    }
  }

  autoLayoutChange() {
    if (this.props.autoLayout.onChange) {
      this.utils.layout.generate();
      this.forceUpdate();
    }
  }

  getContext() {
    const layout = this.utils.layout.data;
    const { width, height, zoom } = this.state;
    const viewport = {
      x: 0,
      y: 0,
      width: width / zoom,
      height: height / zoom,
    };
    return { zoom, layout, viewport };
  }

  getOuterClass() {
    return classnames(SELECTOR, {
      [`${SELECTOR}--panning`]: this.state.panning,
      [`${SELECTOR}--panning-approved`]: this.state.panningApproved,
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
