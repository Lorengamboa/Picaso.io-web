"use strict";

import React from "react";
import Modal from "../../components/Modal";

const styles = {
  content: {
    color: "white",
    textAlign: "center"
  }
}
/**
 * 
 * @param {*} props 
 */
const GameLoader = (props) => {
  return (
      (<Modal show={props.loading}>
         <h2 style={styles.content}>{props.content}</h2>
      </Modal>)
  );
};

export default GameLoader;


