"use strict";

import React from "react";
import { PrimaryButton } from "../../components";

/**
 * Menubutton functional component
 */
const MenuButton = ({actions}) => {
  return (
    <div>
      <PrimaryButton
        color="red"
        className="btn-roundy"
        value="home.btn1"
        onClick={actions[0]}
      />
      <PrimaryButton
        disabled
        color="green"
        className="btn-roundy"
        value="home.btn2"
        onClick={actions[1]}
      />
      <PrimaryButton
        color="blue"
        className="btn-roundy"
        value="home.btn3"
        onClick={actions[2]}
      />
      <PrimaryButton
        color="purple"
        className="btn-roundy"
        value="home.btn4"
        onClick={actions[3]}
      />
      {/* <PrimaryButton
        color="grey"
        className="btn-roundy"
        value="home.btn5"
        onClick={actions[4]}
      /> */}
    </div>
  );
};

export default MenuButton;
