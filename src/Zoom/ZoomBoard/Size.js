class Size {
  constructor(zoomBoard) {
    this.instance = zoomBoard;
  }

  reset(zoom = this.instance.state.zoom) {
    const layout = this.instance.utils.layout.data;
    const size = this.instance.zoomChildren.reduce((tmp, item, index) => {
      const x = layout ? layout[index].x : item.props.x;
      const y = layout ? layout[index].y : item.props.y;
      tmp.width = Math.max(tmp.width, x + item.props.width);
      tmp.height = Math.max(tmp.height, y + item.props.height);
      return tmp;
    }, { width: 0, height: 0 });
    this.addMargin(size);
    this.addZoom(size, zoom);
    return size;
  }

  /**
   * @private mthods below...
   */
  addMargin(size) {
    const { margin } = this.instance.props;
    size.width += margin;
    size.height += margin;
  }

  addZoom(size, zoom) {
    size.width *= zoom;
    size.height *= zoom;
  }
}

export default Size;
