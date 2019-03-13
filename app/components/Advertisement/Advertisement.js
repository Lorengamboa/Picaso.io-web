"use strict";

import React from "react";
import AdBlockDetect from "./AdBlockDetect";

const Advertisement = (props) => (
    <AdBlockDetect blocking={props.blocking} punishment={props.punishment}>
      <div id="afscontainer1" />
    </AdBlockDetect>
  );


export default Advertisement;
