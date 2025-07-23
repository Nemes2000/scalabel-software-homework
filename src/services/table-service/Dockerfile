FROM python:3.10-alpine

ENV SERVER_NAME=0.0.0.0

WORKDIR /app

COPY requirements.txt /app/
RUN pip3 install --no-cache-dir -r requirements.txt

COPY /src /app/src

WORKDIR /app/src

EXPOSE 5000

CMD gunicorn -w 1 -b ${SERVER_NAME}:5000 'api:create_app()'