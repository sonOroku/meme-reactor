import React from "react";
import { Meme } from "../components/Meme";

export function CreatedMemes() {
  return (
    <div className="flex-container">
      <h2>User's Created Memes</h2>

      <div>
        <Meme />
      </div>
    </div>
  );
}
