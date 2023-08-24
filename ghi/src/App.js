import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Meme} from "./components/Meme";

import { Nav } from "./components/Nav";
// import { Created } from "./pages/Created";
// import { Generator } from "./pages/Generator";
// import { Home } from "./pages/Home";
// import { Liked } from "./pages/Liked";
// import { Login } from "./pages/Login";
// import { Profile } from "./pages/Profile";
// import { SignUp } from "./pages/SignUp";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Meme />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/created" element={<Created />} /> */}
          {/* Catch-All Route in Case of Typo */}
          {/* <Route path="*" element={<Home />} />
        </Routes> */}
      </BrowserRouter>
    </div>
  );
};
