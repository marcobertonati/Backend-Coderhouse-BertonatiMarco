const { processInfo } = require("../utils/processInfo");

module.exports = (router) => {
  router.get("/info", (req, res, next) => {
    // console.log(processInfo);
    res.render('./pages/server-info', { processInfo });
  });

  return router;
};