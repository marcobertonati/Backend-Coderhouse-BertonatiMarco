const { PORT } = require('./src/config/globals');
const { getConnection } =require('./src/dao/db/connectionMongo');

const http = require('./server.es6');

getConnection()
    .then((msg)=> {
        console.log(msg);
        http.listen(PORT, () => console.log(`Working on ${PORT}!`))
    })
    .catch((err)=> console.log(err))

