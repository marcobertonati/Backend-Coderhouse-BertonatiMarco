// const { PORT } = require('./src/config/globals');
const { getConnection } = require("./src/dao/db/connectionMongo");

const http = require("./server.es6");
let PORT;

process.argv.forEach((val, index) => {
  if (index === 2) {
    PORT = parseInt(val);
    console.log(`Server working on ${PORT}`);
  }
});

getConnection()
  .then((msg) => {
    console.log(msg);
    http.listen(PORT || 8080, () =>
      console.log(`Working on ${PORT === undefined ? "8080" : PORT}!`)
    );
  })
  .catch((err) => console.log(err));
