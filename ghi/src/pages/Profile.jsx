import React from "react";
import { Meme } from "../components/Meme";
import {
  useGetUserMemesQuery,
  useGetLikesQuery,
  useGetTokenQuery,
} from "../app/apiSlice";
import LikedMemes from "../components/LikedMemes";

export function Profile() {
  const { data: memes } = useGetUserMemesQuery();
  const { data: likes } = useGetLikesQuery();
  const { data: token } = useGetTokenQuery();

  return (
    <div className="column">
      <h2 className="mt-3">{token ? token.username : "User"} Profile</h2>

      <div>
        <h3 className="m-4">User's Recently Liked</h3>
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

      <div>
        <h3 className="m-4">User's Recently Created</h3>
        <div className="d-flex flex-row flex-wrap gap-6">
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
                <div className="col-auto" key={meme.id}>
                  <Meme
                    image={meme.meme_url}
                    meme_id={meme.id}
                    like_id={like_id}
                    user_id={meme.created_by}
                  />
                </div>
              );
            })
          ) : (
            <div className="col-auto">
              <p>You have not yet created any memes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
