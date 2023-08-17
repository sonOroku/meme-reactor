from pydantic import BaseModel


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


class MemeTemplate(BaseModel):
    id: int
    name: str
    url: str
