import React from "react";
import { Modal, Header, Icon, Button } from "semantic-ui-react";

const GeneralModal = props => {
  return (
    <Modal basic open={props.visibility}>
      <Header icon="server" content={props.title} />
      <Modal.Content>
        <p>
          {props.content}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="green" inverted>
          <Icon name="remove" /> {props.btn1}
        </Button>
        <Button color="red" inverted onClick={props.action2}>
          <Icon name="checkmark" /> {props.btn2}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default GeneralModal;
