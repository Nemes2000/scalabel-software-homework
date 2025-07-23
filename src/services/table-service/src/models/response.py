from pydantic import Field, BaseModel
from models.models import Table

class ErrorResponse(BaseModel):
    msg: str = Field(..., description='The message of the error.')

class TableListResponse(BaseModel):
    tables: list[Table] = Field(..., description='The found tables')

    def model_dump(self, **kwargs):
        return {
            "tables": [ table.to_dict() for table in self.tables ]
        }
    
    class Config:
        arbitrary_types_allowed = True

class TableResponse(BaseModel):
    table: Table = Field(..., description='The found table')

    def model_dump(self, **kwargs):
        return {
            "table": self.table.to_dict()
        }

    class Config:
        arbitrary_types_allowed = True