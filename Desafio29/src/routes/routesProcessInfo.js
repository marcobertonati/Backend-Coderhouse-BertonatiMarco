const {processInfo} = require('../utils/processInfo')

module.exports = (router) => {
  router.get("/info", (req, res, next) => {
    res.send(processInfo);
  });

  return router;
};
