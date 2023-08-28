import React from "react";
import { Meme } from "../components/Meme";

export function Profile() {
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
          <div className="col">
            <Meme />
          </div>
        </div>
      </div>
    </div>
  );
}
