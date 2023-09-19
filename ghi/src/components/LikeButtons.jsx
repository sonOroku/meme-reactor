/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  useGetLikesQuery,
  useCreateLikeMutation,
  useUnlikeMutation,
} from "../app/apiSlice";

export default function LikeButtons({ meme_id }) {
  const { data: likes } = useGetLikesQuery();
  const [like_id, setLikeId] = useState("");
  const [like] = useCreateLikeMutation();
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
      setLikeId("");
    }
  };

  useEffect(() => {
    if (likes) {
      const match = likes.find((like) => like.meme_id === meme_id);
      if (match) {
        setLikeId(match.id);
      }
    }
  }, [likes]);

  return (
    <>
      {!like_id && (
        <button
          className="btn btn-primary"
          value={meme_id}
          onClick={handleLike}
        >
          Like
        </button>
      )}

      {like_id && (
        <button
          className="btn btn-secondary"
          value={like_id}
          onClick={handleUnlike}
        >
          Unlike
        </button>
      )}
    </>
  );
}
