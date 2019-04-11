"use strict";

const styles = {
  player: (color) => {
    return {
      borderTop: `solid 3px ${color}`,
      marginBottom: "10px",
      width: "100%",
      display: "inline-block",
      padding: "10px",
      background: "#fff",
      boxShadow:
        "2px 2px 6px 0px rgba(0,0,0,0.75)"
    }
  },
  image: {
    padding: ".3em",
    marginRight: "20px",
    border: "solid 1px",
    borderRadius: "50%",
    float: "left",
  },
  content: {
    margin: "5px 10px",
    fontSize: ".7em",
    fontFamily: "'Press Start 2P', cursive",
  },
  span: {
    display: "block"
  }
};

export default styles;
