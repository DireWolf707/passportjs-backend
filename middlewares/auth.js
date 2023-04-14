export const isAuthenticated = (req, res, next) => {
  if (!req.user) throw new AppError("Not Authorized", 403)
  next()
}
