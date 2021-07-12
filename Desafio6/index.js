/*Requiero modulo fs*/
const fs = require("fs");

class Archivo {
  constructor(file) {
    this.file = file;
    this.encoding = "utf8";
  }

  async leer() {

    try {
     const dataJSON = await fs.promises.readFile(this.file,this.encoding)
     const datObject = JSON.parse(dataJSON);
     console.log(datObject);
     return datObject;
      
    } catch (error) {
       console.log(error);
    }

  }

  async guardar(newProduct) {
    
    try {

        const arrayProductsJSON = await fs.promises.readFile(this.file, this.encoding)
        const arrayProductsJS = JSON.parse(arrayProductsJSON);
        // console.log(arrayProductsJS)

        let arrayLength = arrayProductsJS.length + 1;
        // console.log(arrayLenght)

        const newProducto = {
          ...newProduct,
          id: arrayLength
        }
        // console.log(newProducto)

        const newArray = [...arrayProductsJS, newProducto]
        await fs.promises.writeFile('productos.txt', JSON.stringify(newArray,null,'\t'))

    } catch (error) {
        console.log(error)
    }
  }

  async borrar() {

    try {
      await fs.promises.unlink(this.file);
      console.log('El archivo fue eliminado')
    } catch (error) {
      console.log('OCURRIO UN ERROR')
      console.log(error)
    }
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


/* Productos para agregar */
// const camperaMarron = new Producto('campera marrón', 7000, 'www.daffiti.com')
// archivoProducto.guardar(camperaMarron);







