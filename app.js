const fs = require('fs')
const express = require('express')
const app = express()
const { query } = require('express')

// twilio initalisation
const { ApplicationPage } = require('twilio/lib/rest/api/v2010/account/application')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

app.use(express.json())
app.use(express.static('client'))
app.use(express.urlencoded({ extended: true }))

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// firebase initalisation
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://durhack-2022-default-rtdb.europe-west1.firebasedatabase.app"
});

const database = admin.database()
var queries;

function getSnapshot() {
    database.ref("queries").on('value', (snapshot) => {
        queries = snapshot.val()
        }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
        });
}

getSnapshot()

// GET all
app.get('/all', function (req, resp) {
    getSnapshot()
    resp.json(queries)
})

// POST sms
app.post('/sms', (req, res) => {
    //   console.dir(req.body);
    text = req.body.Body;
    phone = req.body.From;
    id = req.body.SmsSid;

    getSnapshot()

    const data = { id, phone, text, "done": false, "timestamp": Date.now() };
    queries.push(data)

    database.ref("queries").set(queries, function (error) {
        if (error) {
            // The write failed...
            console.log("Failed with error: " + error)
        } else {
            // The write was successful...
            console.log("success")
        }
    })

    const twiml = new MessagingResponse();
    twiml.message('Thank you for contacting Atom Bank!');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

// POST chatbot
app.post('/chatbot', (req, res) => {
    let phone = req.body.UserIdentifier

    console.log(req.body);

    client.messages
        .create({body: 'Connecting you to agent\nThank you for your patience', from: process.env.fromPhoneNumber, to: phone})
        .then(message => {
            console.log(message.sid)
            res.status(200);
        });
});

// POST done
app.post('/done', (req, res) => {
    let id = req.body.id
    let doneTF = req.body.done

    getSnapshot()

    for (const query of queries) {
        if (query.id == id) {
            var index = queries.indexOf(query); // 1
        }
    }

    const firebaseUpdate = database.ref('queries/' + index)
    firebaseUpdate.update({
        'done': doneTF
    });

    getSnapshot()

    res.json(queries)

});

// POST undone
app.get('/undone', (req, res) => {

    for (const query of queries) {
        query.done = false
    }

    database.ref("queries").set(queries, function (error) {
        if (error) {
            // The write failed...
            console.log("Failed with error: " + error)
        } else {
            // The write was successful...
            console.log("success")
        }
    })

    res.json(queries)

});

module.exports = app