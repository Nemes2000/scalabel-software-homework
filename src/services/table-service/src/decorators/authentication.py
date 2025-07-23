# from functools import wraps

# from http import HTTPStatus
# from firebase_admin import auth
# from flask import request
# import flask

# AUTHENTICATED_STR = 'authenticated'
# AUTHORIZATION_STR = 'Authorization'
# TOKEN_USER_STR = 'user_id'

# def authenticate(func):
#     """Decorator function for authentication.

#     If a user calls a function he/she must authenticate himself/herself.
#     """
#     @wraps(func)
#     def wrapper(*args, **kwargs):
#         if not getattr(func, AUTHENTICATED_STR, True):
#             return func(*args, **kwargs)
        
#         token : str | None = None
#         if AUTHORIZATION_STR in request.headers:
#             token = request.headers[AUTHORIZATION_STR].split(" ")[1]
        
#         user_id = basic_authentication(token)
#         if user_id:
#             return func(*args, **kwargs), user_id

#         flask.abort(HTTPStatus.UNAUTHORIZED)
#     return wrapper


# def basic_authentication(token: str):
#     """Verifying the token, which was granted by the user."""
#     if token:
#         try:
#             decoded_token = auth.verify_id_token(token)
#             return decoded_token[TOKEN_USER_STR]
#         except Exception as _:
#             return None
#     return None