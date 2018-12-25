import React from 'react';
import  ZoomBoard from './ZoomBoard';
import ZoomItem from './ZoomItem';
import ZoomColor from './zoom-content/ZoomColor';
import ZoomImage from './zoom-content/ZoomImage';

const Zoom = (props) => (
  <ZoomBoard {...props}>{props.children}</ZoomBoard>
);
Zoom.ZoomItem = ZoomItem;
Zoom.ZoomColor = ZoomColor;
Zoom.ZoomImage = ZoomImage;

export default Zoom;
