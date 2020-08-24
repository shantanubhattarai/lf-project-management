function authorize(roles = []) {
  return function (req, res, next) {
    if (roles.length && !roles.includes(req.user.role)) {
      res.send({ status: 401, message: "Unauthorized" });
      return;
    }
    next();
  };
}

module.exports = authorize;
