// const path = require("path");
// require("dotenv").config({
//   path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
// });

const { port } = require("yargs").argv;
const PORT = port === undefined ? 8080 : port;

// Chequeamos argumentos
// process.argv.forEach((value, index) => console.log(index + " => " + value));

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI || "",

  IS_CLUSTER: process.env.IS_CLUSTER,

  PORT: PORT,

  PERSISTENCE: process.argv[4] ? process.argv[4] : process.env.PERSISTENCE,

  // NODE_ENVI: process.argv[4] ? process.argv[4] : process.env.NODE_ENVI,

  FACEBOOK_CLIENT_ID: process.argv[5]
    ? process.argv[5]
    : process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.argv[6]
    ? process.argv[6]
    : process.env.FACEBOOK_CLIENT_SECRET,

  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_USER_PASS: process.env.GMAIL_USER_PASS,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_NUMBER_WHATSAPP: process.env.TWILIO_NUMBER_WHATSAPP,
};
