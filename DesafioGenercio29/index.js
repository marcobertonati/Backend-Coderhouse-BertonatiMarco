const express = require("express");
const app = express();

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const PORT = parseInt(process.argv[2]) || 8081;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running!`);
  for (let i = 0; i < numCPUs; i++) {
    console.log("Creará un fork!");
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died!`);
  });
} else {
  app.get("/", (req, res) => {
    console.log(`port: ${PORT} -> Fyh: ${Date.now()}`);
    res.send(
      `Servidor express <span style="color:blueviolet;">(PM2)</span> en ${PORT} - <b>PID ${
        process.pid
      }</b> - ${new Date().toLocaleString()}`
    );
  });

  app.listen(PORT, (err) => {
    if (!err)
      console.log(
        `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
      );
  });
}
