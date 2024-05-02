FROM python:3.10.4-alpine
ENV PYTHONBUFFERED 1
WORKDIR /django
COPY r.txt r.txt
RUN pip3 install -r r.txt
COPY . .