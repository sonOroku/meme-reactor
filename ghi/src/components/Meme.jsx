import React from "react";
import {
  useCreateLikeMutation,
  useGetTokenQuery,
  useUnlikeMutation,
  useGetMemeLikesQuery,
  useGetUserQuery,
} from "../app/apiSlice";
import DialogBox from "./DialogBox";
import MemeModal from "./MemeModal";

export function Meme({ image, meme_id, like_id, user_id }) {
  const [like] = useCreateLikeMutation();
  const { data: token } = useGetTokenQuery();
  const [unlike] = useUnlikeMutation();
  const { data: likes } = useGetMemeLikesQuery({ meme_id: meme_id });
  const { data: user } = useGetUserQuery(user_id);

  const handleLike = (event) => {
    const value = event.target.value;
    if (value) {
      like({ meme_id: value });
    }
  };

  const handleUnlike = (event) => {
    const value = event.target.value;
    if (value) {
      unlike({ like_id: value });
    }
  };

  return (
    <div className="card shadow m-1">
      <div className="card-header">
        {image && "Created by"} {image && user && user.username}
      </div>
      {image && <MemeModal image={image} />}
      <div className="card-body shadow">
        <div className="meme-container">
          <div className="d-flex flex-row justify-content-between w-100">
            {image && token && !like_id && (
              <button
                className="btn btn-primary"
                value={meme_id}
                onClick={handleLike}
              >
                Like
              </button>
            )}

            {image && token && like_id && (
              <button
                className="btn btn-secondary"
                value={like_id}
                onClick={handleUnlike}
              >
                Unlike
              </button>
            )}
            <div>
              {image && likes ? likes.length : "0"}{" "}
              {image && likes && likes.length === 1
                ? "person likes this"
                : "people like this"}
            </div>
            {image && token && <DialogBox meme_id={meme_id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
