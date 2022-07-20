# Build Yearn School Learning Platform

# Setting Up Backend

## Install express, graphql and express-graphql packages

Run `npm i express express-graphql graphql mongoose cors colors`

## Install dependencies

Run `npm i -D nodemon dotenv`

## Start the server

In the root directory, run `npm run dev`

## Add Instrutor

`mutation{ addInstructor(firstName:"Solomon",middleName:"Peter",lastName:"Nmsoma",gender:male,dateOfBirth:"10/10/1998",address:"Lagos, Nigeria",email:"solomon.p@gmail.com",password:"password123",phone:"+234767890990",nationality:"Nigeria",education:"Bachelor Degree",status:approved,courseId:"62c0d8755de3bf0db2dc573a"){ id firstName middleName lastName gender dateOfBirth address email password phone nationality education status courseId{ id name duration description status } } }`

## Query Instructors

`{ instructors{ id firstName middleName lastName gender dateOfBirth address email phone nationality education status courseId{ id name duration description status } } }`
