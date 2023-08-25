import React from "react";

export function Login() {
  return (
    <div className="flex-container">
      <h2>Login</h2>

      <form action="submit">
        <div className="row mb-3">
          <label htmlFor="username">Username</label>
          <div className="col-sm-10">
            <input
              type="text"
              id="username"
              placeholder="Enter your username..."
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password">Password</label>
          <div className="col-sm-10">
            <input
              type="text"
              id="password"
              placeholder="Enter your password..."
            />
          </div>
        </div>

        <button>Login</button>
      </form>
    </div>
  );
}
