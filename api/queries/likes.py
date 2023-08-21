from queries.client import GenRepo
from models import Like
from datetime import datetime


class DuplicateLikeError(ValueError):
    pass


class LikeRepo(GenRepo):
    collection_name = "likes"

    def create_like(self, user_id: str, meme_id: str):
        like = {"user_id": user_id, "meme_id": meme_id}

        # If there is already a like saved with the same user_id and meme_id
        # then raise a duplicate like error.

        liked_at = datetime.now()
        like["liked_at"] = liked_at

        result = self.collection.insert_one(like)

        if result.inserted_id:
            like["id"] = str(result.inserted_id)
        return Like(**like)
