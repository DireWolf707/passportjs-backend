import express from "express"
import passport from "passport"
import { getProfile, updateProfile, updateAvatar, deleteAvatar, logout, oauthFaliure } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()
router.get("/login/google", passport.authenticate("google"))
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/user/oauth2/failure",
  })
)
router.get("/me", getProfile)
router.post("/logout", logout)
router.post("/profile", isAuthenticated, updateProfile)
router.route("/avatar").post(isAuthenticated, updateAvatar).delete(isAuthenticated, deleteAvatar)
router.get("/oauth2/failure", oauthFaliure)

export default router
