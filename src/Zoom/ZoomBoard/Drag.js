import { MOUSE, TOUCH } from '../constants';
import { getInputPosition } from './event';

class Drag {
  items = null;
  position = null;
  moveX = 0;
  moveY = 0;

  constructor(zoomBoard) {
    this.instance = zoomBoard;
  }

  start = (event, id, type = MOUSE) => {
    if ((type === MOUSE && event.altKey) || type === TOUCH) {
      this.startDrag(event, id, type);
    }
  }

  /**
   * @private methods below...
   */
  startDrag(event, id, type) {
    event.preventDefault();
    event.stopPropagation();
    if (type === MOUSE) {
      window.addEventListener('mousemove', this.drag);
      window.addEventListener('mouseup', this.stopMouse);
    } else {
      window.addEventListener('touchmove', this.drag);
      window.addEventListener('touchend', this.stopTouch);
      window.addEventListener('touchcancel', this.stopTouch);
    }
    this.position = getInputPosition(event);
    this.items = this.getItems(id);
  }

  getItems(id) {
    return Array.isArray(id) ? id : [id];
  }

  drag = (event) => {
    const position = getInputPosition(event);
    const { zoom } = this.instance.state;
    this.moveX = (position.x - this.position.x) / zoom;
    this.moveY = (position.y - this.position.y) / zoom;
    this.position = position;
    this.instance.dragItems();
  }

  stopMouse = (event) => {
    window.removeEventListener('mousemove', this.drag);
    window.removeEventListener('mouseup', this.stopMouse);
    this.stop(event);
  }

  stopTouch = (event) => {
    window.removeEventListener('touchmove', this.drag);
    window.removeEventListener('touchend', this.stopTouch);
    window.removeEventListener('touchcancel', this.stopTouch);
    this.stop(event);
  }

  stop(event) {
    this.items = null;
    this.position = null;
    this.instance.stopDragItems();
  }
}

export default Drag;
