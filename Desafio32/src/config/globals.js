require("dotenv").config();

process.argv.forEach((value, index) => console.log(index + " => " + value));

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI || "",
  IS_CLUSTER: process.argv[2] === "CLUSTER" ? true : false,
  PORT: parseInt(process.argv[3]) || process.env.PORT || 8080,
  FACEBOOK_CLIENT_ID: process.argv[4]
    ? process.argv[4]
    : process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.argv[5]
    ? process.argv[5]
    : process.env.FACEBOOK_CLIENT_SECRET,
};
