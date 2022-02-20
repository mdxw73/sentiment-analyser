const queries = require('./queries.json')
const fs = require('fs')
const express = require('express')
const app = express()
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

app.get('/all', function (req, resp) {
  resp.json(queries)
})


const http = require('http');
const { query } = require('express')
const { ApplicationPage } = require('twilio/lib/rest/api/v2010/account/application')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

// client.messages
//   .create({
//      body: 'Thank you for contacting us!',
//      from: '+447700165457',
//      to: '+447436592946'
//    })
//   .then(message => console.log(message.sid));

app.post('/sms', (req, res) => {
//   console.dir(req.body);
  text=req.body.Body;
  phone=req.body.From;
  id=req.body.SmsSid;
  const data = {id,phone,text,"done":false};
  queries.push(data)
  fs.writeFileSync('./queries.json', JSON.stringify(queries))
  const twiml = new MessagingResponse();
  twiml.message('Thank you for contacting us!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/done', (req, res) => {
    //   console.dir(req.body);
      let id = req.body.id
      let doneTF = req.body.done

    //   console.log(req.body);

      for (const query of queries) {
          if (query.id == id) {
              query.done = doneTF
            //   console.log("hi");
          }
      }

      console.log(queries)

    //   const data = {id,phone,text};
    //   queries.push(data)
      fs.writeFileSync('./queries.json', JSON.stringify(queries, null, 2))
    //   const twiml = new MessagingResponse();
    //   twiml.message('Thank you for contacting us!');
    //   res.writeHead(200, {'Content-Type': 'text/xml'});
    //   res.end(twiml.toString());
    res.json(queries)

    });

    app.get('/undone', (req, res) => {
        //   console.dir(req.body);
        //   let id = req.body.id

          for (const query of queries) {
            query.done = false
          }

          console.log(queries)

        //   const data = {id,phone,text};
        //   queries.push(data)
          fs.writeFileSync('./queries.json', JSON.stringify(queries, null, 2))
        //   const twiml = new MessagingResponse();
        //   twiml.message('Thank you for contacting us!');
        //   res.writeHead(200, {'Content-Type': 'text/xml'});
        //   res.end(twiml.toString());
        res.json(queries)

        });


http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

module.exports = app