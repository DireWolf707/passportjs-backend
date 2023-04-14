import AppError from "./../utils/appError.js"

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(({ path, message }) => `${path}:${message}`)
  const message = errors.join(",")
  return new AppError(message, 400)
}

const sendError = (err, req, res) => {
  // Operational error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }

  // Unknown error: don't send error details
  console.error(err)
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  })
}

export default (err, req, res, next) => {
  // Mongo Errors
  if (err.name === "ValidationError") err = handleValidationErrorDB(err)
  if (err.name === "CastError") err = handleCastErrorDB(err)
  if (err.code === 11000) err = handleDuplicateFieldsDB(err)

  sendError(err, req, res)
}
