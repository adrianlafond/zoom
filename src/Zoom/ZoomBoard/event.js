
export function getInputPosition(event) {
  const eventObj = event.touches ? event.touches[0] : event;
  return { x: eventObj.clientX, y: eventObj.clientY };
}
