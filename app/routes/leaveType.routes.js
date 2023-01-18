const { authJwt } = require("../middlewares");
const controller = require("../controllers/leaveType.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/leave/leaveTypes/get", [authJwt.verifyToken], controller.getLeaveType);
  app.post("/api/leave/leaveTypes/post", [authJwt.verifyToken], controller.postLeaveType);

};