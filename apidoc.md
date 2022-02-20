# API Reference Index

## Endpoints
- POST /sms/<br>
Receives an SMS from any phone number and makes a reply.

- GET/all/<br>
Returns all customer queries in the order they arrive.

- POST /done/<br>
Receives and assigns the 'done' JSON attribute of a query a Boolean value and returns the new set of objects.<br>
<i>body: {"id": "SM2af50b8d86ca96b1207fc8b2f0a228cd", "done": true}
headers: {'Content-Type':'application/json'}</i>

- GET /undone/<br>
Changes all 'done' attributes set to true to false.

- POST /chatbot/<br>
Receives the JSON from Twilio Autopilot and writes it to Firebase.