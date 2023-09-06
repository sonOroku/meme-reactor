import React from "react";
import { Meme } from "../components/Meme";
import { useGetUserMemesQuery, useGetLikesQuery, useGetMemeQuery } from "../app/apiSlice";
import LikedMemes from "../components/LikedMemes";

export function Profile() {
  const { data: memes } = useGetUserMemesQuery();
  const { data: likes, isLoading } = useGetLikesQuery();
  return (
    <div className="flex-container">
      <h2>User Profile</h2>

      <div>
        <h3>User's Recently Liked</h3>
        <div className="row g-3 mb-3">
          {likes && likes.length ? (
            likes.map((like) => {
              const like_id = like.id
              return (
                <div key={like_id}>
                <LikedMemes
                meme_id={like.meme_id}
                like_id={like_id}
                />
                </div>
              );
            })
              ) : (
            <div className="col">
              <Meme
              image={null}
              meme_id={null}
              like_id={null}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <h3>User's Recently Created</h3>
        <div className="row g-3 mb-3">
          {memes && memes.length ? (
            memes.map((meme) => {
              let like_id = null;
              if (likes) {
                const my_like = likes.find((like) => meme.id === like.meme_id);
                if (my_like) {
                  like_id = my_like.id;
                }
              }

              return (
                <div className="col" key={meme.id}>
                  <Meme
                    image={meme.meme_url}
                    meme_id={meme.id}
                    like_id={like_id}
                  />
                </div>
              );
            })
          ) : (
            <div className="col">
              <Meme image={null} meme_id={null} like_id={null} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
