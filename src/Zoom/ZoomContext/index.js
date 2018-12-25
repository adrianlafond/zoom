import React from 'react';

const defaults = {
  zoom: 1.0,
  layout: null,
  viewport: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
};
export default React.createContext(defaults);
