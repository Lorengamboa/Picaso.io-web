import React from "react";

import Modal from "../../../components/Modal";
import Chat from "../../../containers/Chat";

/**
 * ChatModal component
 */
const ChatModal = props => {
  return (
    <Modal show={props.show} handleClose={props.handleClose}>
      <Chat />
    </Modal>
  );
};

export default ChatModal;
