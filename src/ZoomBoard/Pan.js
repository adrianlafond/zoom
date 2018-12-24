class Pan {
  previous = null;
  approved = false;

  constructor(zoomBoard) {
    this.instance = zoomBoard;
  }

  startMouse = (event) => {
    if (this.instance.state.panningApproved) {
      window.addEventListener('mousemove', this.pan);
      window.addEventListener('mouseup', this.stopMouse);
      this.start(event);
    }
  }

  startTouch = (event) => {
    window.addEventListener('touchmove', this.pan);
    window.addEventListener('touchend', this.stopTouch);
    window.addEventListener('touchcancel', this.stopTouch);
    this.start(event);
  }

  start(event) {
    event.preventDefault();
    this.previous = this.getXY(event);
    this.instance.setState({ panning: true });
  }

  pan = (event) => {
    if (this.instance.state.panning) {
      const position = this.getXY(event);
      const element = this.instance.ref.current;
      element.scrollLeft -= position.x - this.previous.x;
      element.scrollTop -= position.y - this.previous.y;
      this.previous = position;
    }
  }

  stopMouse = () => {
    window.removeEventListener('mousemove', this.pan);
    window.removeEventListener('mouseup', this.stopMouse);
    this.stop();
  }

  stopTouch = () => {
    window.removeEventListener('touchmove', this.pan);
    window.removeEventListener('touchend', this.stopTouch);
    window.removeEventListener('touchcancel', this.stopTouch);
    this.stop();
  }

  stop() {
    if (this.instance.state.panning) {
      this.previous = null;
      this.instance.setState({ panning: false });
    }
  }

  getXY(event) {
    const eventObj = event.touches ? event.touches[0] : event;
    return { x: eventObj.clientX, y: eventObj.clientY };
  }
}

export default Pan;
