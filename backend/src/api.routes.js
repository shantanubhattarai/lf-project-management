const authRoute = require("./controllers/auth.controller");
const projectRoute = require("./controllers/project.controller");
const router = require("express").Router();
const adminRoute = require("./controllers/admin.controller");
//const taskRoute = require("./controllers/task.controller");

const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

router.use("/auth", authRoute);
router.use("/projects", authenticate, projectRoute);
// router.use("/task", authenticate, taskRoute);

module.exports = router;
