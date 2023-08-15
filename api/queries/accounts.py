from queries.client import GenRepo
from models import AccountIn, AccountOut, AccountWithHashPassword



class DuplicateAccountError(ValueError):
    pass

class AccountRepo(GenRepo):
    collection_name = "accounts"

    def create_user(self, input: AccountIn, hashed_password: str):
        pass

    def get_user(self, username: str):
        account = self.collection.find_one({"username": username})
        if account is None:
            return None
        account["id"] = str(account["_id"])
        return AccountWithHashPassword(**account)
