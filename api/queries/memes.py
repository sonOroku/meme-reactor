import requests
from datetime import datetime
from models import MemeIn
import os
from queries.client import GenRepo
from bson import ObjectId

USERNAME = os.environ.get("IMGFLIP_USERNAME")
PASSWORD = os.environ.get("IMGFLIP_PASSWORD")


class InvalidTemplateError(ValueError):
    pass


class MemeRepo(GenRepo):
    collection_name = "memes"

    def create_meme(self, input: MemeIn, user_id: str):
        info = input.dict()
        info["username"] = USERNAME
        info["password"] = PASSWORD
        result = requests.post(
            "https://api.imgflip.com/caption_image", params=info
        )
        data = result.json()
        if data["success"] == False:
            raise InvalidTemplateError
        meme = {"meme_url": data["data"]["url"]}
        meme["created_by"] = user_id
        meme["created_at"] = datetime.now()
        response = self.collection.insert_one(meme)
        if response.inserted_id:
            meme["id"] = str(response.inserted_id)
            return meme

    def get_memes(self, user_id: str = None):
        memes = []
        if user_id is not None:
            for item in self.collection.find({"created_by": user_id}):
                item["id"] = str(item["_id"])
                memes.append(item)
        else:
            for item in self.collection.find():
                item["id"] = str(item["_id"])
                memes.append(item)
        return memes

    def get_templates(self):
        result = requests.get("https://api.imgflip.com/get_memes")
        templates_list = []
        templates = result.json()
        for template in templates["data"]["memes"]:
            template["id"] = int(template["id"])
            templates_list.append(template)
        return templates_list

    def delete_meme(self, id: str):
        delete_valid = self.collection.delete_one({"_id": ObjectId(id)})
        return delete_valid.deleted_count > 0

    def get_meme(self, id: str):
        meme = self.collection.find_one({"_id": ObjectId(id)})
        meme["id"] = str(meme["_id"])
        return meme
