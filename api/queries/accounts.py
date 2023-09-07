from queries.client import GenRepo
from models import AccountIn, AccountWithHashPassword, AccountOut
from bson import ObjectId


class DuplicateAccountError(ValueError):
    pass


class AccountRepo(GenRepo):
    collection_name = "accounts"

    def create_user(self, input: AccountIn, hashed_password: str):
        account = input.dict()
        if self.get_user(account["username"]):
            raise DuplicateAccountError
        account["hashed_password"] = hashed_password
        del account["password"]
        result = self.collection.insert_one(account)
        if result.inserted_id:
            account["id"] = str(result.inserted_id)
        return AccountWithHashPassword(**account)

    def get_user(self, username: str):
        account = self.collection.find_one({"username": username})
        if account is None:
            return None
        account["id"] = str(account["_id"])
        return AccountWithHashPassword(**account)

    def get_user_by_id(self, user_id: str):
        account = self.collection.find_one({"_id": ObjectId(user_id)})
        if account is None:
            return None
        account["id"] = str(account["_id"])
        return AccountOut(**account)
