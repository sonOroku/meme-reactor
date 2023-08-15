from pydantic import BaseModel

class AccountIn(BaseModel):
    username: str
    email: str
    password: str

class AccountOut(BaseModel):
    id: str
    username: str
