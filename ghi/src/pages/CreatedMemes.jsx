import React from "react";
import { Meme } from "../components/Meme";
import {
  useGetUserMemesQuery,
  useGetLikesQuery,
  useGetTokenQuery,
} from "../app/apiSlice";

export function CreatedMemes() {
  const { data: memes } = useGetUserMemesQuery();
  const { data: likes } = useGetLikesQuery();
  const { data: token } = useGetTokenQuery();

  return (
    <div className="column">
      <div>
        <h3 className="m-4">
          {token ? token.username : "User"}'s Created Memes
        </h3>
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
