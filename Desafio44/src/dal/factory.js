let _persistenceFactoryInstance = null;

class PersistenceFactory {
  newPersistence = (type) => {
    switch (type) {
      case "memory":
        console.log("[Persistence] : Memory");
        const persistenceMemoryProduct = require("../dal/memory/dao/models/productDao.memory");
        const persistenceMemoryUser = require("../dal/memory/dao/models/userDao.memory");
        const {
          messagesRepository,
        } = require("../dal/memory/repositories/index");

        return {
          persistenceProduct: new persistenceMemoryProduct(),
          persistenceUser: new persistenceMemoryUser(),
          persistenceMessages: messagesRepository,
        };

      case "mongodb":
        console.log("[Persistence] : MongoDB");
        const persistenceMongoDBProduct = require("../dal/mongoose/dao/models/productDao.mongoose");
        const persistenceMongoDBUser = require("../dal/mongoose/dao/models/userDao.mongoose");
        const {
          messagesRepositoryMoongose,
        } = require("../dal/mongoose/repositories/index");
        return {
          persistenceProduct: new persistenceMongoDBProduct(),
          persistenceUser: new persistenceMongoDBUser(),
          persistenceMessages: messagesRepositoryMoongose,
        };

      default:
        console.log("[Persistence] : Default => Memory");
        const persistenceDefaultProduct = require("../dal/memory/dao/models/productDao.memory");
        const persistenceDefaultUser = require("../dal/memory/dao/models/userDao.memory");
        const messagesRepositoryIndex = require("../dal/memory/repositories/index");

        return {
          persistenceProduct: new persistenceDefaultProduct(),
          persistenceUser: new persistenceDefaultUser(),
          persistenceMessages: messagesRepositoryIndex.messagesRepository,
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
