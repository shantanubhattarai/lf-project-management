const authRoute = require("./controllers/auth.controller");
const projectRoute = require("./controllers/project.controller");
const router = require("express").Router();
const adminRoute = require("./controllers/admin.controller");

const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

router.use("/auth", authRoute);
router.use("/", authenticate, projectRoute);
router.use("/admin", authenticate, authorize([1]), adminRoute);

module.exports = router;
