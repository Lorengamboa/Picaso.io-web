"use strict";

import React from "react";

const DrawThumbnail = props => {
  console.log(props.src);
  return (
      <img className="drawThumbnail" src={props.src} />
  );
};

export default DrawThumbnail;
