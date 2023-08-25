import React from "react";
import { Meme } from "../components/Meme";

export function Profile() {
  return (
    <div className="flex-container">
      <h2>User Profile</h2>

      <div>
        <h3>User's Recently Liked</h3>
        <Meme />
      </div>

      <div>
        <h3>User's Recently Created</h3>
        <Meme />
      </div>
    </div>
  );
}
