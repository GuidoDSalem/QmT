// Depedencias
const express = require("express");
const axios = require('axios');
var bodyParser = require('body-parser');
require('dotenv').config();

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const WhatsAppHandler = require('./whatsAppHandler');
var xhub = require('express-x-hub');

// CONSTANTES

const my_token = process.env.my_token;

const PORT = 8000;

// CONSTANTES TWILIIO
const accountSid = 'AC00baa0d2b0d96e4aa669e6732aecad7c';
const authToken = 'dfc052e0a4b8225f4c1d5330b6992f61';
const client = require('twilio')(accountSid, authToken);

// 
// client.messages
//     .create({
//         body: 'Your appointment is coming up on July 21 at 3PM',
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+5491130644307'
//     })
//     .then(message => console.log(message.sid)).done();


// app.post("/message", twilio.webhook(authToken), (req, res) => {
//     // Twilio Messaging URL - receives incoming messages from Twilio
//     const response = new MessagingResponse();
  
//     response.message(`Your text to me was ${req.body.Body}.
//                       Webhooks are neat :)`);
  
//     res.set("Content-Type", "text/xml");
//     res.send(response.toString());
//   });
  

// // APP CONFIGURATION
var app = express();
app.set('port', (process.env.PORT || PORT));
app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());
// const app = express().use(body_parser.json());


app.listen(app.get('port'),(req,res)=>{
  console.log("Listening...")

});


var token = process.env.TOKEN || 'token';
var received_updates = [];

app.get('/', function(req, res) {
  console.log(req);
  res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});



// FUNCION PARA CONECTAR CON WHATSAPP API

app.get("/webhook",(req,res)=>{
    console.log("webhook...");
    console.log(req);

    // let mode = req.query['hub.mode'] ;
    // let verify_token = req.query['hub.verify_token'];
    // let challenge = req.query["challenge"]

    if (
      req.query['hub.mode'] == 'subscribe' &&
      req.query['hub.verify_token'] == my_token
    ) {
      res.send(req.query['hub.challenge']);
    } else {
      res.sendStatus(400);
    }


});


// THE MAIN SHEET
app.post("/webhook",(req,res)=>{
  console.log("Entrando Mensaje...");
  console.log(JSON.stringify(req.body),null,2);

  const wpHandler = new WhatsAppHandler(req.body,res);
  
  wpHandler.processWebhook();

});

app.get("/login",(req,res)=>{
  console.log("login...");

  res.status(200).send("Vamos bien por ahora");
  if(mode  == 'subscribe' && verify_token == my_token){
    res.status(200).send(challenge);
  }
  else{
    res.status(403);
  }


});

app.listen();




// RUN WEBHOOK: -> ngrok http <port_number>
