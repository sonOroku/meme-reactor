from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, memes, likes
import os
from authenticator import authenticator

app = FastAPI()


app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(memes.router)
app.include_router(likes.router)

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
