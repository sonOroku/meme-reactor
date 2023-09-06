import React from "react";
import {
  useCreateLikeMutation,
  useGetTokenQuery,
  useUnlikeMutation,
} from "../app/apiSlice";

export function Meme({ image, meme_id, like_id }) {
  const [like] = useCreateLikeMutation();
  const { data: token } = useGetTokenQuery();
  const [unlike] = useUnlikeMutation();

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
    <div className="meme-container">
      {image ? (
        <img width="400" height="300" src={image} alt="placeholder" />
      ) : (
        <img
          width="400"
          height="300"
          src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
          alt="placeholder"
        />
      )}
      {image && token && !like_id && (
        <button value={meme_id} onClick={handleLike}>
          like
        </button>
      )}
      {image && token && like_id && (
        <button value={like_id} onClick={handleUnlike}>
          unlike
        </button>
      )}
    </div>
  );
}
