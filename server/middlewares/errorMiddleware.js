exports.notFound = function(req,res,next){
  const error = new Error(`Not Found -- ${req.originalUrl}`)
  res.status(404)
  return next(error)
}

/*
  If no statusCode was assigned, it should be Internal Server Error (500)
*/
exports.errorHandler = function(err,req,res, next){
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: err.stack
  })
}