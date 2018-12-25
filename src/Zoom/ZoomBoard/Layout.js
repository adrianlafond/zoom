class Layout {
  constructor(zoomBoard) {
    this.instance = zoomBoard;
    this.data = null;
  }

  getMaxWidth() {
    const { margin } = this.instance.props;
    const children = this.instance.zoomChildren;
    const max = children.reduce((tmp, item) => {
      tmp.widest = Math.max(tmp.widest, item.props.width);
      tmp.total += item.props.width + margin;
      return tmp;
    }, { widest: 0, total: 0 });
    return Math.max(max.widest + margin, max.total / children.length);
  }

  generate() {
    const { margin } = this.instance.props;
    const maxWidth = this.getMaxWidth();
    let x = margin;
    let y = margin;
    let tmpY = y;
    this.data = this.instance.zoomChildren.map(item => {
      const position = { x, y };
      x += item.props.width + margin;
      tmpY = Math.max(tmpY, y + item.props.height);
      if (x >= maxWidth) {
        y = tmpY + margin;
        tmpY = y;
        x = margin;
      }
      return position;
    });
  }

  destroy() {
    this.data = null;
  }
}

export default Layout;
