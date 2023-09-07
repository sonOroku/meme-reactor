from fastapi import APIRouter, Depends, HTTPException
from models import Like, ErrorResponse, LikesList
from queries.likes import LikeRepo, DuplicateLikeError
from queries.memes import MemeRepo
from authenticator import authenticator
from typing import Union
from bson.errors import InvalidId


router = APIRouter()


@router.post(
    "/api/memes/{meme_id}/likes",
    response_model=Union[Like, ErrorResponse],
)
def create_like(
    meme_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LikeRepo = Depends(),
    meme_repo: MemeRepo = Depends(),
):
    try:
        meme_repo.get_meme(meme_id)
        like = repo.create_like(meme_id, user_id=account_data["id"])
    except InvalidId:
        raise HTTPException(status_code=406, detail="Invalid ID")
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
    try:
        deleted = repo.delete_like(like_id)
        return deleted
    except InvalidId:
        raise HTTPException(status_code=406, detail="Invalid ID")


@router.get("/api/likes/mine", response_model=LikesList)
def liked_memes(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LikeRepo = Depends(),
):
    return repo.get_likes(user_id=account_data["id"])


@router.get("/api/likes", response_model=LikesList)
def get_all_likes(
    repo: LikeRepo = Depends(),
):
    return repo.get_likes()


@router.get("/api/memes/{meme_id}/likes", response_model=LikesList)
def get_meme_likes(
    meme_id: str,
    repo: LikeRepo = Depends(),
):
    try:
        likes = repo.get_meme_likes(meme_id)
        return likes
    except InvalidId:
        raise HTTPException(status_code=406, detail="Invalid ID")
