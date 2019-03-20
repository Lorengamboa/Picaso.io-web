'use strict'

/**
 * 
 * @param {s} msg 
 */
function isBlank(msg) {
  if(!msg || /^\s*$/.test(msg)) return true;

  return false;
}


/**
 *
 * @param {*} nickname
 */
function valiteNickname(nickname) {
  if (nickname === '' || nickname.length > 20) return false;
  return true;
}

function color_to_rgba(color) {
  if (color[0] == "#") {
    // hex notation
    color = color.replace("#", "");
    var bigint = parseInt(color, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return {
      r: r,
      g: g,
      b: b,
      a: 255
    };
  } else if (color.indexOf("rgba(") == 0) {
    // already in rgba notation
    color = color
      .replace("rgba(", "")
      .replace(" ", "")
      .replace(")", "")
      .split(",");
    return {
      r: color[0],
      g: color[1],
      b: color[2],
      a: color[3] * 255
    };
  } else {
    console.error("warning: can't convert color to rgba: " + color);
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };
  }
}

module.exports = {
  valiteNickname,
  isBlank,
  color_to_rgba
}
