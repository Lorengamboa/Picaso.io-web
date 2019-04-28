import React from "react";
import styles from "./styles";
import { PrimaryButton } from "../../components";

/**
 * Modal component
 * @param {*} param0
 */
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? styles.bmodal : styles.hmodal;
  return (
    <div style={{ ...showHideClassName, ...styles.modal }}>
      <div style={styles.content}>
        {children}
        {handleClose && (
          <div style={styles.closeBtn}>
            <PrimaryButton
              color="purple"
              className="btn-roundy"
              value="general.close"
              onClick={handleClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
