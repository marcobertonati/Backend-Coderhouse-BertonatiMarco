let _persistenceFactoryInstance = null;

class PersistenceFactory {
  newPersistence = (type) => {
    switch (type) {
      case "memory":
        console.log("[Persistence] : Memory");
        const persistenceMemory = require("../dal/memory/dao/models/productDao.memory");
        return new persistenceMemory();

      case "mongodb":
        console.log("[Persistence] : MongoDB");
        const persistenceMongoDB = require("../dal/mongoose/dao/models/productDao.mongoose");
        return new persistenceMongoDB();

      default:
        console.log("[Persistence] : Default => Memory");
        return new persistenceMemory();
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
