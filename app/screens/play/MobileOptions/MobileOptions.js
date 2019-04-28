import React from "react";
import { CircleButton } from "../../../components";

const MobileOptions = (props) => {
  return (
    <div className="mobileoptions" style={{ textAlign: "center", display: "none"}}>
      <CircleButton onClick={props.actions[0]} icon="http://pinhais.ifpr.edu.br/wp-content/uploads/2017/07/get-in-touch-icon.png" />
      <CircleButton onClick={props.actions[1]} icon="https://image.flaticon.com/icons/png/512/33/33308.png" />
      <CircleButton icon="https://image.flaticon.com/icons/svg/61/61020.svg" />
    </div>
  );
};

export default MobileOptions;
