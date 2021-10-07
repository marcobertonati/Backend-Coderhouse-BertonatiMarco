// const express = require('express');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

// console.log(numCPUs)

// if (cluster.isMaster) {
//     console.log(`MASTER ${process.pid} is running`);

//     //fork workers

//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     })
// } else {

//     const app = express();
//     console.log(`worker ${process.pid} started`)
//     app.listen(8080, console.log('Working on 8080'))


// }

/*---------------------------------*/
/* FOREVER */

//tasklist /fi "imagename eq node.exe" -> lista todos los procesos de node.js activos
//taskkill /pid numpid /f -> mata un proceso por su número de PID

//npm i -g forever
//npm list -g | grep forever

//forever start -w server.js PORT
//forever list
//forever stop id
//forever stopall
//forever --help

// const express = require('express')

// const app = express()

// //console.log(parseInt(process.argv[2]))
// const PORT = parseInt(process.argv[2]) || 8080

// app.get('/', (req,res) => {
//     res.send(`Servidor express <span style="color:red;">(forever)</span> en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
// })

// app.listen(PORT, err => {
//     if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
// })



/*---------------------------------*/
/* PM"2 */

//tasklist /fi "imagename eq node.exe" -> lista todos los procesos de node.js activos
//taskkill /pid numpid /f -> mata un proceso por su número de PID

//npm i -g pm2
//npm list -g | grep pm2

// -------------- MODO FORK -------------------
//pm2 start server.js --name="ServerX" --watch -- PORT
//pm2 start server.js --name="Server1" --watch -- 8081
//pm2 start server.js --name="Server2" --watch -- 8082

// -------------- MODO CLUSTER -------------------
//pm2 start server.js --name="ServerX" --watch -i max -- PORT
//pm2 start server.js --name="Server3" --watch -i max -- 8083
//pm2 start server.js --name="Server4" --watch -i max -- 8084

//pm2 list
//pm2 delete id/name
//pm2 desc name
//pm2 monit
//pm2 --help
//pm2 logs
//pm2 flush

const express = require('express')

const app = express()

//console.log(parseInt(process.argv[2]))
const PORT = parseInt(process.argv[2]) || 8080

app.get('/', (req,res) => {
    console.log(`port: ${PORT} -> Fyh: ${Date.now()}`)
    res.send(`Servidor express <span style="color:blueviolet;">(PM2)</span> en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
})

app.listen(PORT, err => {
    if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
})