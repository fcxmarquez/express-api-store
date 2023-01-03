function logGenericErrors(err, req, res, next) {
  res.status(500).json({ message: err.message, stack: err.stack });
}

function queryErrorHandler(err, req, res, next) {
  if (err.parent.message) {
    const { message } = err.errors[0];
    res.status(409).json({ message });
  }
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logGenericErrors, boomErrorHandler, queryErrorHandler };
