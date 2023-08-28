from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from models import MemeIn
from datetime import datetime
from queries.memes import MemeRepo


client = TestClient(app=app)


def fake_get_current_account_data():
    return {"username": "user", "id": "64e3d31e885b5610c5d2c496"}


class FakeMemeRepo:
    def get_meme(self, meme_id: str):
        created_at = datetime(2023, 8, 21, 22, 31, 21, 141000)
        return {
            "id": meme_id,
            "meme_url": "https://i.imgflip.com/7whkli.jpg",
            "created_by": "64e3d31e885b5610c5d2c496",
            "created_at": created_at,
        }

    def create_meme(self, meme_in: MemeIn, user_id: str):
        created_at = datetime(2023, 8, 22, 20, 51, 45, 52000)
        return {
            "id": "329472",
            "meme_url": "https://i.imgflip.com/7whkli.jpg",
            "created_by": user_id,
            "created_at": created_at,
        }


def test_get_meme():
    pass


def test_create_meme():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[MemeRepo] = FakeMemeRepo

    meme_in = {
        "template_id": 375389275972,
        "text0": "text0",
        "text1": "text1",
    }

    response = client.post("/api/memes", json=meme_in)

    assert response.status_code == 200
    assert response.json() == {
        "id": "329472",
        "meme_url": "https://i.imgflip.com/7whkli.jpg",
        "created_by": "64e3d31e885b5610c5d2c496",
        "created_at": "2023-08-22T20:51:45.052000",
    }
