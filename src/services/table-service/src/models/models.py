class Table:
    def __init__(self, name:str, seats:int, id: str):
        self.name = name
        self.seats = seats
        self.id = id

    def to_dict(self):
        return { "name": self.name, "seats": self.seats, "id": self.id}    