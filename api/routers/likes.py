from fastapi import APIRouter, Depends
from models import Like
from queries.likes import LikeRepo

router = APIRouter()


@router.post("/api/memes/{meme_id}/likes", response_model=Like)
def create_like(
    user_id: str,
    meme_id: str,
    repo: LikeRepo = Depends(),
):
    return repo.create_like(user_id, meme_id)
