# Repo

In this folder will be the code responsible for the backend of the Moovy application. This backend server is made using the [NestJS Framework](https://nestjs.com/).

## Endpoints

There are 4 endpoints: <br><br>

- home (``/``)
 - - This is used to test the deploy of the server. Just print "Hello World".

- user (``/user``)
 This one is used to control user related features. 
 - - If made a GET request returns all users and their information.
 - - If made a GET request appending /id to this endpoint it returns every information of that user. (Ex ``localhost:3000/user/3``)
 - - If made a POST request with a body containing email, password and name will create an user. Example of body:
      ``` JSON
          { 
            "email":"teste@email.com",
            "password":"123",
            "name":"Teste"
          }
      ```
  - - if made a PUT request with an user id appended to the endpoint (Ex: ``localhost:3000/user/3``) it will update this user with the content of the body of the request.
  - - if made a DELETE request with an user id appended to the endpoint (Ex: ``localhost:3000/user/3``) it will remove this user from the database.
 
- movies (``/movies``)

- - If made a GET request appending /id to this endpoint it returns all movies of that user. (Ex ``localhost:3000/user/3``)
- - If made a POST request with a body containing userId and movieId it will add the movie associated with this id to the user associated with this id. Example of body:
      ``` JSON
          { 
            "userId":"60624c8dd7b703143c0bed15",
            "movieId":"tt1756545"
          }
      ```
- - If made a DELETE request with a body containing userId and movieId it will remove the movie associated with this id from the library of the user associated with this id. Example of body:
      ``` JSON
          { 
            "userId":"60624c8dd7b703143c0bed15",
            "movieId":"tt1756545"
          }
      ```

- review (``/review``)

  This endpoint is not implemented yet.

## This project is deployed on heroku

## [Moovy](https://moovy-frontend.herokuapp.com/)
<br>

## Technical decisions

1. Every request needs an ``access_token``. This token is generated using the JWT standard at login time and is stored in the sessionStorage.
2. The JWT token will expire after 1800s.
3. The request made to create an user doesn't need this JWT token.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

