from pymongo.database import Database
from pymongo.collection import Collection, InsertOneResult

from exceptions.exceptions import NameExistsException
from models.models import Table
from models.request import TableCreate

class TableDAL:
    def __init__(self, db: Database):
        self.collection: Collection = db.get_collection("tables")

    def get_tables(self):
        tables = self.collection.find()
        tables = [ Table(name=table["name"], seats=table["seats"], id= str(table["_id"])) for table in tables]
        return tables
    
    def create_table(self, table: TableCreate):
        is_collision = self.collection.find_one({"name": table.name})
        if is_collision is not None:
            raise NameExistsException()
        created_table: InsertOneResult = self.collection.insert_one(dict(table))
        return Table(name=table.name, seats=table.seats, id=str(created_table.inserted_id))
    
    def delete_table(self, id: str):
        from bson.objectid import ObjectId
        _id = ObjectId(id)
        self.collection.delete_one({"_id": _id})