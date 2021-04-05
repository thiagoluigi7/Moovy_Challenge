# This project is deployed on heroku

## [Moovy](https://moovy-frontend.herokuapp.com/)


## Start the app localy

In the project directory, you can run:

### `npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Technical decisions

1. The search will only display movies once you type at least 4 letters. This is a limitation of the OMDB API. It returns an error if there are too many results.

2. You'll only be able to use the app after logging in.


## Problems 

1. The web app (frontend) is not in typescript yet. <br> <br>

2. When a user log in, in the frontend their movies are not loaded from the database yet. <br> <br>

3. The localStorage is not respecting the user. Showing the same movies no matter what user logs in. This problem is related to the problem #2. <br> <br>