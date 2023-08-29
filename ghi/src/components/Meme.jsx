import React from "react";

export function Meme({ image }) {
    console.log(image)
  return (
    <div className="meme-container">
      { image ?
      (<img
        width="400"
        height="300"
        src={ image }
        alt="placeholder"
      />) :
      (<img
        width="400"
        height="300"
        src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
        alt="placeholder"
      />)
      }

    </div>
  );
};
