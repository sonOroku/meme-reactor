import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  useDeleteMemeMutation,
  useGetLikesQuery,
  useUnlikeMutation,
} from "../app/apiSlice";

function DialogBox(meme_id) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteMeme] = useDeleteMemeMutation();
  const { data: likes } = useGetLikesQuery();
  const [deleteLike] = useUnlikeMutation();

  const handleDelete = async (event) => {
    const value = event.target.value;
    if (value) {
      const matchLikes = likes.filter((like) => like.meme_id === value);
      for (let match of matchLikes) {
        await deleteLike({ like_id: match.id }).unwrap();
      }
      await deleteMeme({ meme_id: value }).unwrap();
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
