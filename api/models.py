from pydantic import BaseModel
from datetime import datetime


class AccountIn(BaseModel):
    username: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountWithHashPassword(AccountOut):
    hashed_password: str


class MemeIn(BaseModel):
    template_id: int
    text0: str
    text1: str


class MemeOut(BaseModel):
    id: str
    meme_url: str
    created_by: str
    created_at: datetime


class MemeTemplate(BaseModel):
    id: int
    name: str
    url: str


class Like(BaseModel):
    id: str
    user_id: str
    meme_id: str
    liked_at: datetime


class ErrorResponse(BaseModel):
    detail: str
