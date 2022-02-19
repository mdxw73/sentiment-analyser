const queries = require('./queries.json')
const fs = require('fs')
const express = require('express')
const app = express()
app.use(express.static('client'))
app.use(express.urlencoded({ extended: false }))

app.get('/all', function (req, resp) {
  resp.json(data)
})
// app.post('/new/recipe', function (req, resp) {
//   if (req.body.title === undefined || req.body.href === undefined || req.body.ingredients === undefined || req.body.username === undefined || req.body.image === undefined) {
//     resp.sendStatus(400)
//   } else {
//     const recipe = { title: req.body.title, href: req.body.href, ingredients: req.body.ingredients, username: req.body.username, image: req.body.image }
//     recipes.push(recipe)
//     fs.writeFileSync('./recipes.json', JSON.stringify(recipes, null, '\t'))
//     resp.json(recipes)
//   }
// })


const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);
client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+447700165457',
     to: '+447436592946'
   })
  .then(message => console.log(message.sid));
app.post('/sms', (req, res) => {
  console.dir(req.body);
  text=req.body.Body;
  phone=req.body.From;
  id=req.body.SmsSid;
  const data = JSON.stringify([{id,phone,text}]);
  queries.push(data)
  fs.writeFileSync('./queries.json', data, null, '\t')
  const twiml = new MessagingResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

module.exports = app