import * as keys from './keys';

class Zoom {
  constructor(zoomBoard) {
    this.instance = zoomBoard;
  }

  keyboard = (event) => {
    const zoom = this.getZoom(event.keyCode);
    if (zoom !== -1) {
      const { width, height } = this.instance.utils.size.reset(zoom);
      this.instance.setState({ zoom, width, height });
    }
  }

  toggle = () => {
    let zoom = this.instance.state.zoom === 1.0 ? this.minZoom() : 1.0;
    const { width, height } = this.instance.utils.size.reset(zoom);
    this.instance.setState({ zoom, width, height });
  }

  getZoom(code) {
    switch (code) {
      case keys.MINUS:
        return Math.max(this.minZoom(), this.instance.state.zoom - 0.1);
      case keys.PLUS:
        return Math.min(1, this.instance.state.zoom + 0.1);
      default:
        return -1;
    }
  }

  minZoom() {
    const { margin } = this.instance.props;
    let maxX = 0;
    let maxY = 0;
    this.instance.children.forEach(item => {
      const { x, y, width, height } = item.props;
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });
    maxX += margin;
    maxY += margin;
    const element = this.instance.ref.current;
    const xRatio = element.clientWidth / maxX;
    const yRatio = element.clientHeight / maxY;
    return Math.min(xRatio, yRatio);
  }
}

export default Zoom;
