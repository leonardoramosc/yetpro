import React from "react";
import 'antd/dist/antd.css';
import { Modal } from "antd";

const CardDetailModal = (props) => {
  console.log(props);
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default CardDetailModal;
