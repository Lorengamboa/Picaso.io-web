import React from "react";

/**
 * Footer component
 */
const GameHeader = props => {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "solid 1px black",
        fontFamily: "'Press Start 2P', cursive",
        textAlign: "center"
      }}
    >
      <span>{props.keyword ? `${props.keyword}` : null}</span>
      <span style={{ float: "right", fontSize: "10px" }}> Round {props.round}/10</span>
    </div>
  );
};

export default GameHeader;
