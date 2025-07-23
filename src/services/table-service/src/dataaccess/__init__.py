from pymongo.database import Database
from db import MongoDBClient

from dataaccess.table_dal import TableDAL
from resources import TABLE_DB_STR

class DALRegistry:
    table_dal = None

    @classmethod
    def init(cls):
        """Initialize DALs with the database."""
        db: Database = MongoDBClient.get_database(db_name=TABLE_DB_STR)
        cls.table_dal = TableDAL(db)