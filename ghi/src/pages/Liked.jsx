import React from "react";
import { useGetLikesQuery, useGetTokenQuery } from "../app/apiSlice";
import LikedMemes from "../components/LikedMemes";

export function Liked() {
  const { data: likes } = useGetLikesQuery();
  const { data: token } = useGetTokenQuery();

  return (
    <div className="column">
      <div>
        <h3 className="m-4">{token ? token.username : "User"}'s Liked</h3>
        <div className="d-flex flex-row flex-wrap gap-6">
          {likes && likes.length ? (
            likes.map((like) => {
              const like_id = like.id;
              return (
                <div key={like_id}>
                  <LikedMemes meme_id={like.meme_id} like_id={like_id} />
                </div>
              );
            })
          ) : (
            <div className="col-auto">
              <p>You haven't liked any memes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
