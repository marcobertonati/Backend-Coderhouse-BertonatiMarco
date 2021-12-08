const axios = require("axios");

/*Petición que trae una lista de productos */
const getAllProducts = () =>
  axios
    .get("http://localhost:8080/api/product/")
    .then((response) => {
      console.log("Ingresó al then");
      const result = response;
      console.log(result.data);
    })
    .catch((e) => {
      console.log(e);
    });

/*Petición que agrega producto FAKE */
const productFake = {
  title: "Producto 2 de mock",
  price: 1000,
  thumbnail:
    "https://essential.vteximg.com.br/arquivos/ids/400713-1000-1000/962-1451_1.jpg",
  timestamp: "20/11/2021",
  description: "Descripción 2 de mock",
  code: "741963825",
  stock: 13,
  __v: 0,
};
const createProduct = () =>
  axios
    .post("http://localhost:8080/api/product/create", productFake)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

/*Petición que updatea producto FAKE */
const ID = "6199187c3b686f9d95f84882";
const updateProduct = () =>
  axios
    .patch(`http://localhost:8080/api/product/update/${ID}`, {
      title: "Producto 2 modificado",
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

/*Petición que delete producto FAKE */
const productIdToBeDeleted = "6199187c3b686f9d95f84882";
const deleteOne = () => {
  axios
    .delete(`http://localhost:8080/api/product/delete/${productIdToBeDeleted}`)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
