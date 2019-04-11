"use strict";

const styles = {
  color: (color, width) => {
    return {
        backgroundColor: color,
        listStyle: "none",
        width: `${width}%`,
        height: "5vh",
        float: "left",
        lineHeight: "1",
        verticalAlign: "middle",
        whiteSpace: "nowrap"
    }
  }
};

export default styles;
