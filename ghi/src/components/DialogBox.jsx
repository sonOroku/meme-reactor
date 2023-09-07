import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDeleteMemeMutation } from "../app/apiSlice";

function DialogBox(meme_id) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteMeme] = useDeleteMemeMutation();

  const handleDelete = (event) => {
    const value = event.target.value;
    if (value) {
      deleteMeme({ meme_id: value });
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this awesome meme?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, keep meme.
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            value={meme_id.meme_id}
          >
            Yes, delete meme.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DialogBox;
