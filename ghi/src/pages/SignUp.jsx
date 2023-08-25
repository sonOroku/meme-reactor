import React from "react";

export function SignUp() {
  return (
    <div className="flex-container">
      <h2>Sign Up</h2>

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
          <label htmlFor="email">Email</label>
          <div className="col-sm-10">
            <input type="text" id="email" placeholder="Enter your email..." />
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

        <div className="row mb-3">
          <label htmlFor="password-confirmation">Password confirmation</label>
          <div className="col-sm-10">
            <input
              type="text"
              id="password-confirmation"
              placeholder="Confirm your password..."
            />
          </div>
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  );
}
