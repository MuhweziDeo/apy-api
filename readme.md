# API for  APY

# Technologies
 - Node
 - Express
 - Typescript
 - Jest
 - Supertest
 - Sqlite
 - LRuCache


# Setup
## Clone Repo

    git clone https://github.com/MuhweziDeo/apy-api.git

## Install
    Create a `.env` and copy contents from `.env.examle`

    cd apy-api && npm i


## Run the app

    npm run dev or yarn dev

    Access app on http:localhost:5000 or port in .env

## Docker Setup

### build image
    create a `.env` and copy contents from `.env.examle`

    docker build . -t <username>/<appname>

### run docker container
    docker run --env-file ./.env -p 49160:8080  <username>/<appname>

## Run the tests

   npm run test


# REST API Endpoints

Endpoints for the API is described below.

## Get calculations for a customer

### Request

`GET /customers/:customerId`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/v1/customers/1234

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
    "data": [
        {
            "id": 1,
            "customerId": 43321122,
            "yearlyCompoundTimes": 5,
            "interestRate": 4.2,
            "deposit": 100,
            "apy": 20.090609,
            "total": 2109.0609,
            "createdAt": "2022-01-16 18:24:39",
            "updatedAt": "2022-01-16 18:24:39"
        },
        {
            "id": 2,
            "customerId": 43321122,
            "yearlyCompoundTimes": 5,
            "interestRate": 4.2,
            "deposit": 100,
            "apy": 20.090609,
            "total": 2109.0609,
            "createdAt": "2022-01-16 18:29:31",
            "updatedAt": "2022-01-16 18:29:31"
        },
        {
            "id": 3,
            "customerId": 43321122,
            "yearlyCompoundTimes": 5,
            "interestRate": 4.2,
            "deposit": 100,
            "apy": 20.090609,
            "total": 2109.0609,
            "createdAt": "2022-01-16 18:29:32",
            "updatedAt": "2022-01-16 18:29:32"
        },
        {
            "id": 4,
            "customerId": 43321122,
            "yearlyCompoundTimes": 5,
            "interestRate": 4.2,
            "deposit": 100,
            "apy": 20.090609,
            "total": 2109.0609,
            "createdAt": "2022-01-16 18:29:33",
            "updatedAt": "2022-01-16 18:29:33"
        },
        {
            "id": 5,
            "customerId": 43321122,
            "yearlyCompoundTimes": 5,
            "interestRate": 4.2,
            "deposit": 100,
            "apy": 20.090609,
            "total": 2109.0609,
            "createdAt": "2022-01-16 18:31:04",
            "updatedAt": "2022-01-16 18:31:04"
        }
    ],
    "nextPage": null,
    "currentPage": 1
}

## Create a new calculation

### Request

`POST /customers/calculate-apy`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:8080/api/v1/customers/calculate-apy
### Body
    {
    "customerId": "43321122",
    "yearlyCompoundedTimes": 5,
    "interestRate": 4.2,
    "deposit": 100,
    "APY": "20.090609",
    "total": 2109.0609
    }
### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {
    "data": {
        "customerId": "43321122",
        "yearlyCompoundedTimes": 5,
        "interestRate": 4.2,
        "deposit": 100,
        "APY": "20.090609",
        "total": 2109.0609
    },
    "message": "Calculations Saved"
    }

## Delete all calculations for a specific Customer

### Request

`DELETE /customers/:customerId`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/v1/customers/12345

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"data":[],"message": "Successfully deleted all records"}


