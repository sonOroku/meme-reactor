import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useLogoutMutation, useGetTokenQuery } from "../app/apiSlice";

export const Nav = () => {
  const [logout] = useLogoutMutation();
  const { data: token } = useGetTokenQuery();
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>

        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              MemeReactor
            </NavLink>
          </li>

          {token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/generator">
                Create Meme
              </NavLink>
            </li>
          )}

          {token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                User Profile
              </NavLink>
            </li>
          )}

          {!token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </li>
          )}

          {!token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}

          {token && (
            <li className="nav-item">
              <Link onClick={logout} className="nav-link" to="/">
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
