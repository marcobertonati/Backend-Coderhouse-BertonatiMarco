/*Requiero modulo fs*/
const fs = require("fs");

class Archivo {
  constructor(file) {
    this.file = file;
    this.encoding = "utf8";
  }

  async leer() {
    await fs.readFile(this.file, this.encoding, (err, result) => {
      if (err) {
        const arrayEmpty = []
        console.log(arrayEmpty);
      } else {
        const objetJSON = JSON.parse(result);
        console.log(objetJSON);
        return objetJSON;
      }
    });
  }

  async guardar() {

    try {

        const arrayProductsJSON = await fs.promises.readFile(this.file, this.encoding)
        const arrayProductsJS = JSON.parse(arrayProductsJSON);

        let id = 1;
        const newArrayWithID = arrayProductsJS.map(element => {
            return {
                ...element,
                id: id++
            }
        });

        await fs.promises.writeFile('productos.txt', JSON.stringify(newArrayWithID,null,'\t'))

    } catch (error) {
        console.log(error)

    }

  }

  async borrar() {
    await fs.unlink(this.file, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`El archivo fue eliminado`);
      }
    });
  }
}

class Producto {
  constructor(name, price, url) {
    this.name = name;
    this.price = price;
    this.url = url;
  }
}

/* Crear archivo */
const archivoProducto = new Archivo('productos.txt')

/* Funciones de prueba */
// archivoProducto.leer();
// archivoProducto.borrar();
// archivoProducto.guardar();


/* Productos para agregar */
// const productoGorra = new Producto('Gorra', 700, 'www.daffiti.com')
// const productoMedias = new Producto('Medias', 300, 'www.daffiti.com')







