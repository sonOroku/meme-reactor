from pymongo import MongoClient
import os

DATABASE_URL = os.environ.get("DATABASE_URL")
DB_NAME = os.environ.get("DB_NAME")

if not isinstance(DB_NAME, str):
    raise ValueError("DB_NAME must be a string.")

client = MongoClient(DATABASE_URL)
db = client[DB_NAME]


class GenRepo:
    @property
    def collection(self):
        return db[self.collection_name]
