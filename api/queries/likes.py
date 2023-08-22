from queries.client import GenRepo
from models import Like
from datetime import datetime
from bson import ObjectId


class DuplicateLikeError(ValueError):
    pass


class LikeRepo(GenRepo):
    collection_name = "likes"

    def create_like(self, user_id: str, meme_id: str):
        like = {"user_id": user_id, "meme_id": meme_id}

        test = self.collection.find_one(like)
        if test is not None:
            raise DuplicateLikeError

        liked_at = datetime.now()
        like["liked_at"] = liked_at

        result = self.collection.insert_one(like)

        if result.inserted_id:
            like["id"] = str(result.inserted_id)
        return Like(**like)

    def delete_like(self, like_id: str):
        delete_like = {"_id": ObjectId(like_id)}

        result = self.collection.delete_one(delete_like)

        return result.deleted_count > 0

    def get_likes(self, user_id: str):
        likes = []
        result = self.collection.find({"user_id": user_id})
        for item in result:
            item["id"] = str(item["_id"])
            likes.append(item)
        return {"likes": likes}
