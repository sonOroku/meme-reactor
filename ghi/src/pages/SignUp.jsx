/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSignUpMutation } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [signUp, signUpResponse] = useSignUpMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (signUpResponse.isError) {
      setErrorMessage(
        "This username is already in use. Please try another one."
      );
    } else if (signUpResponse.isSuccess) {
      navigate("/");
    }
  }, [signUpResponse]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === passwordConfirmation) {
      signUp({ username, email, password });
    } else {
      setErrorMessage("Password and Password Confirmation do not match");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-5 bg-white">
          <h2>Sign Up</h2>
          {errorMessage && (
            <div className="alert alert-warning" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="username">Username</label>
              <div className="mb-3">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username..."
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="email">Email</label>
              <div className="mb-3">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="password">Password</label>
              <div className="mb-3">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password..."
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="password-confirmation">
                Password confirmation
              </label>
              <div className="mb-3">
                <input
                  type="password"
                  id="password-confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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
