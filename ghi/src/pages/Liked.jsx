import React from "react";
import { Meme } from "../components/Meme";

export function Liked() {
  return (
    <div className="flex-container">
      <h2>User's Liked Memes</h2>

      <div>
        <Meme />
      </div>
    </div>
  );
}
