import React from "react";
import { Meme } from "../components/Meme";
import { useGetAllMemesQuery } from "../app/apiSlice";

export function Home() {
  const { data: memes } = useGetAllMemesQuery();
  return (
    <div className="flex-container">
      <h2>Meme Reactor - Home Page</h2>
      {memes.length ? (
        memes.map((meme) => {
          return (
            <div key={meme.id}>
              <Meme image={meme.meme_url} />
            </div>
          );
        })
      ) : (
        <div>
          <Meme image={null} />
        </div>
      )}
    </div>
  );
}
