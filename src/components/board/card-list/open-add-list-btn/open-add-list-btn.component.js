import React from "react";
import './open-add-list-btn.styles.scss';

const OpenAddListBtn = (props) => {
  return (
    <button { ...props } className={`open-add-list ${props.className}`} >
      <i className="medium material-icons">add</i>
      Añada una lista
    </button>
  );
};


export default OpenAddListBtn;