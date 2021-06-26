const http = require("http");

const server = http.createServer((req, res) => {
  let respuesta = {
    id: Math.floor(Math.random() * 10 + 1), // numero aleatorio entre 1 y 10. Con el +1 del final nos aseguramos que nunca caiga en 0
    title: "Producto " + Math.floor(Math.random() * 10 + 1),
    price: (Math.random() * 10000).toFixed(2), // numero aleatorio entre 1 y 10. Como no tiene el + 1 puede caer en 0. El toFiexed hace que después de los decimales "acorte hasta cierta cantidad", en este caso 2... osea =>  numero,xx ej. 204,12.
    thumbnail: "Foto " + Math.floor(Math.random() * 10 + 1),
  };

  res.end(JSON.stringify(respuesta));
  
});

server.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
