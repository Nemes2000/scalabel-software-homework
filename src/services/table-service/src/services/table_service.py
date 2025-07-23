from dataaccess.table_dal import TableDAL
from models.request import TableCreate


class TableService:
    def __init__(self, table_dal: TableDAL):
        self.table_dal: TableDAL = table_dal

    def get_tables(self):
        return self.table_dal.get_tables()
    
    def create_table(self, table: TableCreate):
        return self.table_dal.create_table(table)
    
    def delete_table(self, id: str):
        return self.table_dal.delete_table(id)