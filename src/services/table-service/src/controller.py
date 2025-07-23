from flask_openapi3 import APIView
from http import HTTPStatus

from exceptions.exceptions import NameExistsException
from models.request import TableCreate, TableMetaPath
from models.response import ErrorResponse, TableListResponse, TableResponse
from resources import BASE_URL_PATH
from services import ServiceRegistry
from services.table_service import TableService

jwt_security = [ { "jwt": [] } ]
api_view = APIView(url_prefix=f"/{BASE_URL_PATH}/api/v1")

ServiceRegistry.init()
table_service: TableService = ServiceRegistry.table_service

@api_view.route("/healthcheck")
class HealthController:
    @api_view.doc(
        summary="The health state of the API.",
        responses={
            HTTPStatus.OK: {"content": {"text/plain": {"schema": {"type": "string"}}}}
        }
    )
    def get(self):
        return "", HTTPStatus.OK
    
@api_view.route("/tables")
class TableController:
    @api_view.doc(
            summary="Get and create interface for table objects.",
            responses={
                HTTPStatus.OK: {"content": {"text/plain": {"schema": {"type": "string"}}}}
            },
            security=jwt_security
    )

    #@authenticate
    def get(self):
        tables = table_service.get_tables()
        return TableListResponse(tables=tables).model_dump(), HTTPStatus.OK

    #@authenticate
    def post(self, body: TableCreate):
        try:
            created_table = table_service.create_table(table=body)
        except NameExistsException as e:
            return ErrorResponse(msg='Failed to create table. Given name already exist.').model_dump(), HTTPStatus.BAD_REQUEST
        except Exception as e:
            return ErrorResponse(msg='Error accured.').model_dump(), HTTPStatus.BAD_REQUEST
        return TableResponse(table=created_table).model_dump(), HTTPStatus.OK
    
@api_view.route("/tables/<str:id>")
class TableWithIDController:
    @api_view.doc(
            summary="Delete interface for table objects.",
            responses={
                HTTPStatus.OK: {"content": {"text/plain": {"schema": {"type": "string"}}}}
            },
            security=jwt_security
    )
    def delete(self, path: TableMetaPath):
        try:
            table_service.delete_table(id = path.id)
        except Exception as e:
            print(e)
            return ErrorResponse(msg='Error accured.').model_dump(), HTTPStatus.BAD_REQUEST
        return "", HTTPStatus.NO_CONTENT





