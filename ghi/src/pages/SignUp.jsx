import React from "react";
import { Meme } from "../components/Meme";

export function SignUp() {
  return (
    <div className="flex-container">
      <h2>Sign Up</h2>

      <form action="submit">
        <input type="text" id="username" placeholder="Enter your username..." />
        <input type="text" id="email" placeholder="Enter your email..." />
        <input type="text" id="password" placeholder="Enter your password..." />
        <input
          type="text"
          id="password-confirmation"
          placeholder="Confirm your password..."
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}
