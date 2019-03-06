"use strict";

import React from "react";
import AdBlockDetect from "./AdBlockDetect";

const Advertisement = (props) => (
    <AdBlockDetect blockimg={props.blockimg}>
      <div id="afscontainer1" />
    </AdBlockDetect>
  );


export default Advertisement;
