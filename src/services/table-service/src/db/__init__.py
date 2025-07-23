from pymongo import MongoClient

from resources import CONNECTION_STR

class MongoDBClient:
    _client = None

    @classmethod
    def get_client(cls):
        """Return a MongoDB client singleton."""
        if cls._client is None:
            cls._client = MongoClient(CONNECTION_STR)
        return cls._client

    @classmethod
    def get_database(cls, db_name=None):
        """Return the specified database or the default."""
        return cls.get_client().get_database(db_name)