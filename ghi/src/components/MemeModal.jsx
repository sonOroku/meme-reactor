import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function MemeModal({ image }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(image);
  return (
    <>
      <img
        onClick={handleShow}
        width="400"
        height="300"
        src={image}
        alt="meme"
      />

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <img className="mx-auto" src={image} alt="meme" />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MemeModal;
