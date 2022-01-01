let _persistenceFactoryInstance = null;

class PersistenceFactory {
  newPersistence = (type) => {
    switch (type) {
      case "memory":
        console.log("[Persistence] : Memory");
        const persistenceMemoryProduct = require("../dal/memory/dao/models/productDao.memory");
        const persistenceMemoryUser = require("../dal/memory/dao/models/userDao.memory");
        return {
          persistenceProduct: new persistenceMemoryProduct(),
          persistenceUser: new persistenceMemoryUser(),
        };

      case "mongodb":
        console.log("[Persistence] : MongoDB");
        const persistenceMongoDBProduct = require("../dal/mongoose/dao/models/productDao.mongoose");
        const persistenceMongoDBUser = require("../dal/mongoose/dao/models/userDao.mongoose");
        return {
          persistenceProduct: new persistenceMongoDBProduct(),
          persistenceUser: new persistenceMongoDBUser()
        }

      default:
        console.log("[Persistence] : Default => Memory");
        const persistenceDefaultProduct = require("../dal/memory/dao/models/productDao.memory");
        const persistenceDefaultUser = require("../dal/memory/dao/models/userDao.memory");
        return {
          persistenceProduct: new persistenceDefaultProduct(),
          persistenceUser: new persistenceDefaultUser(),
        };
    }
  };
}

// exports.getPersistenceFactory = () => {
//   if (_persistenceFactoryInstance === null) {
//     _persistenceFactoryInstance = new PersistenceFactory();
//   }
//   return _persistenceFactoryInstance;
// };

module.exports = new PersistenceFactory();
