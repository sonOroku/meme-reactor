from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from models import MemeIn
from datetime import datetime
from queries.memes import MemeRepo
from typing import Optional

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

    def get_memes(self, user_id: Optional[str] = None):
        return [
            {
                "id": "329472",
                "meme_url": "https://i.imgflip.com/7whkli.jpg",
                "created_by": "64e3d31e885b5610c5d2c496",
                "created_at": "2023-08-22T20:51:45.052000",
            }
        ]

    def get_templates(self):
        return [
            {
                "id": 181913649,
                "name": "Drake Hotline Bling",
                "url": "https://i.imgflip.com/30b1gx.jpg",
                "box_count": 2,
            },
            {
                "id": 87743020,
                "name": "Two Buttons",
                "url": "https://i.imgflip.com/1g8my4.jpg",
                "box_count": 3,
            },
        ]

    def create_meme(self, meme_in: MemeIn, user_id: str):
        created_at = datetime(2023, 8, 22, 20, 51, 45, 52000)
        return {
            "id": "329472",
            "meme_url": "https://i.imgflip.com/7whkli.jpg",
            "created_by": user_id,
            "created_at": created_at,
        }

    def delete_meme(self, meme_id: str):
        return True


def test_get_meme():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[MemeRepo] = FakeMemeRepo

    response = client.get("/api/memes/329472")

    assert response.status_code == 200
    assert response.json() == {
        "id": "329472",
        "meme_url": "https://i.imgflip.com/7whkli.jpg",
        "created_by": "64e3d31e885b5610c5d2c496",
        "created_at": "2023-08-21T22:31:21.141000",
    }


def test_create_meme():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[MemeRepo] = FakeMemeRepo

    meme_in = {
        "template_id": 375389275972,
        "boxes": ["top caption", "bottom caption"],
    }

    response = client.post("/api/memes", json=meme_in)

    assert response.status_code == 200
    assert response.json() == {
        "id": "329472",
        "meme_url": "https://i.imgflip.com/7whkli.jpg",
        "created_by": "64e3d31e885b5610c5d2c496",
        "created_at": "2023-08-22T20:51:45.052000",
    }


def test_get_memes():
    app.dependency_overrides[MemeRepo] = FakeMemeRepo
    response = client.get("/api/memes")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": "329472",
            "meme_url": "https://i.imgflip.com/7whkli.jpg",
            "created_by": "64e3d31e885b5610c5d2c496",
            "created_at": "2023-08-22T20:51:45.052000",
        }
    ]


def test_get_templates():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[MemeRepo] = FakeMemeRepo
    response = client.get("/api/memes/templates")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 181913649,
            "name": "Drake Hotline Bling",
            "url": "https://i.imgflip.com/30b1gx.jpg",
            "box_count": 2,
        },
        {
            "id": 87743020,
            "name": "Two Buttons",
            "url": "https://i.imgflip.com/1g8my4.jpg",
            "box_count": 3,
        },
    ]


def test_delete_meme():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[MemeRepo] = FakeMemeRepo
    response = client.delete("/api/memes/20349875")
    assert response.status_code == 200
    assert response.json() == True


def test_get_user_memes():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[MemeRepo] = FakeMemeRepo
    response = client.get("/api/memes/mine")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": "329472",
            "meme_url": "https://i.imgflip.com/7whkli.jpg",
            "created_by": "64e3d31e885b5610c5d2c496",
            "created_at": "2023-08-22T20:51:45.052000",
        }
    ]
