# Build Yearn School Learning Platform

# Setting Up Backend

## Install express, graphql and express-graphql packages

Run `npm i express express-graphql graphql mongoose cors colors`

## Install dependencies

Run `npm i -D nodemon dotenv`

## Start the server

In the root directory, run `npm run dev`

## Query Instructors

`{ instructors{ id firstName middleName lastName gender dateOfBirth address email phone nationality education status courseId{ id name duration description status } } }`
