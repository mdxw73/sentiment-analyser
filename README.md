# DurHack 2022: Sentiment Analyser

## What is this project?
- A platform that receives SMS customer queries and responds to them accordingly in order of priority.

## What inspired us to come up with Sentiment Analyser?
- The problem introduced by Atom Bank on ordering customer queries
- The initial demonstration of building an automated SMS messaging app using Twilio

## Main features of Sentiment Analyser
- Twilio
- Twilio (AI) Autopilot
- Firebase
- MonkeyLearn
- Fetch API
- Rest API

## What does Sentiment Analyser do?
- Receives SMS messages sent to a phone number attached to a Twilio account
- Send SMS replies using a chatbot
- Save the SMS query to Firebase
- Provide a REST API that's queried from a frontend website using the fetch API
- Display customer queries on the website
- Order the queries based on ML semantic analysis, keyword frequency detection and date created


## How is Sentiment Analyser linked to the theme Unity?
- We unify companies and customers who have specific queries through the use of Twilio
- We unify companies with customer information
- The text, and Semantic Machine Learning model (from the website) unifies the APIs and websites

## How did we develop Sentiment Analyser?
- Interactions via SMS (SMS chats) are done using Twilio
- The REST API was built with NodeJS
- The fetch API and frontend website was built with Javascript, HTML and CSS
- ML semantic analysis was done using a third party API called MonkeyLearn

## What challenges did we run into when building Sentiment Analyser?
- We were briefly only able to receive SMS messages from one phone number
- We ran into issues querying MonkeyLearn with the fetch API due to a lack of documentation
- We decided to use a cloud hosting platform as we ran into issues running the Twilio endpoints locally
- Initially we used a JSON file and the cloud hosting platform deleted it every time the server went down. To overcome this, instead of storing the data locally, we stored it in Firebase
- We used ngrok to solve an error that we were facing in the Terminal. ngrok allowed us to expose a web server running on our local machine to the Internet.
- We had to import the module dotenv in order to protect the authentication token and account SID from getting hacked.

## What accomplishments are we proud of as a result of Sentiment Analyser?
- Developing a useful web application within 24 hours that solves a real world problem efficiently
- Understanding how to use and get Twilio to work without any prior knowledge
- Developing a usable platform that provides useful functionalities
- Learning Firebase without prior knowledge

## What did we learn from building Sentiment Analyser?
- How to implement automated SMS messaging and a chatbot with Twilio
- How to store and fetch a JSON object in Firebase

## Further Improvements
- Expanding the program into a multi-messaging platform, e.g. email
- A more creative design to make the platform visually more appealing

(MonkeyLearn: username=jelove9410@spruzme.com, password=Temp123Temp123)
