import React from "react";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import Modal from "../../../components/Modal";

/**
 * ShareModal component
 */
const ShareModal = props => {
  return (
    <Modal show={props.show} handleClose={props.handleClose}>
      <FacebookShareButton url={props.url}>
        <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton url={props.url}>
        <TwitterIcon />
      </TwitterShareButton>
      <WhatsappShareButton url={props.url}>
        <WhatsappIcon />
      </WhatsappShareButton>
    </Modal>
  );
};

export default ShareModal;
