import React from "react";
import {
  useGetTokenQuery,
  useGetMemeLikesQuery,
  useGetUserQuery,
} from "../app/apiSlice";
import DialogBox from "./DialogBox";
import MemeModal from "./MemeModal";
import LikeButtons from "./LikeButtons";

export function Meme({ image, meme_id, user_id }) {
  const { data: token } = useGetTokenQuery();
  const { data: likes } = useGetMemeLikesQuery({ meme_id: meme_id });
  const { data: user } = useGetUserQuery(user_id);

  return (
    <div className="card shadow m-1">
      <div className="card-header">
        {image && "Created by"} {image && user && user.username}
      </div>
      {image && <MemeModal image={image} />}
      <div className="card-body shadow">
        <div className="meme-container">
          <div className="d-flex flex-row justify-content-between w-100">
            {image && token && <LikeButtons meme_id={meme_id} />}
            <div>
              {image && likes ? likes.length : "0"}{" "}
              {image && likes && likes.length === 1
                ? "person likes this"
                : "people like this"}
            </div>
            {image && token && user && token.username === user.username && (
              <DialogBox meme_id={meme_id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
