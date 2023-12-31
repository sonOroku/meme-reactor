import React from "react";
import { Meme } from "../components/Meme";
import { useGetAllMemesQuery } from "../app/apiSlice";

export function Home() {
  const { data: memes } = useGetAllMemesQuery();

  return (
    <div className="column">
      <h2 className="mt-3">MemeReactor - Home Page</h2>
      <div className="d-flex flex-row flex-wrap gap-6">
        {memes && memes.length ? (
          memes.map((meme) => {
            return (
              <div key={meme.id}>
                <Meme
                  image={meme.meme_url}
                  meme_id={meme.id}
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
