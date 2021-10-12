// const { PORT } = require('./src/config/globals');
const { getConnection } = require("./src/dao/db/connectionMongo");
const http = require("./server.es6");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
let PORT;

console.log(cluster.isMaster);

process.argv.forEach((val, index) => {
  if (index === 2) {
    PORT = parseInt(val);
    console.log(`Server working on ${PORT}`);
  }
});


if (process.argv[5] === "cluster") {
  console.log("Servidor iniciado en modo CLUSTER");

  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(
        `Worker ${
          worker.process.pid
        } DIED at ${new Date().toLocaleDateString()}!`
      );
    });
  } else {
    console.log("Servidor iniciado en modo CLUSTER");
    getConnection()
      .then((msg) => {
        console.log(msg);
        http.listen(PORT || 8080, () =>
          console.log(
            `Working on ${PORT === undefined ? "8080" : PORT}! and procces id ${
              process.pid
            }`
          )
        );
      })
      .catch((err) => console.log(err));
  }
} else {
  console.log("Servidor iniciado en modo FORK");
  getConnection()
    .then((msg) => {
      console.log(msg);
      http.listen(PORT || 8080, () =>
        console.log(
          `Working on ${PORT === undefined ? "8080" : PORT} and procces id ${
            process.pid
          }!`
        )
      );
    })
    .catch((err) => console.log(err));
}
