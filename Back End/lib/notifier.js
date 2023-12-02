const accountSid = "ACdfcad09fa673c52682cd3268db5ce3ee";
const authToken = "7089e6d0e4654033e1c575be6c381768";

const client = require("twilio")(accountSid, authToken);

function sendTextMssgRider() {
  client.messages
    .create({
      to: "+15555555555",
      from: "+16203776593",
      body: "XYZ has booked a ride with you from abc to def",
    })
    .then((message) => console.log(`Message SID ${message.sid}`))
    .catch((error) => console.error(error));
}
