import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Meme } from "./components/Meme";

import { Nav } from "./components/Nav";
import { CreatedMemes } from "./pages/CreatedMemes";
import { CreateMeme } from "./pages/CreateMeme";
import { Home } from "./pages/Home";
import { Liked } from "./pages/Liked";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { SignUp } from "./pages/SignUp";
import { Error } from "./pages/Error";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Meme />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/generator" element={<CreateMeme />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/created" element={<CreatedMemes />} />
          {/* Catch-All Route in Case of Typo */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
