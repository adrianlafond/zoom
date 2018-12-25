import PropTypes from 'prop-types';

export const propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onDrag: PropTypes.func,
};

export const defaultProps = {
  x: 0,
  y: 0,
  width: 640,
  height: 480,
  onDrag: () => { },
};
