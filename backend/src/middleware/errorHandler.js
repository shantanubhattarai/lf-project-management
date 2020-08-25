function genericErrorHandler(err, req, res, next) {
  return res.send({ status: 400, message: "Error", error: err });
}

module.exports = genericErrorHandler;
