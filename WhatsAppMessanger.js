const { default: axios } = require("axios");
require('dotenv').config();

class WhatsAppMessanjer{

    constructor(token_){
        this.version = "v17.0";
        this.token = token_;
        this.phone_id = process.env.PHONE_ID;

    };

    text_msg(body,toPhoneNumber){ 
        //27:33
        let data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": "Number",
            "type": "template",
            "template": {
              "name": "hello_world",
              "language": {
                "code": "en_US"
              }
            }
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://graph.facebook.com/'+ this.version +'/128719950314347/messages?Recipient-Phone-Number='+toPhoneNumber,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + this.token
            },
            data : data
          };


    };



}

module.exports = WhatsAppMessanjer;
  