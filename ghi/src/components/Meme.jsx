import React from "react";
import { useCreateLikeMutation } from "../app/apiSlice";

export function Meme({ image, meme_id }) {
  const [like] = useCreateLikeMutation()
  const handleLike = (event) => {
    const value = event.target.value
    if (value) {
      like({meme_id: value})
    }
  }
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
      <button value={meme_id} onClick={handleLike}>like</button>
      <button>unlike</button>
    </div>
  );
}
