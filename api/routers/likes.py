from fastapi import APIRouter, Depends, HTTPException
from models import Like, ErrorResponse
from queries.likes import LikeRepo, DuplicateLikeError
from typing import Union


router = APIRouter()


@router.post(
    "/api/memes/{meme_id}/likes",
    response_model=Union[Like, ErrorResponse],
)
def create_like(
    user_id: str,
    meme_id: str,
    repo: LikeRepo = Depends(),
):
    try:
        like = repo.create_like(user_id, meme_id)
    except DuplicateLikeError:
        raise HTTPException(
            status_code=405, detail="Meme has already been liked."
        )
    return like


@router.delete("/api/likes/{like_id}", response_model=bool)
def delete_like(
    like_id: str,
    repo: LikeRepo = Depends(),
):
    return repo.delete_like(like_id)
