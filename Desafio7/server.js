/* para usar IMPORT tenemos que poner   "type": "module", en el package.json*/
import express from "express";
import fs from "fs";

/*Creamos la clase archivo*/
class Archivo {
  constructor(file) {
    this.file = file;
    this.encoding = "utf8";
  }

  async leer() {
    try {
      const productsString = await fs.promises.readFile(
        this.file,
        this.encoding
      );
      const productsArray = JSON.parse(productsString);

      const productObjet = {
        items: [...productsArray],
        cantidad: productsArray.length,
      };

      return productObjet;
    } catch (error) {
      console.log(error);
    }
  }
}
/* Instanciamos la clase Archivo a partir del productos.txt */
const archivoProducto = new Archivo("productos.txt");

/*----------------------------------------*/
/*Configuración del Server*/
const app = express();

/*Contador de visitas*/
let visitasItems = 0;
let visitasItemRandom = 0;

/*Rutas*/
app.get("/items", (req, res) => {
  archivoProducto
    .leer()
    .then((data) => {
      visitasItems++;
      res.send(data);
    })

    .catch((e) => console.log(e));
});

app.get("/item-random", (req, res) => {
  archivoProducto
    .leer()
    .then((data) => {
      /*Creo un número random que sea entre 0 y la el tamaño del array */
      const numRandom = Math.floor(Math.random() * data.cantidad);
      const productoRandom = { item: data.items[numRandom] };
      visitasItemRandom++;
      res.send(productoRandom);
    })
    .catch((e) => console.log(e));
});

app.get("/visitas", (req, res) => {
  res.send({
    visitas: {
      items: visitasItems,
      item: visitasItemRandom,
    },
  });
});

/* Configuración del puerto */
const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor funcionando en ${PORT}`));
