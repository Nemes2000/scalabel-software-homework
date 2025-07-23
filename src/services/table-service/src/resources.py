from dotenv import find_dotenv, load_dotenv
import os

load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PWD")
CONNECTION_STR = f"mongodb+srv://b6ryik:{password}@tablecluster.l1iyb.mongodb.net/?retryWrites=true&w=majority&appName=TableCluster"

TABLE_DB_STR = "table-db"
BASE_URL_PATH = 'table-service'
