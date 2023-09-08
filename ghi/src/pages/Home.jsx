import React from "react";
import { Meme } from "../components/Meme";
import { useGetAllMemesQuery, useGetLikesQuery } from "../app/apiSlice";

export function Home() {
  const { data: memes } = useGetAllMemesQuery();
  const { data: likes } = useGetLikesQuery();

  return (
    <div className="column">
      <h2 className="mt-3">Meme Reactor - Home Page</h2>
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
              <div key={meme.id}>
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
          <div>
            <p>So empty... Create a meme!</p>
          </div>
        )}
      </div>
    </div>
  );
}
