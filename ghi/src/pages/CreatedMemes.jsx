import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Meme } from "../components/Meme";
import {
  useGetUserMemesQuery,
  useGetLikesQuery,
  useGetTokenQuery,
  useLogoutMutation,
} from "../app/apiSlice";

export function CreatedMemes() {
  const { data: memes, error: memeError } = useGetUserMemesQuery();
  const { data: likes, error: likeError } = useGetLikesQuery();
  const { data: token } = useGetTokenQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (memeError || likeError) &&
      (memeError.status === 401 || likeError.status === 401)
    ) {
      logout();
      navigate("/login");
    }
  }, []);
  return (
    <div className="column">
      <div>
        <h3 className="m-4">
          {token ? token.username : "User"}'s Created Memes
        </h3>
        <div className="d-flex flex-row flex-wrap gap-6">
          {memes && memes.length ? (
            memes.map((meme) => {
              let like_id = null;
              if (likes) {
                const my_like = likes.find((like) => meme.id === like.meme_id);
                if (my_like) {
                  like_id = my_like.id;
                }
              }

              return (
                <div className="col-auto" key={meme.id}>
                  <Meme
                    image={meme.meme_url}
                    meme_id={meme.id}
                    like_id={like_id}
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
