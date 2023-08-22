from fastapi import APIRouter, Depends, HTTPException
from models import Like, ErrorResponse, LikesList
from queries.likes import LikeRepo, DuplicateLikeError
from authenticator import authenticator
from typing import Union


router = APIRouter()


@router.post(
    "/api/memes/{meme_id}/likes",
    response_model=Union[Like, ErrorResponse],
)
def create_like(
    meme_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LikeRepo = Depends(),
):
    try:
        like = repo.create_like(meme_id, user_id=account_data["id"])
    except DuplicateLikeError:
        raise HTTPException(
            status_code=405, detail="Meme has already been liked."
        )
    return like


@router.delete("/api/likes/{like_id}", response_model=bool)
def delete_like(
    like_id: str,
    repo: LikeRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete_like(like_id)


@router.get("/api/likes/mine", response_model=LikesList)
def liked_memes(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LikeRepo = Depends(),
):
    return repo.get_likes(user_id=account_data["id"])
