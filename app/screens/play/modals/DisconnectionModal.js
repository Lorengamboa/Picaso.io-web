import React from "react";

import Modal from "../../../components/Modal";
import { PrimaryButton } from "../../../components/";

const styles = {
  block: {
    width: "80%",
    margin: "0 auto",
  },
  info: {
    color: "white"
  },
  button: {
    marginTop: "1rem"
  }
};
/**
 * DisconnectionModal component
 */
const DisconnectionModal = props => {
  return (
    <Modal show={props.show}>
      <div style={styles.block}>
        <h3 style={styles.info}>
          You are about to disconnect for innactivity, would u like to
          reconnect?
        </h3>
        <PrimaryButton style={styles.button} color="blue" value="reconnect" />
        <PrimaryButton style={styles.button} color="red" value="exit" />
      </div>
    </Modal>
  );
};

export default DisconnectionModal;
