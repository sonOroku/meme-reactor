import React from "react";
import { Meme } from "../components/Meme";
import { useGetUserMemesQuery } from "../app/apiSlice";

export function Profile() {
  const {data: memes} = useGetUserMemesQuery()
  return (
    <div className="flex-container">
      <h2>User Profile</h2>

      <div>
        <h3>User's Recently Liked</h3>
        <div className="row g-3 mb-3">
          <div className="col">
            <Meme />
          </div>
          <div className="col">

          </div>
        </div>
      </div>

      <div>
        <h3>User's Recently Created</h3>
        <div className="row g-3 mb-3">
          {memes && memes.map(meme => {
          return (<div className="col" key={meme.id}>
            <Meme image={meme.meme_url} meme_id={meme.id}/>
          </div>)})}
        </div>
      </div>
    </div>
  );


}
