from pydantic import BaseModel, Field

class TableCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100, default="", description="Tha table's name.")
    seats: int= Field(ge=1, le=100, default=1, description='Number of seats at the table.')

class TableMetaPath(BaseModel):
    path: str = Field(default="tables", description="")
    id: str = Field(..., description="Meta object for dynamic id")