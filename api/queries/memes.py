import requests
from models import MemeIn, MemeOut
import os
from queries.client import GenRepo

USERNAME = os.environ.get("IMGFLIP_USERNAME")
PASSWORD = os.environ.get("IMGFLIP_PASSWORD")


class MemeRepo(GenRepo):
    collection_name = "memes"

    def create_meme(self, input: MemeIn):
        info = input.dict()
        info["username"] = USERNAME
        info["password"] = PASSWORD
        result = requests.post("https://api.imgflip.com/caption_image", params=info)
        data = result.json()
        meme = {"meme_url": data["data"]["url"]}
        response = self.collection.insert_one(meme)
        if response.inserted_id:
            meme["id"] = str(response.inserted_id)
            return meme

    def get_memes(self):
        memes = self.collection.find()
        memes = []
        for item in self.collection.find():
            item["id"] = str(item["_id"])
            memes.append(item)
        return memes
