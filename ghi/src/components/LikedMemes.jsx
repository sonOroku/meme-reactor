import React from "react";
import { Meme } from "./Meme";
import { useGetMemeQuery } from "../app/apiSlice";


export default function LikedMemes({meme_id, like_id}) {
    const { data : meme, isLoading} = useGetMemeQuery(meme_id)
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    } else if (meme) {
        return (
            <div className="col" key={meme.id}>
                    <Meme
                        image={meme.meme_url}
                        meme_id={meme.id}
                        like_id={like_id}
                    />
                    </div>
        )
    }

}
