from fastapi import APIRouter, Depends
from authenticator import authenticator
from models import MemeIn, MemeOut, MemeTemplate
from queries.memes import MemeRepo
from typing import List

router = APIRouter()


@router.post("/api/memes", response_model=MemeOut)
def create_meme(
    input: MemeIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MemeRepo = Depends(),
):
    meme = repo.create_meme(input, user_id=account_data["id"])
    return meme


@router.get("/api/memes", response_model=List[MemeOut])
def get_memes(
    repo: MemeRepo = Depends(),
):
    return repo.get_memes()


@router.get("/api/memes/templates", response_model=List[MemeTemplate])
def get_templates(repo: MemeRepo = Depends()):
    return repo.get_templates()


@router.delete("/api/memes/{meme_id}", response_model=bool)
def delete_meme(meme_id: str, repo: MemeRepo = Depends()):
    return repo.delete_meme(meme_id)


@router.get("/api/memes/mine", response_model=List[MemeOut])
def get_user_memes(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MemeRepo = Depends(),
):
    return repo.get_memes(user_id=account_data["id"])
