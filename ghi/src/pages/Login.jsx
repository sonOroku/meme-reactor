import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, loginResponse] = useLoginMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (loginResponse.isSuccess) {
      navigate("/");
    } else if (loginResponse.isError) {
      setErrorMessage(loginResponse.error.data.detail);
    }
  }, [loginResponse]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username, password });
  };
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-5">
          <h2>Login</h2>
          {errorMessage && (
            <div className="alert alert-warning" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="username">Username</label>
              <div className="col-sm-10">
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
              <label htmlFor="password">Password</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password..."
                />
              </div>
            </div>

            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
