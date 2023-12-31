import React from "react";
import { Meme } from "../components/Meme";
import {
  useGetUserMemesQuery,
  useGetLikesQuery,
  useGetTokenQuery,
} from "../app/apiSlice";
import LikedMemes from "../components/LikedMemes";
import { Link } from "react-router-dom";

export function Profile() {
  const { data: memes } = useGetUserMemesQuery();
  const { data: likes } = useGetLikesQuery();
  const { data: token } = useGetTokenQuery();

  return (
    <div className="column">
      <h2 className="mt-3">{token ? token.username : "User"}'s Profile</h2>

      <div>
        <h3 className="m-4">
          {token ? token.username : "User"}'s Recently Liked Memes{" "}
          <small>
            <Link to="/liked">See More</Link>
          </small>{" "}
        </h3>
        <div className="d-flex flex-row flex-wrap gap-6">
          {likes && likes.length ? (
            likes.slice(0, 3).map((like) => {
              const like_id = like.id;
              return (
                <div key={like_id}>
                  <LikedMemes meme_id={like.meme_id} />
                </div>
              );
            })
          ) : (
            <div className="col-auto">
              <p>You haven't liked any memes...</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="m-4">
          {token ? token.username : "User"}'s Recently Created Memes{" "}
          <small>
            <Link to="/created">See More</Link>
          </small>
        </h3>
        <div className="d-flex flex-row flex-wrap gap-6">
          {memes && memes.length ? (
            memes.slice(0, 3).map((meme) => {
              return (
                <div className="col-auto" key={meme.id}>
                  <Meme
                    image={meme.meme_url}
                    meme_id={meme.id}
                    user_id={meme.created_by}
                  />
                </div>
              );
            })
          ) : (
            <div className="col-auto">
              <p>You have not yet created any memes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
