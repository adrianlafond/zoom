import PropTypes from 'prop-types';

export const propTypes = {
  zoom: PropTypes.number,
  margin: PropTypes.number,
  autoLayout: PropTypes.shape({
    onInit: PropTypes.bool,
    onChange: PropTypes.bool,
    onResize: PropTypes.bool,
  }),
};

export const defaultProps = {
  zoom: 1,
  margin: 24,
  autoLayout: PropTypes.shape({
    onInit: true,
    onChange: false,
    onResize: false,
  }),
};
