import React from "react";

export function SignUp() {
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-5">
          <h2>Sign Up</h2>

          <form action="submit">
            <div className="row mb-3">
              <label htmlFor="username">Username</label>
              <div className="mb-3">
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username..."
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="email">Email</label>
              <div className="mb-3">
                <input type="text" id="email" placeholder="Enter your email..." />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="password">Password</label>
              <div className="mb-3">
                <input
                  type="text"
                  id="password"
                  placeholder="Enter your password..."
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="password-confirmation">Password confirmation</label>
              <div className="mb-3">
                <input
                  type="text"
                  id="password-confirmation"
                  placeholder="Confirm your password..."
                />
              </div>
            </div>

            <button className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
