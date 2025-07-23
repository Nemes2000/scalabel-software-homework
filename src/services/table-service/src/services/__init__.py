from dataaccess import DALRegistry
from services.table_service import TableService


class ServiceRegistry:
    table_service = None

    @classmethod
    def init(cls):
        """Initialize services with DAOs."""
        DALRegistry.init()
        cls.table_service = TableService(DALRegistry.table_dal)