# DurHack 2022 

## Inspirations
- The problem introduced by Atom Bank on ordering customer queries
- The initial demonstration of building an automated SMS messaging app using Twilio

## What it does
- Receives SMS messages sent to a phone number attached to a Twilio account
- Send SMS replies using a chatbot
- Save the SMS query to Firebase
- Provide a REST API that's queried from a frontend website using the fetch API
- Display customer queries on the website
- Order the queries based on ML semantic analysis, keyword frequency detection and date created

## How we built it
- Interactions via SMS (SMS chats) are done using Twilio
- The REST API was built with NodeJS
- The fetch API and frontend website was built with Javascript, HTML and CSS
- ML semantic analysis was done using a third party API called MonkeyLearn

## Challenges we ran into
- We were briefly only able to receive SMS messages from one phone number
- We ran into issues querying MonkeyLearn with the fetch API due to a lack of documentation
- We decided to use a cloud hosting platform as we ran into issues running the Twilio endpoints locally

## Accomplishments that we are proud of
- Understanding how to use and get Twilio to work without any prior knowledge
- Developing a usable platform that provides useful functionalities and unifies companies and customers
- Learning Firebase without prior knowledge

## What we learned
- How to implement automated SMS messaging and a chatbot with Twilio
- How to store and fetch a JSON object in Firebase
