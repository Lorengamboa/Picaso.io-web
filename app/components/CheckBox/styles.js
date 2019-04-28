"use strict";

const styles = {
  block: {
    width: "200px",
    position: "relative",
    clear: "both",
    margin: "0 0 25px",
    float: "left"
  },
  input: {
    display: "none",
    ":checked + label": {
      background: "#55e868"
    },
    ":checked + label:before": {
      left: "50px"
    }
  },
  span: {
    textTransform: "uppercase",
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "15px",
    float: "right",
    width: "85px",
    margin: "16px 0 0"
  },
  label: {
    width: "100px",
    height: "50px",
    boxSizing: "border-box",
    border: "3px solid",
    float: "left",
    borderRadius: "100px",
    position: "relative",
    cursor: "pointer",
    transition: ".3s ease",
    ":before": {
      transition: ".3s ease",
      content: "",
      width: "40px",
      height: "40px",
      position: "absolute",
      background: "white",
      left: "2px",
      top: "2px",
      boxSizing: "border-box",
      border: "3px solid",
      color: "black",
      borderRadius: "100px"
    }
  }
};

export default styles;
