import React from "react";
import { Meme } from "../components/Meme";

export function Home() {
  return (
    <div className="flex-container">
      <h2>Meme Reactor - Home Page</h2>

      <div>
        <Meme />
      </div>
    </div>
  );
}
