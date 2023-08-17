from fastapi import APIRouter, Depends
from models import MemeIn, MemeOut
from queries.memes import MemeRepo
from typing import List

router = APIRouter()

@router.post("/api/memes", response_model=MemeOut)
def create_meme(
    input: MemeIn,
    repo: MemeRepo = Depends(),
):
    meme = repo.create_meme(input)
    return meme

@router.get("/api/memes", response_model=List[MemeOut])
def get_memes(
    repo: MemeRepo = Depends(),
):
    return repo.get_memes()
