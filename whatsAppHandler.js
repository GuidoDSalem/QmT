/**
 * @param {Express.Response} response - The Express.js response object.
 */

const { default: axios } = require("axios");
require('dotenv').config();
const WhatsAppHandler = require('./whatsAppMessanger');

class WhatsAppWebhookHandler {
    constructor(webhookData, response) {
        this.webhookData = webhookData;
        this.response = response;
        this.barerToken = process.env.TOKEN;
      }

    processWebhook() {
      if (this.webhookData && this.webhookData.object === 'whatsapp_business_account') {
        const entries = this.webhookData.entry;
        entries.forEach((entry) => {
          const id = entry.id;
          const changes = entry.changes;
          changes.forEach((change) => {
            const value = change.value;
            const field = change.field;
  
            if (field === 'messages') {
              const messagingProduct = value.messaging_product;
              const metadata = value.metadata;
              const displayPhoneNumber = metadata.display_phone_number;
              const phoneNumberId = metadata.phone_number_id;
              
              axios({
                method:"POST",
                url:"https://graph.facebook.com/v17.0/WHATSAPP_BUSINESS_ACCOUNT_ID/subscribed_apps"
              })
              // Now you can handle the specific Webhooks payload here
              // You have access to id, messagingProduct, displayPhoneNumber, phoneNumberId, and more
            }
            // Send a response to the client
            this.response.json({ message: "Webhook processed successfully" });
            
          });
        }); // END of forEach(entry)
      } else {
        const error = 'Invalid or unsupported webhook data.';
        this.response.status(400).json({ error });
      }
    }
  }

  module.exports = WhatsAppWebhookHandler;
  
//   // Example usage:
//   const incomingWebhookData = {
//     "object": "whatsapp_business_account",
//     "entry": [{
//       "id": "WHATSAPP_BUSINESS_ACCOUNT_ID",
//       "changes": [{
//         "value": {
//           "messaging_product": "whatsapp",
//           "metadata": {
//             "display_phone_number": "PHONE_NUMBER",
//             "phone_number_id": "PHONE_NUMBER_ID"
//           },
//           // specific Webhooks payload
//         },
//         "field": "messages"
//       }]
//     }]
//   };
  
//   const handler = new WhatsAppWebhookHandler(incomingWebhookData);
//   handler.processWebhook();
//   This class, WhatsAppWebhookHandler, takes the incoming JSON object in its constructor and provides a processWebhook method to handle the data. It checks if the object is of the expected type and then extracts and makes the specific payload data accessible for further processing within the processWebhook method.
  
//   You can customize the processWebhook method to perform specific actions based on the webhook data.
  
  
  
  
  
  