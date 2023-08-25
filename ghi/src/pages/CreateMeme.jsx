import React from "react";
import { Meme } from "../components/Meme";

export function CreateMeme() {
  return (
    <div className="flex-container">
      <h2>Generate a Meme</h2>

      <form action="submit">
        <select className="meme-template" id="template-id">
          <option value="">Select a template</option>
        </select>
        <input type="text" id="text0" />
        <input type="text" id="text1" />
        <button>Generate</button>
        <button>Reset</button>
      </form>
    </div>
  );
}
