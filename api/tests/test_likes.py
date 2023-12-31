from fastapi.testclient import TestClient
from datetime import datetime
from main import app
from authenticator import authenticator
from queries.likes import LikeRepo
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


class FakeLikeRepo:
    def create_like(self, meme_id: str, user_id: str):
        liked_at = datetime(2023, 8, 22, 20, 51, 45, 52000)
        return {
            "id": "64e51fe1027d69cadbccebfc",
            "user_id": user_id,
            "meme_id": meme_id,
            "liked_at": liked_at,
        }

    def delete_like(self, like_id: str):
        return True

    def get_likes(self, user_id: str = None):
        liked_at = datetime(2023, 8, 22, 20, 51, 45, 52000)
        if user_id:
            return {
                "likes": [
                    {
                        "id": "64e51fe1027d69cadbccebfc",
                        "user_id": user_id,
                        "meme_id": "64e3e5b92ad42415b912423f",
                        "liked_at": liked_at,
                    }
                ]
            }
        else:
            return {
                "likes": [
                    {
                        "id": "64e51fe1027d69cadbccebfc",
                        "user_id": "64e3d31e885b5610c5d2c496",
                        "meme_id": "64e3e5b92ad42415b912423f",
                        "liked_at": liked_at,
                    }
                ]
            }

    def get_meme_likes(self, meme_id: str):
        liked_at = datetime(2023, 8, 22, 20, 51, 45, 52000)
        return {
            "likes": [
                {
                    "id": "64e51fe1027d69cadbccebfc",
                    "user_id": "64e3d31e885b5610c5d2c496",
                    "meme_id": meme_id,
                    "liked_at": liked_at,
                }
            ]
        }


def test_create_like():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[MemeRepo] = FakeMemeRepo
    app.dependency_overrides[LikeRepo] = FakeLikeRepo

    response = client.post("/api/memes/64e3e5b92ad42415b912423f/likes")

    assert response.status_code == 200
    assert response.json() == {
        "id": "64e51fe1027d69cadbccebfc",
        "user_id": "64e3d31e885b5610c5d2c496",
        "meme_id": "64e3e5b92ad42415b912423f",
        "liked_at": "2023-08-22T20:51:45.052000",
    }


def test_delete_like():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[LikeRepo] = FakeLikeRepo

    response = client.delete("/api/likes/64e51fe1027d69cadbccebfc")

    assert response.status_code == 200
    assert response.json() is True


def test_liked_memes():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[LikeRepo] = FakeLikeRepo

    response = client.get("/api/likes/mine")

    assert response.status_code == 200
    assert response.json() == {
        "likes": [
            {
                "id": "64e51fe1027d69cadbccebfc",
                "user_id": "64e3d31e885b5610c5d2c496",
                "meme_id": "64e3e5b92ad42415b912423f",
                "liked_at": "2023-08-22T20:51:45.052000",
            }
        ]
    }


def test_get_all_likes():
    app.dependency_overrides[LikeRepo] = FakeLikeRepo

    response = client.get("/api/likes")

    assert response.status_code == 200
    assert response.json() == {
        "likes": [
            {
                "id": "64e51fe1027d69cadbccebfc",
                "user_id": "64e3d31e885b5610c5d2c496",
                "meme_id": "64e3e5b92ad42415b912423f",
                "liked_at": "2023-08-22T20:51:45.052000",
            }
        ]
    }


def test_get_meme_likes():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[LikeRepo] = FakeLikeRepo

    response = client.get("/api/memes/64e3e5b92ad42415b912423f/likes")

    assert response.status_code == 200
    assert response.json() == {
        "likes": [
            {
                "id": "64e51fe1027d69cadbccebfc",
                "user_id": "64e3d31e885b5610c5d2c496",
                "meme_id": "64e3e5b92ad42415b912423f",
                "liked_at": "2023-08-22T20:51:45.052000",
            }
        ]
    }
