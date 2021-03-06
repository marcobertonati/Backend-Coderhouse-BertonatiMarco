class DTOmongoose {
  getAllProducts(data) {
    const productArray = data.map((e) => {
      return {
        id: e._id,
        title: e.title,
        price: e.price,
        thumbnail: e.thumbnail,
        timestamp: e.timestamp,
        description: e.description,
        code: e.code,
        stock: e.stock,
      };
    });
    return productArray;
  }

  geyById(data) {
    return {
      id: data._id,
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
      timestamp: data.timestamp,
      description: data.description,
      code: data.code,
      stock: data.stock,
    };
  }
}

module.exports = new DTOmongoose();
