"use strict";

import React from "react";

/**
 * Header Component
 */
const Navbar = (props) => (
  <div className={`header ${props.className}`}>
    <a href="/">
      <img className="logo img-responsive" src="/assets/img/logo.png" />
    </a>
  </div>
);

export default Navbar;
