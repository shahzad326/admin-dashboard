import React from "react";
import { Modal } from "antd";

const CustomModel = (props) => {
  const { open, hideModel, performAction, title } = props;
  return (
    <div>
      <Modal
        title="Modal"
        open={open}
        onOk={performAction}
        onCancel={hideModel}
        okText="Ok"
        cancelText="Cancel"
      >
        <p> {title} </p>
      </Modal>
    </div>
  );
};

export default CustomModel;
