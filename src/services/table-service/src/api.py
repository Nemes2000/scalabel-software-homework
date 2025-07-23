from flask_openapi3 import Info
from flask_openapi3 import OpenAPI
from flask_cors import CORS

from controller import api_view
import os
    

def create_app():
    jwt: dict = {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
    }
    security_schemes: dict = {"jwt": jwt }

    info: Info = Info(title="Table Service API", version="1.0.0")
    app: OpenAPI = OpenAPI(__name__, info=info, security_schemes=security_schemes)

    app.register_api(api=api_view)
    CORS(app)
    return app

if __name__ == '__main__':
    app: OpenAPI = create_app()
    
    app.run(debug=True, host=os.getenv('SERVER_NAME', "0.0.0.0"), port=5000)