import React from "react";
import Modal from "react-bootstrap/esm/Modal";

export default function SuccessModal(props) {
  const { message, show, hideSuccessModal } = props;

  return (
    <Modal show={show} onHide={hideSuccessModal} contentClassName="text-center">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>{...message}</Modal.Body>
    </Modal>
  );
}
