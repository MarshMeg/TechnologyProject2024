FROM python:3.12.2
LABEL authors="Marsh_Meg"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /etc/project_backend
COPY . .

RUN python -m pip install --upgrade -r requirements.txt