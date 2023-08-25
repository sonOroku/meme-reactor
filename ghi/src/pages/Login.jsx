import React from "react";
import { Meme } from "../components/Meme";

export function Login() {
  return (
    <div className="flex-container">
      <h2>Login</h2>

      <form action="submit">
        <input type="text" id="username" placeholder="Enter your username..." />
        <input type="text" id="password" placeholder="Enter your password..." />
        <button>Login</button>
      </form>
    </div>
  );
}
