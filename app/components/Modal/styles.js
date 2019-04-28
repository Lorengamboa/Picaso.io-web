"use strict";

const styles = {
  modal: {
    zIndex: "1",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.82)"
  },
  content: {
    position: "fixed",
    width: "80%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  bmodal: {
    display: "block"
  },
  hmodal: {
    display: "none"
  },
  closeBtn: {
    marginTop: "1rem"
  }
};

export default styles;
