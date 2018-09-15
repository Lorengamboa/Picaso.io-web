"use strict";

import React from "react";
import { Image } from 'semantic-ui-react'

const DrawThumbnail = props => {
  return (
      <Image src={props.src} size='big' bordered   />
  );
};

export default DrawThumbnail;
