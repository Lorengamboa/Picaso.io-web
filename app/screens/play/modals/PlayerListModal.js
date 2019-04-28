import React from "react";

import Modal from "../../../components/Modal";
import PlayerList from "../../../containers/PlayerList";

/**
 * PlayerListModal component
 */
const PlayerListModal = props => {
  return (
    <Modal
      show={props.show}
      handleClose={props.handleClose}
    >
      <PlayerList color="white" />
    </Modal>
  );
};

export default PlayerListModal;
